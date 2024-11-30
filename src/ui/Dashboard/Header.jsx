import React, { useState } from "react";
import { FaBars, FaBell, FaSun } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import styled from "styled-components";

import SearchBar from "./SearchBar";

const HeaderContainer = styled.div`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;

  .left-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .menu-icon {
      cursor: pointer;
      background: #e0f4ff;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: background-color 0.3s;

      &:hover {
        background-color: #d0eaff;
      }

      svg {
        color: #2c3e50;
        font-size: 1.5rem;
      }
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #2c3e50;
      letter-spacing: 1px;
      margin-right: 100px;
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .icon-container {
      cursor: pointer;
      font-size: 1.5rem;
      color: #2c3e50;
      transition: color 0.3s;

      &:hover {
        color: #3498db;
      }
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }

      span {
        font-size: 14px;
        color: #2c3e50;
        font-weight: 500;
      }
    }
  }
`;

const Header = ({ toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  return (
    <HeaderContainer>
      {/* Left Section */}
      <div className="left-section">
        <div className="logo">FreeDevelopersCame</div>
        <div className="menu-icon" onClick={handleToggle}>
          {isSidebarOpen ? (
            <FaBars />
          ) : (
            <MdMenuOpen style={{ fontSize: "2rem" }} />
          )}
        </div>
        <SearchBar />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="icon-container">
          <FaSun />
        </div>
        <div className="icon-container">
          <FaBell />
        </div>
        <div className="profile">
          <span>Rinku Verma</span>
          <img src="https://via.placeholder.com/40" alt="User Profile" />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
