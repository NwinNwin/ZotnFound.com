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

import { Input, InputGroup, InputLeftAddon, Button, Flex, HStack, Text, Image, useDisclosure } from "@chakra-ui/react";
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

  return (
    <div>
      <Flex justifyContent="space-between" shadow="md" alignItems="center">
        <Flex alignItems="center" w="10%">
          <Image width="100px" src={logo} mb="3%" mt="3%" ml="10%" />
          <Text fontSize="3xl" fontWeight="500">
            <a href="https://www.instagram.com/zotnfound/" target="_blank" rel="noreferrer">
              @zotnfound&nbsp;
            </a>
          </Text>
          <Image boxSize="30px" src={instagram} />
          {/* <Image boxSize='50' src={instagram} /> */}
        </Flex>
        <HStack w="40%">
          <InputGroup ml="12%" mt="1%" size="lg" mb="1%">
            <InputLeftAddon children="🔎" />
            <Input type="teal" placeholder="Search Items ..." onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
        </HStack>

        <HStack mr="1%">
          <Text fontSize="xl" fontWeight="500" mr="4%">
            {user?.email}
          </Text>
          <Button colorScheme="blue" size="lg" mt="2%" mr="5%" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>
      <div className="home">
        {/* <CreateModal /> */}
        <Flex alignItems="center" display="block" position="absolute" zIndex={1000}>
          <Button colorScheme="teal" onClick={onOpen}>
            Filter
          </Button>
          <Filter setFindFilter={setFindFilter} findFilter={findFilter} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
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
          />
        </Flex>

        <Flex position="absolute" top={0} right={5}>
          <ResultsBar data={data} search={search} findFilter={findFilter} currentEmail={user?.email} setData={setData} setFocusLocation={setFocusLocation} />
        </Flex>
      </div>
    </div>
  );
}
