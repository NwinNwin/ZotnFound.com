import { Image, Flex, Text } from "@chakra-ui/react";

export default function ImageContainer({ image, isresolved }) {
  return (
    <Flex>
      {isresolved && <Flex
        backgroundColor={"rgba(255, 123, 0, 0.9)"}
        position={"absolute"}
        w={282}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={90}
        flexDir={"column"}
      >
        <Text fontSize={18} as="b" color={"white"} >RETURNED</Text>
        <Text fontSize={15} color={"white"} >This item has been returned.</Text>
      </Flex>}
      <Image
        rounded={"lg"}
        height={230}
        width={282}
        objectFit={"cover"}
        src={image}
      />
    </Flex>
  );
}
