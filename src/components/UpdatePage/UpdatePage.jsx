import { React, useState } from "react";
import {
  Flex,
  Text,
  Button,
  Stack,
  List,
  ListItem,
  ListIcon,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { SiInstagram } from "react-icons/si";

export default function UpdatePage() {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  const handleClick = () => {
    navigate("/");
  };

  window.onresize = () => {
    setScreenWidth(window.screen.width);
  };

  return (
    <Stack alignItems="center" h="100vh">
      <Stack
        marginBottom="2%"
        direction={{ base: "column", md: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100vw"
      >
        <Flex display={screenWidth < 992 ? "none" : "block"} marginLeft={10}>
          <Button onClick={handleClick} visibility={"hidden"}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
        <Flex textAlign={"center"}>
          <Text fontSize={{ base: "2rem", md: "3rem" }} as="b">
            ZotnFound Updates
          </Text>
        </Flex>
        <Flex>
          <Button onClick={handleClick} marginRight={{ lg: 10 }}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
      </Stack>
      <Flex direction="column">
        <Flex
          direction={"column"}
          minH={"80vh"}
          w={{ base: "90vw", md: "50vw" }}
          borderLeft={"1px"}
          borderColor={"gray"}
        >
          <Flex
            position={{ lg: "absolute" }}
            right={{ lg: "20vw" }}
            top={{ lg: "30vh" }}
            transform={{ lg: "rotate(90deg)" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text as="b" fontSize={".75rem"} marginRight={10}>
              FOLLOW:
            </Text>
            <a href="https://www.instagram.com/zotnfound/">
              <SiInstagram size={"1.5rem"} cursor="pointer" />
            </a>
          </Flex>

          {/* update messages */}
          <Flex
            direction={"column"}
            alignItems={"flex-start"}
            marginLeft="15%"
            marginRight="15%"
            marginBottom={"2.5"}
            marginTop={"2.5"}
            gap="15px"
          >
            <Text as="b">7/16/2023</Text>
            <List>
              <ListItem textAlign="left" marginBottom={"2%"}>
                <ListIcon as={ChevronRightIcon} color="gray" />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
                exercitationem vitae esse rem similique nesciunt voluptatem
                doloremque nihil? A consequuntur voluptatum provident minima
                illo labore et quam totam dolorum aliquid. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Facilis mollitia, illo iure
                placeat aliquam nostrum temporibus quisquam eligendi doloribus
                dolorem accusantium doloremque molestiae amet, ea dolorum culpa
                voluptatum impedit nam. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Animi aspernatur consequuntur inventore, illum
                cupiditate officia dolorem commodi deserunt debitis, tempore,
                neque vitae maxime. Dicta, fugit. Dolores voluptate reiciendis
                enim nulla?
              </ListItem>
              <ListItem textAlign="left">
                <ListIcon as={ChevronRightIcon} color="gray" />
                New and improved map
              </ListItem>
            </List>
          </Flex>
          {/* ^^^^^ update messages ^^^^^^*/}
        </Flex>
      </Flex>
    </Stack>
  );
}
