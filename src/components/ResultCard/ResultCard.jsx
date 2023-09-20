import * as React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Divider,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import InfoModal from "../InfoModal/InfoModal.jsx";
import { formatDate } from "../../utils.js";
import locate from "../../assets/logos/locate.svg";

export default function ResultCard({ props, setData, onResultsBarClose }) {
  const infoModalDisclosure = useDisclosure();
  const {id} = useParams();

  const formattedDate = formatDate(new Date(props.date));
  return (
    <>
      <Card maxW="lg" align={"center"} mb="10px">
        <CardBody>
          <Image src={props.image} alt="Car key" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Flex justifyContent={"space-between"}>
              <Text color="blue.600" fontSize="md" fontWeight="bold">
                {props.name}
              </Text>
              <Text color="blue.600" fontSize="sm">
                {formattedDate}
              </Text>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex justifyContent={"space-between"}>
            <Button
              variant="ghost"
              colorScheme="blue"
              leftIcon={<InfoIcon />}
              size="md"
              w="20"
              onClick={infoModalDisclosure.onOpen}
            >
              View
            </Button>
            {props.islost ? (
              <Button
                colorScheme="red"
                ml="20%"
                size="md"
                w="40"
                gap={1}
                onClick={onResultsBarClose}
              >
                <Image src={locate} />
                Lost
              </Button>
            ) : (
              <Button
                colorScheme="green"
                ml="20%"
                size="md"
                w="40"
                gap={1}
                onClick={onResultsBarClose}
              >
                <Image src={locate} />
                Found
              </Button>
            )}
          </Flex>
        </CardFooter>
      </Card>
      {(infoModalDisclosure.isOpen || id) && (
        <InfoModal
          props={props}
          onClose={infoModalDisclosure.onClose}
          isOpen={id === props.id.toString() ? true: infoModalDisclosure.isOpen}
          setData={setData}
        />
      )}
    </>
  );
}
