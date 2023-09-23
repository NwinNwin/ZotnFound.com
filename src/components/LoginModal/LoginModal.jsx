import { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Image,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import small_logo from "../../assets/images/small_logo.png";

import DataContext from "../../context/DataContext";
import google_logo from "../../assets/logos/google_logo.png";
import { UserAuth } from "../../context/AuthContext";

export default function LoginModal() {
  const { isLoginModalOpen, onLoginModalClose } = useContext(DataContext);
  const [isAttempt, setIsAttempt] = useState(false);
  const { googleSignIn, user } = UserAuth();

  async function signInGoogle() {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Modal
        isOpen={isLoginModalOpen && !user}
        onClose={onLoginModalClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" as="b">
              Login
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              gap={8}
            >
              <Image src={small_logo} width="15vh" />
              {isAttempt ? (
                <Alert
                  status="error"
                  justifyContent={"center"}
                  flexDir={"column"}
                  gap={2}
                >
                  <Flex>
                    <AlertIcon />
                    <AlertTitle>Can't sign in?</AlertTitle>
                  </Flex>
                  <AlertDescription>
                    Please sign in with @uci.edu
                  </AlertDescription>
                </Alert>
              ) : (
                <Text fontSize="2xl" as="b">
                  Welcome back Anteater!
                </Text>
              )}
              <Button
                onClick={() => {
                  signInGoogle();
                  setTimeout(() => {
                    setIsAttempt((prev) => true);
                  }, 5000);
                }}
                variant={"outline"}
                colorScheme="darkblue"
                size="lg"
              >
                <Flex gap={2} alignItems="center">
                  <Image width="20px" height="20px" src={google_logo} />
                  Sign in with UCI
                </Flex>
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
