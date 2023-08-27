import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  Image,
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
  ModalCloseButton,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
// import logo from "../../assets/images/small_logo.png";
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
import img_placeholder from "../../assets/images/img_placeholder.jpeg";
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
  setUploadImg,
  uploadImg,
  upload,
}) {
  const oldNewAddedItem = newAddedItem;
  const { user } = UserAuth();
  const { onLoginModalOpen } = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = () => {
    if (!newAddedItem.image) return;

    const time = new Date().getTime();
    const imageRef = ref(
      storage,
      `zotnfound2/images/${time + newAddedItem.image.name}`
    );

    uploadBytes(imageRef, newAddedItem.image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (
          url.includes(
            "https://firebasestorage.googleapis.com/v0/b/zotnfound2.appspot.com/o/zotnfound2%2Fimages%2FNaN"
          )
        ) {
          setUploadImg("");
        } else {
          setUploadImg(url);
          setNewAddedItem((prev) => ({ ...prev, image: url }));
          setIsLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    if (newAddedItem.image && typeof newAddedItem.image !== "string") {
      setIsLoading(true);
      uploadFile();
    }
  }, [newAddedItem.image]);

  const [date, setDate] = useState(new Date());

  const steps = [
    { title: "First", description: "Enter Info" },
    { title: "Second", description: "Select Type" },
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
          boxShadow="xl"
          _hover={{ bg: "#b4dbd9" }}
          backgroundColor="#33b249"
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
        onClose={() => {
          setNewAddedItem({
            image: "",
            type: "",
            islost: true,
            name: "",
            description: "",
            itemDate: "",
          });
          setUploadImg("");
          setActiveStep(0);
          setIsCreate(true);
          setIsEdit(false);
          onClose();
        }}
        size="4xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay>
          <ModalContent minHeight="50vh">
            <Flex padding={"2%"} flexDir={"column"}>
              {/* stepper */}
              <Stepper size="lg" index={activeStep} flex={1}>
                {steps.map((step, index) => (
                  <Step key={index}>
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
              <ModalCloseButton color={"#c43232"} />
              {/* steppper */}
              <Flex width="100%" justifyContent={"center"} mt="5%" mb="3%">
                {/* first step */}
                {activeStep === 0 && (
                  <Flex width="50%">
                    <FormControl>
                      <FormLabel>Enter your item below: </FormLabel>

                      <Input
                        variant="outline"
                        placeholder="Item Name"
                        mb="10px"
                        value={newAddedItem.name}
                        onChange={(e) =>
                          setNewAddedItem((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      <Textarea
                        variant="outline"
                        placeholder="Description of Item"
                        mb="2"
                        value={newAddedItem.description}
                        onChange={(e) =>
                          setNewAddedItem((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows="5"
                      />
                    </FormControl>
                  </Flex>
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
                      <FormLabel fontSize="xl">Select Item Type:</FormLabel>
                    </FormControl>

                    <TypeSelector
                      setNewAddedItem={setNewAddedItem}
                      newAddedItem={newAddedItem}
                    />
                    <FormControl>
                      <Flex flexDir={"column"}>
                        <FormLabel htmlFor="lost-item" fontSize="xl">
                          Lost or Found Item?
                        </FormLabel>

                        <Flex alignItems={"center"} textAlign={"center"}>
                          <Switch
                            id="lost-switch"
                            size="lg"
                            colorScheme="red"
                            mr="2%"
                            isChecked={newAddedItem.islost}
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
                    <FormLabel px="10%" fontSize="xl">
                      {newAddedItem.islost ? "Lost Date:" : "Found Date:"}
                    </FormLabel>

                    <Flex
                      w="100%"
                      alignItems={"center"}
                      justifyContent={"center"}
                      px="10%"
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
                    <Flex
                      gap={5}
                      alignItems="center"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Flex justifyContent="center" alignItems="center" gap={3}>
                        <Input
                          type="file"
                          multiple
                          width="38%"
                          sx={{
                            "::file-selector-button": {
                              height: 10,
                              padding: 0,
                              mr: 4,
                              background: "none",
                              border: "none",
                              fontWeight: "bold",
                            },
                          }}
                          onChange={(e) => {
                            setNewAddedItem((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }));
                          }}
                        />

                        {/* <Button onClick={uploadFile}>Confirm</Button> */}
                      </Flex>

                      {isLoading ? (
                        <Flex
                          width="10vw"
                          height="10vw"
                          bg="gray"
                          opacity="0.8"
                          justifyContent="center"
                          alignItems="center"
                          zIndex={1000000000}
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="yellow"
                            color="blue"
                            size="xl"
                          />
                        </Flex>
                      ) : (
                        <Image
                          width="40%"
                          src={uploadImg == "" ? img_placeholder : uploadImg}
                        />
                      )}
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
                      padding={"1vw"}
                    >
                      <Text textAlign={"center"} as="b" fontSize={23}>
                        Item Information
                      </Text>

                      <Flex mb="10%" ml="1%">
                        <MdDriveFileRenameOutline size={"1.3em"} />
                        <Text maxW="20vw" ml="2%" fontSize={15}>
                          {newAddedItem.name}
                        </Text>
                      </Flex>

                      <Flex mb="10%">
                        <MdOutlineDescription size={"1.3em"} />
                        <Text maxW="20vw" ml="2%" fontSize={15}>
                          {newAddedItem.description}
                        </Text>
                      </Flex>

                      <Flex mb="10%">
                        <FaMagnifyingGlass size={"1.3em"} />
                        <Text maxW="20vw" ml="2%" fontSize={15}>
                          {newAddedItem.islost ? "LOST" : "FOUND"}
                          {", "}
                          {newAddedItem.type.toUpperCase()}
                        </Text>
                      </Flex>

                      <Flex mb="10%">
                        <SlCalender size={"1.3em"} />
                        <Text maxW="20vw" ml="2%" fontSize={15}>
                          {newAddedItem.itemDate}
                        </Text>
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
                    colorScheme="red"
                    size="lg"
                    onClick={() => {
                      setActiveStep((prevStep) => prevStep - 1);
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
                      setNewAddedItem({
                        image: "",
                        type: "",
                        islost: true,
                        name: "",
                        description: "",
                        itemDate: "",
                      });
                      setUploadImg("");
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {activeStep < 4 ? (
                  <Button
                    isDisabled={
                      (activeStep === 0 && newAddedItem.name === "") ||
                      newAddedItem.description === "" ||
                      (activeStep === 1 && newAddedItem.type === "") ||
                      (activeStep === 2 && newAddedItem.itemDate === "") ||
                      (activeStep === 3 && uploadImg === "")
                    }
                    variant={"solid"}
                    colorScheme="blue"
                    size="lg"
                    onClick={() => {
                      setActiveStep((prevStep) => prevStep + 1);
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
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
