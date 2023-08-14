import * as React from "react";
import { useState, useContext } from "react";
import {
  Image,
  Stack,
  Heading,
  Button,
  Flex,
  FormLabel,
  Input,
  Switch,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormHelperText,
  Select,
  Text,
} from "@chakra-ui/react";
// import logo from "../../assets/images/small_logo.png";
import upload from "../../assets/images/download.png";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";

export default function CreateModal({
  newAddedItem,
  setNewAddedItem,
  setIsCreate,
  isCreate,
  isEdit,
  setIsEdit,
  setPosition,
  centerPosition,
}) {
  const { user } = UserAuth();
  const { onLoginModalOpen } = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadImg, setUploadImg] = useState(upload);

  const uploadFile = () => {
    if (!newAddedItem.image) return;

    const time = new Date().getTime();
    const imageRef = ref(
      storage,
      `zotnfound2/images/${time + newAddedItem.image.name}`
    );

    uploadBytes(imageRef, newAddedItem.image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        if (
          url.includes(
            "https://firebasestorage.googleapis.com/v0/b/zotnfound2.appspot.com/o/zotnfound2%2Fimages%2FNaN"
          )
        ) {
          setUploadImg(upload);
        } else {
          setUploadImg(url);
          setNewAddedItem((prev) => ({ ...prev, image: url }));
        }
      });
    });
  };
  return (
    <>
      {isCreate ? (
        <Button
          h={{ base: "10vh", md: "7vh" }}
          w={{ base: "40vw", md: "8vw" }}
          _hover={{ bg: "#b4dbd9" }}
          backgroundColor="#61b895"
          color="white"
          fontSize="xl"
          fontWeight="bold"
          borderRadius={20}
          onClick={() => {
            if (user) {
              onOpen();
              setNewAddedItem((prev) => ({ ...prev, islost: true }));
              setIsEdit(!isEdit);
            } else {
              onLoginModalOpen();
            }
          }}
        >
          <Text>List an item</Text>
        </Button>
      ) : (
        <Button
          h={{ base: "8vh", md: "7vh" }}
          w={{ base: "40vw", md: "8vw" }}
          _hover={{ bg: "#F4C2C2" }}
          backgroundColor="#B31B1B"
          color="white"
          fontSize="xl"
          fontWeight="bold"
          borderRadius={20}
          onClick={() => {
            setIsEdit(isEdit);
            setNewAddedItem((prev) => ({ ...prev, islost: true }));
            setIsCreate(!isCreate);
            setPosition(centerPosition);
            setUploadImg("");
          }}
        >
          Cancel
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay>
          <ModalContent>
            <Flex width="100%" justifyContent="center" padding="10px">
              <Stack minH={"70vh"} direction={{ base: "column", md: "row" }}>
                <Flex align={"center"} justify={"center"} ml={10}>
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    align="center"
                    gap={2}
                  >
                    <Heading fontSize={"2xl"} py="10px" textAlign="center">
                      {newAddedItem.islost
                        ? "Oh no! Post here so anteaters can help you! 😥😭"
                        : "WHAT A LIFE SAVER! 😇😸"}
                    </Heading>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setUploadImg("");
                        onClose();
                        setIsCreate(!isCreate);
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>File Upload:</FormLabel>
                        <Flex mb={3} alignItems="center" flexDirection="row">
                          <Input
                            type="file"
                            placeholder="Image URL"
                            onChange={(e) => {
                              setNewAddedItem((prev) => ({
                                ...prev,
                                image: e.target.files[0],
                              }));
                            }}
                          />
                          <Button onClick={uploadFile}>Confirm</Button>
                        </Flex>
                      </FormControl>
                      <FormControl isRequired mb="3">
                        <FormLabel>Select Item Type:</FormLabel>
                        <Select
                          placeholder="Select option"
                          onChange={(e) =>
                            setNewAddedItem((prev) => ({
                              ...prev,
                              type: e.target.value,
                            }))
                          }
                        >
                          <option value="headphone">Headphones</option>
                          <option value="wallet">Wallet</option>
                          <option value="key">Keys</option>
                          <option value="phone">Phone</option>
                          <option value="others">Others</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Flex justifyContent={"space-between"} mb="0">
                          <FormLabel htmlFor="lost-item">
                            Lost or Found Item?
                          </FormLabel>
                          <Switch
                            id="lost-switch"
                            size="lg"
                            colorScheme="red"
                            onChange={() =>
                              setNewAddedItem((prev) => ({
                                ...prev,
                                islost: !prev.islost,
                              }))
                            }
                          />
                        </Flex>
                        <Flex justifyContent="flex-end" mt={0}>
                          <FormHelperText fontSize="20px">
                            {newAddedItem.islost ? "Lost" : "Found"}
                          </FormHelperText>
                        </Flex>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel py="10px">
                          Enter your information below:{" "}
                        </FormLabel>

                        <Input
                          variant="outline"
                          placeholder="Item Name"
                          mb="2"
                          value={newAddedItem.name}
                          onChange={(e) =>
                            setNewAddedItem((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                        <Input
                          variant="outline"
                          placeholder="Description of Item"
                          mb="2"
                          onChange={(e) =>
                            setNewAddedItem((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />

                        <FormLabel py="10px">
                          {newAddedItem.islost ? "Lost Date" : "Found Date"}
                        </FormLabel>
                        <Input
                          variant="outline"
                          mb="2"
                          type="date"
                          value={newAddedItem.itemDate}
                          onChange={(e) =>
                            setNewAddedItem((prev) => ({
                              ...prev,
                              itemDate: e.target.value,
                            }))
                          }
                          // onChange={(e) => console.log(e.target.value)}
                        />
                      </FormControl>

                      <Flex gap={3} justifyContent="center" mt="10px" mb="10px">
                        <Button
                          colorScheme="red"
                          size="lg"
                          onClick={() => {
                            setIsEdit(!isEdit);
                            setNewAddedItem((prev) => ({
                              ...prev,
                              islost: true,
                            }));
                            setUploadImg("");
                            onClose();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          isDisabled={
                            uploadImg === upload ||
                            newAddedItem.image === "" ||
                            newAddedItem.type === "" ||
                            newAddedItem.name === "" ||
                            newAddedItem.description === ""
                          }
                          variant={"solid"}
                          type="submit"
                          colorScheme="green"
                          size="lg"
                        >
                          Continue
                        </Button>
                      </Flex>
                    </form>
                  </Flex>
                  <Flex width="50%" justifyContent="center">
                    <Image
                      sizeBox="100%"
                      src={newAddedItem.image === "" ? upload : uploadImg}
                      width="90%"
                      borderRadius="30px"
                    />
                  </Flex>
                </Flex>
                <Flex flex={1}></Flex>
              </Stack>
            </Flex>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
