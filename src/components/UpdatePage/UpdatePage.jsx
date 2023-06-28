import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function UpdatePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Text fontSize="3rem" as="b">
        Update Page
      </Text>
      <Flex justifyContent="center" height="70vh" mt="1%">
        <Flex background="#f7f7f7" width="50vw" borderRadius="30px" justifyContent="center" alignItems="center" flexDir="column" gap={20}>
          <Flex background="lightblue" width="70%" height="10%" borderRadius="10px" flexDir="column">
            <Text fontSize="3xl" color="navy" as="b">
              We're working on this shit
            </Text>
            <Text color="gray" as="b">
              06/28/2023
            </Text>
          </Flex>

          <Flex background="lightblue" width="70%" height="10%" borderRadius="10px" flexDir="column">
            <Text fontSize="3xl" color="navy" as="b">
              We're working on this shit
            </Text>
            <Text color="gray" as="b">
              06/28/2023
            </Text>
          </Flex>

          <Flex background="lightblue" width="70%" height="10%" borderRadius="10px" flexDir="column">
            <Text fontSize="3xl" color="navy" as="b">
              We're working on this shit
            </Text>
            <Text color="gray" as="b">
              06/28/2023
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Button onClick={handleClick}>Back </Button>
    </>
  );
}
