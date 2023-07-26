import { useContext } from "react";
import "./ResultsBar.css";
import ResultCard from "../ResultCard/ResultCard";
import { Box } from "@chakra-ui/react";
import DataContext from "../../context/DataContext";
import { UserAuth } from "../../context/AuthContext";
export default function ResultsBar({
  search,
  findFilter,
  setData,
  setFocusLocation,
  onResultsBarClose,
}) {
  const { data } = useContext(DataContext);
  const { user } = UserAuth();

  const allResults = data
    .filter((item) => {
      return (
        (search.toLowerCase() === "" ||
          item.name.toLowerCase().includes(search)) &&
        (findFilter.isLost === item.isLost ||
          findFilter.isFound === !item.isLost) &&
        (findFilter.type === "everything" || findFilter.type === item.type) &&
        (findFilter.uploadDate === "" ||
          item.itemDate.includes(findFilter.uploadDate)) &&
        (!findFilter.isYourPosts ||
          (findFilter.isYourPosts && item.email === user.email))
      );
    })
    .map((item) => {
      return (
        <Box
          onClick={() => {
            setFocusLocation(item.location);
          }}
          _hover={{
            transform: "scale(0.99)",
          }}
        >
          <ResultCard
            props={item}
            setData={setData}
            onResultsBarClose={onResultsBarClose}
          />
        </Box>
      );
    });

  return (
    <Box
      paddingX="5px"
      width={{ base: "90vw", md: "21vw" }}
      height="80vh"
      overflowY="scroll"
    >
      {allResults}
    </Box>
  );
}
