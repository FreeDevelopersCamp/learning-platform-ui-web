import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Check if a token is stored in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
