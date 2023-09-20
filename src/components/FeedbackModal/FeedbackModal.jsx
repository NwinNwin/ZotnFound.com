import {
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import DataContext from "../../context/DataContext";
import { useState, useContext } from "react";

export default function FeedbackModal({
  setData,
  infoOnClose,
  isOpen,
  onClose,
  props,
}) {
  const [feedbackHelped, setFeedbackHelped] = useState(null);
  const { setLoading } = useContext(DataContext);

  async function handleFeedback() {
    setLoading(false);
    axios
      .put(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}`, {
        isHelped: feedbackHelped,
      })
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));

    setData((prevItems) => {
      if (prevItems && prevItems.length > 0) {
        return prevItems.map((item) => {
          if (item.id === props.id) {
            item.isresolved = true;
            item.isHelped = feedbackHelped;
          }
          return item;
        });
      }
      return prevItems;
    });
    setLoading(true);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (feedbackHelped === null) {
          onClose();
        } else {
          onClose();
          infoOnClose();
        }
      }}
    >
      <ModalOverlay />
      {feedbackHelped === null ? (
        <ModalContent>
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            ⚠️ Feedback ⚠️
          </ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text>Did ZotnFound help with resolving your item?</Text>
          </Flex>
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setFeedbackHelped(false);
              }}
            >
              No 👎
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                setFeedbackHelped(true);
              }}
            >
              Yes 👍
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            ❤️ Thank You For Your Feedback ❤️
          </ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text>Your feedback has been recorded.</Text>
          </Flex>
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleFeedback();
                onClose();
                infoOnClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
