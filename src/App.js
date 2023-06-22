import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const ShowLogin = ({ children }) => {
    return currentUser ? <Navigate to="/home" /> : children;
  };

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
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
