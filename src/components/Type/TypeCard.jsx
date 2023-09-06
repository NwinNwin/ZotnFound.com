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
      w={{ md: "7vw", base: "13vh" }}
      h={{ md: "7vw", base: "13vh" }}
      borderRadius="20px"
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      onClick={handleOnClick}
    >
      <Text as="b" mb="5%" color={newAddedItem.type === type && "white"}>
        {type.toUpperCase()}
      </Text>
      <Image
        src={icon}
        w={{ md: "4vw", base: "6vh" }}
        h={{ md: "4vw", base: "6vh" }}
        alt="test"
      />
    </Button>
  );
}
