import { createContext } from "react";

const DataContext = createContext({
  data: [],
  isLoginModalOpen: false,
  onLoginModalOpen: () => {},
  onLoginModalClose: () => {},
  setLoading: () => {},
});

export default DataContext;
