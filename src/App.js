import React, { useState, useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const ShowLogin = ({ children }) => {
    return currentUser ? <Navigate to="/home" /> : children;
  };
  useEffect(() => {
    const collectionRef = collection(db, "items");
    const getData = async () => {
      const data = await getDocs(collectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ShowLogin>
                <Login />
              </ShowLogin>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home data={data} setData={setData} />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
