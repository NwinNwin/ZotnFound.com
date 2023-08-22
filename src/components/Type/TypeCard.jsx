import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

export default function TypeCard({
  type,
  icon,
  pressed,
  setPressed,
  setNewAddedItem,
}) {
  const handleOnClick = () => {
    setPressed(type);
    setNewAddedItem((prev) => ({
      ...prev,
      type: type,
    }));
  };

  return (
    <Flex
      backgroundColor={pressed === type ? "#787092" : "#a698d8"}
      w="11vw"
      h="11vw"
      m="2%"
      borderRadius={"5%"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      onClick={handleOnClick}
      _hover={{cursor: "pointer"}}
    >
      <Text>{type}</Text>
      <Image src={icon} w="5vw" h="5vw" />
    </Flex>
  );
}
