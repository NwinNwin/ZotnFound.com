import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import "./Home.css";
import Filter from "../Filter/Filter";
import ResultsBar from "../ResultsBar/ResultsBar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateModal from "../CreateModal/CreateModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import instagram from "../../assets/logos/instagram.svg";

import { Input, InputGroup, InputLeftAddon, Button, Flex, HStack, Text, Image } from "@chakra-ui/react";
import logo from "../../assets/images/small_logo.png";
export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

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
  const { dispatch } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [isLost, setIsLost] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemDate, setItemDate] = useState(formatDate());

  const navigate = useNavigate();

  const centerPosition = [33.6461, -117.8427];
  const [position, setPosition] = useState(centerPosition);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // // Sign-out successful.
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
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
      const data = await getDocs(collectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  console.log(findFilter);

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
            {currentUser?.email}
          </Text>
          <Button colorScheme="blue" size="lg" mt="2%" mr="5%" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>
      <div className="home">
        {/* <CreateModal /> */}
        <Flex alignItems="center" display="block">
          <Filter setFindFilter={setFindFilter} />
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
        <Map
          data={data}
          isEdit={isEdit}
          isLost={isLost}
          type={type}
          image={image}
          description={description}
          name={name}
          email={currentUser?.email}
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
        />
        <ResultsBar data={data} search={search} findFilter={findFilter} currentEmail={currentUser?.email} setData={setData} />
      </div>
    </div>
  );
}
