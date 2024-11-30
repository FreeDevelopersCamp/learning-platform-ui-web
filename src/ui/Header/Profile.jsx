import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import userImage from "../../../assets/images/zzz.jpg";

// Import SVG files as image paths
import ProfileIcon from "../../../assets/icons/profile.svg";
import NotificationIcon from "../../../assets/icons/notifications.svg";
import SettingsIcon from "../../../assets/icons/settings.svg";
import LogoutIcon from "../../../assets/icons/logout.svg";
import "./profile.css";

const Profile = ({ logout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleProfile = () => {
    navigate("/www.freeDevloperCamp.com/profilePage");
  };

  const handleSettings = () => {
    alert("Settings clicked");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <div className="profile-container">
      <img
        src={userImage}
        alt="User Profile"
        className="profile-avatar"
        onClick={toggleDropdown}
      />
      {/* Apply the 'open' class based on dropdown state */}
      <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
        <button onClick={handleProfile}>
          <div>
            <img src={ProfileIcon} alt="Profile Icon" className="icon" />
            <p>Profile</p>
          </div>
        </button>
        <button onClick={() => alert("Notifications clicked")}>
          <div>
            <img
              src={NotificationIcon}
              alt="Notifications Icon"
              className="icon"
            />
            <p>Notifications</p>
          </div>
        </button>
        <button onClick={handleSettings}>
          <div>
            <img src={SettingsIcon} alt="Settings Icon" className="icon" />{" "}
            <p>Settings</p>
          </div>
        </button>
        <button onClick={handleLogout}>
          <div>
            <img src={LogoutIcon} alt="Logout Icon" className="icon" />
            <p>Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
