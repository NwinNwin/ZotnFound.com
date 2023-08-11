import { useState, useEffect } from "react";

import {
  Switch,
  Box,
  Stack,
  Radio,
  RadioGroup,
  Text,
  Flex,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
} from "@chakra-ui/react";
import "./Filter.css";

export default function Filter({ findFilter, setFindFilter, onClose, isOpen }) {
  const [value, setValue] = useState("everything");

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setFindFilter((prev) => ({ ...prev, type: value }));
  }, [value]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontSize="4xl">Filter Markers</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" p="10px" pt="0">
              <form>
                <Flex mb="15px">
                  <Switch
                    colorScheme="red"
                    size="lg"
                    defaultChecked={findFilter.islost}
                    onChange={() => {
                      setFindFilter((prev) => ({
                        ...prev,
                        islost: !prev.islost,
                      }));
                    }}
                  />
                  <Text mb="0px" ml="50px" fontSize="xl">
                    Lost
                  </Text>
                </Flex>

                <Flex mb="20px">
                  <Switch
                    colorScheme="green"
                    size="lg"
                    onChange={() => {
                      setFindFilter((prev) => ({
                        ...prev,
                        isFound: !prev.isFound,
                      }));
                    }}
                    defaultChecked={findFilter.isFound}
                  />
                  <Text mb="0px" ml="50px" fontSize="xl">
                    Found
                  </Text>
                </Flex>

                <Flex mb="15px">
                  <Switch
                    colorScheme="blue"
                    size="lg"
                    defaultChecked={findFilter.isYourPosts}
                    onChange={() => {
                      setFindFilter((prev) => ({
                        ...prev,
                        isYourPosts: !prev.isYourPosts,
                      }));
                    }}
                  />
                  <Text mb="0px" ml="50px" fontSize="xl">
                    Your Posts
                  </Text>
                </Flex>

                <Text fontSize="xl" fontWeight="bold" mb="15px">
                  Select Specific Item:
                </Text>
                <Box>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack>
                      <Radio
                        defaultChecked
                        size="lg"
                        value="everything"
                        className="text--spacing"
                      >
                        Everything
                      </Radio>
                      <Radio
                        size="lg"
                        value="headphone"
                        className="text--spacing"
                      >
                        Headphones
                      </Radio>
                      <Radio size="lg" value="wallet" className="text--spacing">
                        Wallet
                      </Radio>
                      <Radio size="lg" value="key" className="text--spacing">
                        Keys
                      </Radio>
                      <Radio size="lg" value="phone" className="text--spacing">
                        Phone
                      </Radio>
                      <Radio size="lg" value="others" className="text--spacing">
                        Others
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Input
                  onChange={(e) => {
                    setFindFilter((prev) => ({
                      ...prev,
                      uploadDate: e.target.value,
                    }));
                  }}
                  mt="10px"
                  type="date"
                  value={findFilter.uploadDate}
                />
              </form>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setFindFilter({
                  type: "everything",
                  isFound: true,
                  islost: true,
                  uploadDate: "",
                });
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
