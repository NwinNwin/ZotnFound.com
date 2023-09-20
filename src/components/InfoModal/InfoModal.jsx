import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDate } from "../../utils";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import ImageContainer from "../ImageContainer/ImageContainer";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { LinkIcon, CheckIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";

export default function InfoModal({ setData, isOpen, onClose, onOpen, props }) {
  const [showEmail, setShowEmail] = useState(false);
  const { onLoginModalOpen } = useContext(DataContext);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const feedbackModalDisclosure = useDisclosure();
  const currentEmail = user?.email;
  
  // function viewEmail() {
  //   if (user) {
  //     setShowEmail(true);
  //   }
  // }

  async function handleDelete() {
    feedbackModalDisclosure.onOpen();
  }

  const formattedDate = formatDate(new Date(props.date));
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/");
        }}
        size={{ base: "full", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size="lg" />

          <Flex
            justifyContent={{ base: "center", md: "space-around" }}
            alignItems={"center"}
            paddingX={"2%"}
            paddingY={"5%"}
            width={"100%"}
            flexDir={{ base: "column", md: "row" }}
          >
            <ImageContainer image={props.image} isresolved={props.isresolved} />
            <Flex
              flexDir={"column"}
              w={{ base: "90%", md: "40%" }}
              gap={5}
              mt={{ md: 0, base: 5 }}
            >
              {/* HEADING */}
              <Flex flexDir={"column"} gap={2}>
                <Heading
                  // mt="20px"
                  fontSize="4xl"
                  fontFamily={"body"}
                  fontWeight={"bold"}
                >
                  {props.name}
                </Heading>

                <Flex gap={2}>
                  {currentEmail === props.email ? (
                    <Flex>
                      <Tag colorScheme="blue" variant="solid">
                        Owner
                      </Tag>
                    </Flex>
                  ) : props.islost ? (
                    <Flex>
                      <Tag colorScheme="red" variant="solid">
                        Lost
                      </Tag>
                    </Flex>
                  ) : (
                    <Flex>
                      <Tag colorScheme="green" variant="solid">
                        Found
                      </Tag>
                    </Flex>
                  )}
                  <Text color={"gray.500"}>Posted: {formattedDate}</Text>
                </Flex>
              </Flex>

              <hr />

              {/* DESCRIPTION */}
              <Flex flexDir={"column"}>
                <Text as={"b"} fontSize={"xl"}>
                  Description:
                </Text>
                {props.islost ? (
                  <Text color={"gray.500"}>Lost on {props.itemDate}</Text>
                ) : (
                  <Text color={"gray.500"}> Found on {props.itemDate}</Text>
                )}
                <Text
                  fontSize={"md"}
                  mt={3}
                  overflowY={"auto"}
                  maxHeight={"200"}
                >
                  {props.description}
                </Text>
              </Flex>
              <hr />
              <Flex gap={5} justifyContent={"center"} alignItems={"center"}>
                {currentEmail !== props.email &&
                  (!showEmail ? (
                    <Button
                      colorScheme="blue"
                      size={"lg"}
                      gap={2}
                      isDisabled={props.isresolved && true}
                      onClick={() => {
                        if (user) {
                          setShowEmail(true);
                        } else {
                          onLoginModalOpen();
                        }
                      }}
                    >
                      <PhoneIcon /> View Contact
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline" colorScheme="blue">
                      {props.email}
                    </Button>
                  ))}
                {currentEmail === props.email && (
                  <Button
                    colorScheme="green"
                    size={"lg"}
                    gap={2}
                    onClick={handleDelete}
                    isDisabled={props.isresolved ? true : false}
                  >
                      {currentEmail === props.email ? <CheckIcon /> Resolve : <EmailIcon /> View Contact}
                  </Button>
                )}
                <Button
                  colorScheme="blue"
                  size={"lg"}
                  variant={"outline"}
                  gap={2}
                >
                  <LinkIcon /> Share
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
      <FeedbackModal
        infoOnClose={onClose}
        isOpen={feedbackModalDisclosure.isOpen}
        onClose={feedbackModalDisclosure.onClose}
        props={props}
        setData={setData}
      />
    </>
  );
}
