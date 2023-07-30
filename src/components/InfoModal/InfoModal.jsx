import { useState, useContext } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { formatDate } from "../../utils";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";

export default function InfoModal({ setData, isOpen, onClose, props }) {
  const [showEmail, setShowEmail] = useState(false);
  const { onLoginModalOpen } = useContext(DataContext);
  const { setLoading } = useContext(DataContext);
  const { user } = UserAuth();
  const currentEmail = user?.email;

  function viewEmail() {
    if (user) {
      setShowEmail(true);
    }
  }

  async function handleDelete() {
    onClose();
    setLoading(false);
    await deleteDoc(doc(db, "items", props.id));
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
    <Modal isOpen={isOpen} onClose={onClose}>
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
              ) : props.isLost ? (
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

              <Image
                rounded={"lg"}
                height={230}
                width={282}
                objectFit={"cover"}
                src={props.image}
              />

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
                <Button colorScheme="red" px="36px" onClick={handleDelete}>
                  Delete
                </Button>
              )}
              {props.isLost ? (
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
  );
}
