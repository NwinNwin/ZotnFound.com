import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { AuthContextProvider } from "./context/AuthContext";
import { UserAuth } from "./context/AuthContext";


function App() {
  const {user} = UserAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  const ShowLogin = ({ children }) => {
    return user ? <Navigate to="/home" /> : children;
  };

  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}

export default App;
