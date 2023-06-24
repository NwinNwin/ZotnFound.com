import * as React from "react";
import { Box, Button, Center, Heading, Text, Stack, useColorModeValue, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, Flex, Tag } from "@chakra-ui/react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function InfoModal({ setData, isOpen, onClose, props, currentEmail }) {
  async function handleDelete() {
    await deleteDoc(doc(db, "items", props.id));
    setData((prevItems) => {
      if (prevItems && prevItems.length > 0) {
        return prevItems.filter((item) => item.id !== props.id);
      }
      return prevItems;
    });

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
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
            marginTop={"30px"}
          >
            <Box
              rounded={"lg"}
              mt={-12}
              pos={"relative"}
              bgPos={"center"}
              height={"230px"}
              _after={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                top: 5,
                left: 0,
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: "blur(20px)",
                },
              }}
            >
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
              <Flex justifyContent="center">{props.isLost ? <Text as="b">Lost on {props.itemDate}</Text> : <Text as="b">Found on {props.itemDate}</Text>}</Flex>

              <Center>
                <Image rounded={"lg"} height={230} width={282} objectFit={"cover"} src={props.image} mt={5} />
              </Center>
            </Box>
            <Stack pt={10} align={"center"}>
              <Heading mt="20px" fontSize={"3xl"} fontFamily={"body"} fontWeight={"bold"}>
                {props.name}
              </Heading>
              <Text textAlign="center" color={"gray.500"} fontSize={"md"}>
                {props.description}
              </Text>
              <Flex>
                {currentEmail !== props.email && (
                  <Button colorScheme="blue" py="10px">
                    <a href={`mailto:${props.email}?subject=From ZOT-N-FOUND!&body=${props.isLost ? "I FOUND YOUR ITEM!!" : "THANK YOU FOR FINDING MY ITEM!!"}`} target="_blank" rel="noreferrer">
                      Contact Me
                    </a>
                  </Button>
                )}
                {currentEmail === props.email && (
                  <Button colorScheme="red" ml="3" px="36px" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </Flex>

              <Text color={"gray.500"}>Posted on {props.date}</Text>
            </Stack>
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  );
}
