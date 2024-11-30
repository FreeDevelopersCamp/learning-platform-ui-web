import React from "react";
import "./header.css";
import Title from "./components/Title";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import AuthButtons from "./components/AuthButtons";
import Profile from "./components/Profile";
import { useUser } from "../../hooks/useUser";

const Header = ({ isAuth, user }) => {
  const { token, logout } = useUser();

  return (
    <header className="header">
      <Title />
      <NavBar />
      <SearchBar />
      {token ? <Profile logout={logout} /> : !isAuth && <AuthButtons />}
    </header>
  );
};

export default Header;
