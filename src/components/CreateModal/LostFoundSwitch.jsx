import { Flex, Text } from "@chakra-ui/react";
export default function LostFoundSwitch({ newAddedItem, setNewAddedItem }) {
  return (
    <>
      {newAddedItem.islost ? (
        <Flex
          width={"200px"}
          bg="darkred"
          color="white"
          borderRadius={"full"}
          justifyContent="space-between"
          onClick={() =>
            setNewAddedItem((prev) => ({
              ...prev,
              islost: !prev.islost,
            }))
          }
        >
          <Flex justifyContent={"center"} py={5} w={"60%"}>
            <Text fontSize="2xl">LOST💔</Text>
          </Flex>
          <Flex
            width={"40%"}
            bg={"white"}
            border={"2px black solid"}
            borderRadius={"full"}
          ></Flex>
        </Flex>
      ) : (
        <Flex
          width={"200px"}
          bg="navy"
          color="white"
          borderRadius={"full"}
          justifyContent="space-between"
          onClick={() =>
            setNewAddedItem((prev) => ({
              ...prev,
              islost: !prev.islost,
            }))
          }
        >
          <Flex
            width={"40%"}
            bg={"white"}
            border={"2px black solid"}
            borderRadius={"full"}
          ></Flex>
          <Flex justifyContent={"center"} py={5} w={"60%"}>
            <Text fontSize="2xl">FOUND👐</Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}
