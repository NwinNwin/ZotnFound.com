import React, { useContext } from "react";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Image, Center } from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import wallpaper from "../../assets/images/wallpaper.png";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSignUp, setIsSignUp] = React.useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    isSignUp ? createUsers() : signIn();
  }
  function createUsers() {
    if (email.endsWith("@uci.edu")) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // const user = userCredential.user;
          navigate(0);
        })
        .catch((error) => {
          alert("EMAIL ALREADY IN USE");
        });
    } else {
      alert("INVALID EMAIL: ONLY FROM UCI");
    }
  }

  async function signIn() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/home");
      })
      .catch((error) => {
        alert("INVALID EMAIL OR PASSWORD");
      });
  }

  return (
    <Stack width={"100vw"} minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={3} w={"full"} maxW={"md"}>
          <Center>
            <Image borderRadius="full" boxSize="300px" src={logo} alt="zotnfoundLogo" />
          </Center>
          <Heading fontSize={"3xl"} py="20px">
            {isSignUp ? "Create ZotnFound Account" : "Welcome Back Anteater!"}
          </Heading>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => handleEmail(e)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => handlePassword(e)} />
            </FormControl>
            <Stack spacing={6}>
              <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}></Stack>
              {isSignUp ? (
                <Button colorScheme={"green"} variant={"solid"} type="submit">
                  Create Account
                </Button>
              ) : (
                <Button colorScheme={"blue"} variant={"solid"} type="submit">
                  Sign In
                </Button>
              )}
            </Stack>
          </form>
          <Link color={"blue.500"} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Have Account? Sign In" : "No Account? Create One"}
          </Link>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image width="100%" height="100vh" alt={"Login Image"} objectFit={"cover"} src={wallpaper} />
      </Flex>
    </Stack>
  );
}
