import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import UpdatePage from "./components/UpdatePage/UpdatePage";

import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { AuthContextProvider } from "./context/AuthContext";
import AboutPage from "./components/AboutPage/AboutPage";
//
function App() {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/update" element={<UpdatePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default App;
