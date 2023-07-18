import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import "./Home.css";
import Filter from "../Filter/Filter";
import ResultsBar from "../ResultsBar/ResultsBar";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../../assets/images/small_logo.png";

import logout from "../../assets/logos/logout.svg";
import userlogo from "../../assets/logos/userlogo.svg";
import yourposts from "../../assets/logos/yourposts.svg";

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
              size={{ base: "4xl", md: "4xl" }}
              ml="3%"
              fontSize={{ base: "xl", md: "4xl" }}
              background="white"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              ZotnFound
            </MenuButton>
            <MenuList zIndex={10000}>
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
            </MenuList>
          </Menu>
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

        <Flex alignItems="center" justifyContent="space-between" mr={7}>
          <Menu>
            <MenuButton>
              <Image
                src={user?.photoURL}
                h={{ base: "50px", md: "80px" }}
                w={{ base: "50px", md: "80px" }}
                borderRadius="100%"
                mr={5}
              />
            </MenuButton>

            <MenuList>
              <MenuItem _focus={{ bg: "white" }}>
                <Image
                  boxSize="1.2rem"
                  src={userlogo}
                  alt="logoutbutton"
                  mr="12px"
                />
                {user?.email}
              </MenuItem>
              <MenuItem>
                <Image
                  boxSize="1.2rem"
                  src={yourposts}
                  alt="logoutbutton"
                  mr="12px"
                />
                Your Posts
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <Image
                  boxSize="1.2rem"
                  src={logout}
                  alt="logoutbutton"
                  mr="12px"
                />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
          <Flex display={{ base: "none", md: "block" }}>
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
        </Flex>
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
          {/* <CreateModal
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
          /> */}
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
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed"
          bottom="5%"
          width="100vw"
        >
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
        </Box>
      </Flex>
    </div>
  );
}
