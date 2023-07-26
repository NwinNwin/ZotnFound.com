import { React, useState } from "react";
import { Button, Text, Flex, Stack, Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  window.onresize = () => {
    setScreenWidth(window.screen.width);
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Flex
      alignItems={"center"}
      direction={"column"}
      height={"100vh"}
      paddingTop={"1em"}
      gap={"1em"}
      width={"100vw"}
    >
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100vw"}
      >
        <Flex display={screenWidth < 992 ? "none" : "block"} marginLeft={10}>
          <Button onClick={handleClick} visibility={"hidden"}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
        <Text fontSize={{ base: "2rem", md: "3rem" }} as="b" width={"10em"}>
          We are ZotnFound
        </Text>
        <Flex>
          <Button onClick={handleClick} marginRight={{ lg: 10 }}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
      </Stack>
      <Text
        fontSize={{ base: "1rem", md: "1.5rem" }}
        width={{ base: "20em", md: "40em" }}
      >
        insert bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
        quae distinctio corporis officiis neque incidunt placeat, doloribus
        minus atque qui in accusamus architecto quidem excepturi maxime
        reiciendis, harum est sequi?
      </Text>
      <Flex
        direction={"row"}
        justifyContent="center"
        alignItems={"center"}
        gap={"1em"}
        background={"#FBF7F6"}
        width={"100vw"}
      >
        <Flex direction={"column"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1rem" }}>Lost Items</Text>
        </Flex>
        <Flex direction={"column"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1rem" }}>Found Items</Text>
        </Flex>
        <Flex direction={"column"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1rem" }}>
            Successful Returns
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1rem" }}>Active Users</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
