import { useState, useEffect } from "react";

import { Switch, Box, Stack, Radio, RadioGroup, Text, Flex, Input } from "@chakra-ui/react";
import "./Filter.css";

export default function Filter({ setFindFilter }) {
  const [value, setValue] = useState("everything");

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setFindFilter((prev) => ({ ...prev, type: value }));
  }, [value]);

  return (
    <Flex
      boxShadow="5px 5px 10px #dbdbdb,
    -5px -5px 10px #ffffff;"
      flexDirection="column"
      p="20px"
      pt="0"
      w="20vw"
      borderRadius="10px"
    >
      <h1 className="filter--title">Filter Markers</h1>
      <form>
        <Flex mb="15px">
          <Switch
            colorScheme="red"
            size="lg"
            defaultChecked
            onChange={() => {
              setFindFilter((prev) => ({ ...prev, isLost: !prev.isLost }));
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
            defaultChecked
            onChange={() => {
              setFindFilter((prev) => ({ ...prev, isFound: !prev.isFound }));
            }}
          />
          <Text mb="0px" ml="50px" fontSize="xl">
            Found
          </Text>
        </Flex>

        <Text fontSize="xl" fontWeight="bold" mb="15px">
          Select Specific Item:
        </Text>
        <Box>
          <RadioGroup onChange={setValue} value={value}>
            <Stack>
              <Radio defaultChecked size="lg" value="everything" className="text--spacing">
                Everything
              </Radio>
              <Radio size="lg" value="headphone" className="text--spacing">
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
            setFindFilter((prev) => ({ ...prev, uploadDate: e.target.value }));
          }}
          mt="10px"
          placeholder="Enter Date (12-12-2023)"
        />
      </form>
    </Flex>
  );
}
