import React from "react";
import { useUser } from "../../hooks/useUser";
import Header from "../../components/Header/Header";
import Footer from "../../common/Footer/Footer";
import SideBar from "./components/SideBar";
import ProfileContent from "./components/ProfileContent";
import "./profilePage.css";

const ProfilePage = () => {
  const { token } = useUser();

  return (
    <>
      <Header />
      <div className="profilePage-container">
        <SideBar />
        <ProfileContent />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
