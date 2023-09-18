import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button
} from "@chakra-ui/react";

export default function FeedbackModal({infoOnClose, feedbackIsOpen, feedbackOnClose}) {
  return (
    <Modal isOpen={feedbackIsOpen} onClose={() => {
        feedbackOnClose();
        infoOnClose();
    }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
      

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={feedbackOnClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
