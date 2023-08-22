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
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
// import logo from "../../assets/images/small_logo.png";
import upload from "../../assets/images/download.png";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import { MdDriveFileRenameOutline, MdOutlineDescription } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import TypeSelector from "../TypeSelector/TypeSelector";

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

  const [date, setDate] = useState(new Date());
  console.log("date", date);

  const steps = [
    { title: "First", description: "Enter Item Info" },
    { title: "Second", description: "Select Item Type" },
    { title: "Third", description: "Choose Date" },
    { title: "Fourth", description: "File Upload" },
    { title: "Fifth", description: "Check Info" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

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
            setIsCreate(true);
            setIsEdit(false);
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
            <Flex padding={"2%"} flexDir={"column"}>
              {/* stepper */}
              <Stepper size="lg" index={activeStep} flex={1}>
                {steps.map((step, index) => (
                  <Step key={index} onClick={() => setActiveStep(index)}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              {/* steppper */}
              <Flex width="100%" justifyContent={"center"} mt="5%" mb="3%">
                {/* first step */}
                {activeStep === 0 && (
                  <FormControl>
                    <FormLabel py="10px">
                      Enter your information below:{" "}
                    </FormLabel>

                    <Input
                      variant="outline"
                      placeholder="Item Name"
                      mb="2"
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
                  </FormControl>
                )}
                {/* first step */}

                {/* second step */}
                {activeStep === 1 && (
                  <Flex
                    flexDir={"column"}
                    w="100%"
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <FormControl>
                      <FormLabel>Select Item Type:</FormLabel>
                    </FormControl>
                    {/* <Select
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
                      </Select> */}
                    <TypeSelector setNewAddedItem={setNewAddedItem}/>
                    <FormControl>
                      <Flex flexDir={"column"}>
                        <FormLabel htmlFor="lost-item">
                          Lost or Found Item?
                        </FormLabel>

                        <Flex alignItems={"center"} textAlign={"center"}>
                          <Switch
                            id="lost-switch"
                            size="lg"
                            colorScheme="red"
                            mr="2%"
                            onChange={() =>
                              setNewAddedItem((prev) => ({
                                ...prev,
                                islost: !prev.islost,
                              }))
                            }
                          />
                          <FormHelperText
                            fontSize="20px"
                            textAlign={"center"}
                            m="0"
                          >
                            {newAddedItem.islost ? "Lost" : "Found"}
                          </FormHelperText>
                        </Flex>
                      </Flex>
                    </FormControl>
                  </Flex>
                )}

                {/* second step */}

                {/* third step */}
                {activeStep === 2 && (
                  <FormControl>
                    <FormLabel py="10px">
                      {newAddedItem.islost ? "Lost Date:" : "Found Date:"}
                    </FormLabel>
                    {/* <Input
                      variant="outline"
                      mb="2"
                      type="date"
                      onChange={(e) =>
                        setNewAddedItem((prev) => ({
                          ...prev,
                          itemDate: e.target.value,
                        }))
                      }
                    /> */}
                    <Flex
                      w="100%"
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Calendar
                        className={"react-calendar"}
                        calendarType="US"
                        onChange={(e) => {
                          setDate(e);
                          setNewAddedItem((prev) => ({
                            ...prev,
                            itemDate: e.toISOString().split("T")[0],
                          }));
                        }}
                        value={date}
                      />
                    </Flex>
                  </FormControl>
                )}
                {/* third step */}

                {/* fourth step */}
                {activeStep === 3 && (
                  <FormControl>
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
                )}
                {/* fourth step */}

                {/* fifth step */}
                {activeStep === 4 && (
                  <Flex gap={"5%"}>
                    <Flex
                      flexDir={"column"}
                      flex={1}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRight={"1px solid #833c3c5c"}
                    >
                      <Text as="b" fontSize={25}>
                        Confirm & Submit
                      </Text>
                      <Image
                        sizeBox="100%"
                        src={newAddedItem.image === "" ? upload : uploadImg}
                        width="25vw"
                        height="25vh"
                        borderRadius="15%"
                        objectFit={"cover"}
                      />
                    </Flex>

                    <Flex
                      flex={1}
                      backgroundColor={"#f9f9f9"}
                      flexDir={"column"}
                      borderRadius={"10%"}
                    >
                      <Text textAlign={"center"}>Item Information</Text>

                      <Flex>
                        <MdDriveFileRenameOutline />
                        <Text>{newAddedItem.name}</Text>
                      </Flex>

                      <Flex>
                        <MdOutlineDescription />
                        <Text>{newAddedItem.description}</Text>
                      </Flex>

                      <Flex>
                        <FaMagnifyingGlass />
                        <Text>{newAddedItem.type}</Text>
                      </Flex>

                      <Flex>
                        <SlCalender />
                        <Text>{newAddedItem.itemDate}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
                {/* fifth step */}
              </Flex>

              <Flex justifyContent={"center"} gap="3%">
                {activeStep > 0 ? (
                  <Button
                    variant={"solid"}
                    colorScheme="blue"
                    size="lg"
                    onClick={() => {
                      setActiveStep((prevStep) => prevStep - 1);
                      console.log(activeStep);
                    }}
                  >
                    Back
                  </Button>
                ) : (
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
                )}
                {activeStep < 4 ? (
                  <Button
                    variant={"solid"}
                    colorScheme="blue"
                    size="lg"
                    onClick={() => {
                      setActiveStep((prevStep) => prevStep + 1);
                      console.log(activeStep);
                    }}
                  >
                    Continue
                  </Button>
                ) : (
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
                    onClick={() => {
                      onClose();
                      setActiveStep(0);
                      setIsCreate(false);
                    }}
                  >
                    Continue
                  </Button>
                )}
              </Flex>
            </Flex>
            {/* <Flex width="100%" justifyContent="center" padding="10px">
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
            </Flex> */}
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
