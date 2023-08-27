import React from "react";
import { Image, Text, Button } from "@chakra-ui/react";

export default function TypeCard({
  type,
  icon,
  setNewAddedItem,
  newAddedItem,
}) {
  const handleOnClick = () => {
    setNewAddedItem((prev) => ({
      ...prev,
      type: type,
    }));
  };

  return (
    <Button
      backgroundColor={newAddedItem.type === type ? "#787092" : "white"}
      variant="outline"
      border="5px rgb(166, 152, 216) solid"
      w="7vw"
      h="7vw"
      borderRadius="20px"
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      onClick={handleOnClick}
    >
      <Text as="b" mb="5%" color={newAddedItem.type === type && "white"}>
        {type.toUpperCase()}
      </Text>
      <Image src={icon} w="4vw" h="4vw" alt="test" />
    </Button>
  );
}
