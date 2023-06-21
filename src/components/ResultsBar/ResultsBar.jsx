import "./ResultsBar.css";
import ResultCard from "../ResultCard/ResultCard";
import { Box } from "@chakra-ui/react";
export default function ResultsBar({ data, search, findFilter, currentEmail, setData }) {
  const allResults = data
    .filter((item) => {
      return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search);
    })
    .filter((item) => {
      if (findFilter.isLost && item.isLost) {
        if (findFilter.type === "everything") {
          return item;
        } else if (findFilter.type === "headphone" && item.type === "headphone") {
          return item;
        } else if (findFilter.type === "phone" && item.type === "phone") {
          return item;
        } else if (findFilter.type === "key" && item.type === "key") {
          return item;
        } else if (findFilter.type === "wallet" && item.type === "wallet") {
          return item;
        } else if (findFilter.type === "others" && item.type === "others") {
          return item;
        }
      }
      if (findFilter.isFound && !item.isLost) {
        if (findFilter.type === "everything") {
          return item;
        } else if (findFilter.type === "headphone" && item.type === "headphone") {
          return item;
        } else if (findFilter.type === "phone" && item.type === "phone") {
          return item;
        } else if (findFilter.type === "key" && item.type === "key") {
          return item;
        } else if (findFilter.type === "wallet" && item.type === "wallet") {
          return item;
        } else if (findFilter.type === "others" && item.type === "others") {
          return item;
        }
      }

      return item;
    })
    .filter((item) => {
      return findFilter.uploadDate === "" ? item : item.date.includes(findFilter.uploadDate);
    })
    .map((item) => {
      return <ResultCard props={item} currentEmail={currentEmail} setData={setData} />;
    });

  return (
    <Box paddingX="5px" width="20vw" height="80vh" overflowY="scroll">
      {allResults}
    </Box>
  );
}
