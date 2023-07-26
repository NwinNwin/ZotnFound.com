import React from "react";
import { Button, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
      <Text fontSize={{ base: "2rem", md: "3rem" }} as="b" width={"10em"}>
        We are ZotnFound
      </Text>
      <Text fontSize={{ base: "1rem", md: "1.5rem" }} width={"40em"}>
        insert bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
        quae distinctio corporis officiis neque incidunt placeat, doloribus
        minus atque qui in accusamus architecto quidem excepturi maxime
        reiciendis, harum est sequi?
      </Text>
      <Flex
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <Text>Lost Items</Text>
        <Text>Found Items</Text>
        <Text>Successful Returns</Text>
        <Text>Active Users</Text>
        <Text>test</Text>
      </Flex>
      <Button onClick={handleClick}>Back </Button>
    </Flex>
  );
}
