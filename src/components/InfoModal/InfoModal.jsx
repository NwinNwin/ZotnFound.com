import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Tag,
  useDisclosure
} from "@chakra-ui/react";
import { formatDate } from "../../utils";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import axios from "axios";
import ImageContainer from "../ImageContainer/ImageContainer";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

export default function InfoModal({ setData, infoIsOpen, infoOnClose, infoOnOpen, props }) {
  const [showEmail, setShowEmail] = useState(false);
  const { onLoginModalOpen } = useContext(DataContext);
  const { setLoading } = useContext(DataContext);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentEmail = user?.email;

  // function viewEmail() {
  //   if (user) {
  //     setShowEmail(true);
  //   }
  // }

  async function handleDelete() {
    infoOnClose();
    // setLoading(false);
    // axios
    //   .delete(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}`)
    //   .then(() => console.log("Success"))
    //   .catch((err) => console.log(err));
    // setData((prevItems) => {
    //   if (prevItems && prevItems.length > 0) {
    //     return prevItems.filter((item) => item.id !== props.id);
    //   }
    //   return prevItems;
    // });
    // setLoading(true);
  }

  const formattedDate = formatDate(new Date(props.date));
  return (
    <>
      <Modal
        isOpen={infoIsOpen}
        onClose={() => {
          infoOnClose();
          navigate("/");
        }}
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size="lg" />
          <Center py={6}>
            <Box
              role={"group"}
              p={10}
              maxW={"400px"}
              maxH={"800px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              // boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
              marginTop={"28px"}
              pt={"0"}
            >
              <Stack align={"center"} justifyContent={"center"} gap={"3px"}>
                {currentEmail === props.email ? (
                  <Flex align="center" justifyContent="center">
                    <Tag colorScheme="blue" variant="solid">
                      Owner
                    </Tag>
                  </Flex>
                ) : props.islost ? (
                  <Flex align="center" justifyContent="center">
                    <Tag colorScheme="red" variant="solid">
                      Lost
                    </Tag>
                  </Flex>
                ) : (
                  <Flex align="center" justifyContent="center">
                    <Tag colorScheme="green" variant="solid">
                      Found
                    </Tag>
                  </Flex>
                )}
                <Heading
                  // mt="20px"
                  fontSize={"3xl"}
                  fontFamily={"body"}
                  fontWeight={"bold"}
                >
                  {props.name}
                </Heading>

                <ImageContainer
                  image={props.image}
                  isresolved={props.isresolved}
                />
                {/* <Flex>
                <Flex
                backgroundColor={"rgba(245, 44, 44, 0.5)"}
                float={"left"}
                position={"absolute"}
                >
                <Text>RESOLVED</Text>
                </Flex>
                <Image
                rounded={"lg"}
                height={230}
                width={282}
                objectFit={"cover"}
                src={props.image}
                />
              </Flex> */}

                <Text
                  textAlign="center"
                  color={"gray.500"}
                  fontSize={"md"}
                  overflowY={"auto"}
                  maxHeight={"200"}
                >
                  {props.description}
                </Text>
                {currentEmail !== props.email &&
                  (!showEmail ? (
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        if (user) {
                          setShowEmail(true);
                        } else {
                          onLoginModalOpen();
                        }
                      }}
                    >
                      View Contact
                    </Button>
                  ) : (
                    <Tag
                      size="lg"
                      padding="10px"
                      variant="outline"
                      colorScheme="blue"
                    >
                      {props.email}
                    </Tag>
                  ))}
                {currentEmail === props.email && (
                  <Button colorScheme="red" px="36px" onClick={onOpen}>
                    Delete
                  </Button>
                )}
                {props.islost ? (
                  <Text as="b">Lost on {props.itemDate}</Text>
                ) : (
                  <Text as="b">Found on {props.itemDate}</Text>
                )}
                <Text color={"gray.500"}>Posted on {formattedDate}</Text>
              </Stack>
            </Box>
          </Center>
        </ModalContent>
      </Modal>
      <FeedbackModal feedbackIsOpen={isOpen} feedbackOnClose={onClose}/>
    </>
  );
}
