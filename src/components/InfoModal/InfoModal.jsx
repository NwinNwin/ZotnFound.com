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
} from "@chakra-ui/react";
import { formatDate } from "../../utils";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import axios from "axios";
import ImageContainer from "../ImageContainer/ImageContainer";
import { LinkIcon, EmailIcon, CloseIcon, PhoneIcon } from "@chakra-ui/icons";

export default function InfoModal({ setData, isOpen, onClose, props }) {
  const [showEmail, setShowEmail] = useState(false);
  const { onLoginModalOpen } = useContext(DataContext);
  const { setLoading } = useContext(DataContext);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const currentEmail = user?.email;

  // function viewEmail() {
  //   if (user) {
  //     setShowEmail(true);
  //   }
  // }

  async function handleDelete() {
    onClose();
    setLoading(false);
    axios
      .delete(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}`)
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));
    setData((prevItems) => {
      if (prevItems && prevItems.length > 0) {
        return prevItems.filter((item) => item.id !== props.id);
      }
      return prevItems;
    });
    setLoading(true);
  }

  const formattedDate = formatDate(new Date(props.date));
  return (
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
              <Text fontSize={"md"} mt={3} overflowY={"auto"} maxHeight={"200"}>
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
                  colorScheme="red"
                  size={"lg"}
                  gap={2}
                  onClick={handleDelete}
                >
                  <CloseIcon /> Delete
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
  );
}
