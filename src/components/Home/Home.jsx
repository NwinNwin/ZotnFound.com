import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import "./Home.css";
import Filter from "../Filter/Filter";
import ResultsBar from "../ResultsBar/ResultsBar";
import { useNavigate } from "react-router-dom";
import CreateModal from "../CreateModal/CreateModal";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import instagram from "../../assets/logos/instagram.svg";
import { UserAuth } from "../../context/AuthContext";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Flex,
  HStack,
  Text,
  Image,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Box,
  PopoverArrow,
  Link,
  Stack,
} from "@chakra-ui/react";
import {
  SettingsIcon,
  TriangleDownIcon,
  PhoneIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import logo from "../../assets/images/small_logo.png";
export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { user, logOut } = UserAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [findFilter, setFindFilter] = useState({
    type: "everything",
    isFound: true,
    isLost: true,
    uploadDate: "",
  });

  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [isLost, setIsLost] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemDate, setItemDate] = useState(formatDate());
  const centerPosition = [33.6461, -117.8427];
  const [position, setPosition] = useState(centerPosition);
  const [focusLocation, setFocusLocation] = useState();
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  // Sort the array by date
  data.sort(compareDates);

  //get data
  useEffect(() => {
    const collectionRef = collection(db, "items");
    const getData = async () => {
      const querySnapshot = await query(collectionRef, orderBy("date"));
      const data = await getDocs(querySnapshot);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  // console.log(findFilter);
  window.onresize = () => {
    setScreenWidth(window.screen.width);
    console.log(screenWidth);
  };

  return (
    <div>
      <Flex
        justifyContent="space-between"
        shadow="md"
        alignItems="center"
        className="big"
      >
        <Flex
          alignItems="center"
          w={{ base: "20%", md: "20%" }}
          className="med"
          minWidth={{ base: "125px", md: "315px" }}
        >
          <Image
            width={{ base: "50px", md: "100px" }}
            src={logo}
            mb="5%"
            mt="3%"
            ml="10%"
            display={screenWidth < 350 ? "None" : "inline"}
          />
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              w={{ base: "sm", md: "lg" }}
              minWidth={{ base: "120px", md: "180px" }}
              mr="1%"
              fontSize={{ base: "sm", md: "2xl" }}
            >
              ZotnFound
            </MenuButton>
            <MenuList zIndex={10000}>
              <MenuItem
                alignItems={"center"}
                justifyContent={"center"}
                as={"a"}
                href="/update"
              >
                News
              </MenuItem>
              <MenuItem
                alignItems={"center"}
                justifyContent={"center"}
                as={"a"}
                href="/about"
              >
                About
              </MenuItem>
              <MenuItem
                alignItems={"center"}
                justifyContent={"center"}
                as={"a"}
                href="https://www.instagram.com/zotnfound/"
              >
                @ZotnFound
                <Image
                  src={instagram}
                  maxWidth="10%"
                  maxHeight="10%"
                  ml="5%"
                ></Image>
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="500">
            <a href="https://www.instagram.com/zotnfound/" target="_blank" rel="noreferrer">
              @zotnfound&nbsp;
            </a>
          </Text> */}
          {/* <Box className="smal">
            <Menu autoSelect={false} width={{ base: "50px", md: "100px" }}>
              <MenuButton
                as={Button}
                fontSize={{ base: "xl", md: "3xl" }}
                fontWeight="500"
                rightIcon={<ChevronDownIcon />}
                bg={"white"}
              >
                ZotnFound
              </MenuButton>
              <Portal>
                <MenuList zIndex={1000}>
                  <MenuItem closeOnSelect={false}>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <Button width="100%" colorScheme="gray">
                          Instagram{" "}
                          <Image
                            src={instagram}
                            maxWidth="70%"
                            maxHeight="70%"
                            ml="5%"
                          ></Image>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        boxShadow={"2xl"}
                        width="20vw"
                        maxWidth="20vw"
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Flex justifyContent={"center"} alignItems={"center"}>
                            No updates currently!
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </MenuItem>
                  <MenuItem closeOnSelect={false}>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <Button width="100%" colorScheme="gray">
                          News
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        boxShadow={"2xl"}
                        width="20vw"
                        maxWidth="20vw"
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Flex justifyContent={"center"} alignItems={"center"}>
                            No updates currently!
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </MenuItem>
                  <MenuItem closeOnSelect={false}>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <Button width="100%" colorScheme="gray">
                          About
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        boxShadow={"2xl"}
                        width="20vw"
                        maxWidth="20vw"
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Flex justifyContent={"center"} alignItems={"center"}>
                            <p>
                              Keep up with our{" "}
                              <Link
                                href="https://www.instagram.com/zotnfound/"
                                color="#305db7"
                              >
                                Instagram
                                <span></span>
                              </Link>
                            </p>
                            <Image
                              boxSize="20px"
                              src={instagram}
                              display={{ base: "none", md: "block" }}
                            />
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box> */}
        </Flex>
        <HStack
          w={{ base: "100%", md: "40%" }}
          display={{ base: "none", md: "block" }}
        >
          <InputGroup mt="1%" size={{ base: "md", md: "lg" }} mb="1%">
            <InputLeftAddon children="🔎" />
            <Input
              type="teal"
              placeholder="Search Items ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </HStack>

        <Stack
          mr="1%"
          direction={{ base: "column", md: "row" }}
          paddingRight={"1%"}
          width={"fit-content"}
          // minWidth={"50px"}
        >
          <Text
            fontSize={{ base: "sm", md: "xl" }}
            fontWeight="500"
            mr={{ base: "1%", md: "4%" }}
            width={"10em"}
          >
            {user?.email}
          </Text>
          <Button
            colorScheme="blue"
            size={{ base: "sm", md: "lg" }}
            mt="2%"
            mr="5%"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Flex>

      {/* Mobile Search */}
      <Flex
        w="100%"
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex width="95%">
          <InputGroup mt="3%" size={{ base: "md", md: "lg" }} mb="1%">
            <InputLeftAddon children="🔎" />
            <Input
              type="teal"
              placeholder="Search Items ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <Flex position="relative" marginTop="2%" px="2%">
        {/* <CreateModal /> */}
        <Flex
          width={{ base: "95vw", md: "10vw" }}
          height={{ md: "80vh" }}
          padding={{ base: 0, md: 5 }}
          position="absolute"
          zIndex={1000}
          flexDirection={{ base: "row", md: "column" }}
          justifyContent="space-between"
        >
          <Button colorScheme="teal" onClick={onOpen} fontSize="3xl" size="lg">
            <SettingsIcon />
          </Button>
          <Filter
            setFindFilter={setFindFilter}
            findFilter={findFilter}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
          />
          <CreateModal
            setImage={setImage}
            setDescription={setDescription}
            setIsLost={setIsLost}
            setName={setName}
            setType={setType}
            image={image}
            description={description}
            isLost={isLost}
            setIsCreate={setIsCreate}
            isCreate={isCreate}
            name={name}
            type={type}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setPosition={setPosition}
            centerPosition={centerPosition}
            itemDate={itemDate}
            setItemDate={setItemDate}
          />
        </Flex>
        <Flex position="absolute">
          <Map
            data={data}
            isEdit={isEdit}
            isLost={isLost}
            type={type}
            image={image}
            description={description}
            name={name}
            email={user?.email}
            setIsEdit={setIsEdit}
            search={search}
            findFilter={findFilter}
            setIsLost={setIsLost}
            setData={setData}
            setIsCreate={setIsCreate}
            isCreate={isCreate}
            centerPosition={centerPosition}
            position={position}
            setPosition={setPosition}
            itemDate={itemDate}
            setItemDate={setItemDate}
            onOpen2={onOpen}
            focusLocation={focusLocation}
            setFocusLocation={setFocusLocation}
          />
        </Flex>
        <Flex
          position="absolute"
          top={0}
          right={5}
          display={{ base: "none", md: "flex" }}
        >
          <ResultsBar
            data={data}
            search={search}
            findFilter={findFilter}
            currentEmail={user?.email}
            setData={setData}
            setFocusLocation={setFocusLocation}
          />
        </Flex>
      </Flex>
    </div>
  );
}
