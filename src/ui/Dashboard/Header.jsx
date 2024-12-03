import React, { useState } from 'react';
import { LuSun } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineMenu, MdMenuOpen } from 'react-icons/md';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Profile from '../Profile/Profile';

const HeaderContainer = styled.div`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;

  .left-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .menu-icon {
      cursor: pointer;
      background: #e0f4ff;
      padding: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: background-color 0.5s;

      &:hover {
        color: var(--color-brand-600);
        background-color: var(--color-brand-200);
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
      margin-right: 65px;
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .icon-container {
      font-size: 2rem;
      color: #2c3e50;
      padding: 13px;
      border-radius: 50%;
      background: #e0f4ff;
      transition: color 0.5s;
      cursor: pointer;

      &:hover {
        color: var(--color-brand-600);
        background-color: var(--color-brand-200);
      }
    }
  }
`;

const Header = ({ auth, toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = auth.username;
  const name = 'Yazan Al-Sedih';

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  return (
    <HeaderContainer>
      <div className="left-section">
        <div className="logo">FreeDevelopersCame</div>
        <div className="menu-icon" onClick={handleToggle}>
          {isSidebarOpen ? (
            <MdOutlineMenu style={{ fontSize: '2rem', zIndex: 1 }} />
          ) : (
            <MdMenuOpen style={{ fontSize: '2rem' }} />
          )}
        </div>
        <SearchBar />
      </div>

      <div className="right-section">
        <div className="icon-container">
          <LuSun />
        </div>
        <div className="icon-container">
          <IoIosNotificationsOutline />
        </div>
        <Profile userName={userName} name={name} size="45" />
      </div>
    </HeaderContainer>
  );
};

export default Header;
