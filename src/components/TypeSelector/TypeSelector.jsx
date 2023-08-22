import { React, useState } from "react";
import { Flex } from "@chakra-ui/react";
import TypeCard from "../Type/TypeCard";
import { iconsMap } from "../Map/MapIcons";
import logo from "../../assets/images/small_logo.png";

export default function TypeSelector(props) {
  const [pressed, setPressed] = useState("");

  const types = {
    headphone: iconsMap["headphone"][true],
    phone: iconsMap["phone"][true],
    wallet: iconsMap["wallet"][true],
    key: iconsMap["key"][true],
    others: iconsMap["others"][true],
  };

  const typeContainers = Object.keys(types).map((type) => (
    <TypeCard key={type} type={type} icon={logo} pressed={pressed} setPressed={setPressed} setNewAddedItem={props.setNewAddedItem}/>
  ));

  return (
    <Flex
      w="50vw"
      flexWrap={"wrap"}
      alignItems={"center"}
      justifyContent={"center"}
      m={0}
    >
      {typeContainers}
    </Flex>
  );
}
