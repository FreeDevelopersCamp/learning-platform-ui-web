import { useState } from 'react';
import styled from 'styled-components';

import { LuSun } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineMenu, MdMenuOpen } from 'react-icons/md';

import SearchBar from './SearchBar';
import Profile from '../Profile/Profile';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
  border-bottom: 1px solid var(--color-grey-300);
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.4);
  height: 6rem;
  z-index: 1000;

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
        color: var(--color-brand-100);
        background-color: var(--color-brand-200);
      }

      svg {
        color: #2c3e50;
        font-size: 1.5rem;
      }
    }

    .logo {
      font-size: 20px;
      font-weight: 600;
      color: #2c3e50;
      letter-spacing: 1px;
      cursor: pointer;
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

const Header = ({ username, name, toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  return (
    <HeaderContainer>
      <div className="left-section">
        <div className="logo" onClick={() => navigate('/')}>
          FreeDevCamp
        </div>
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
        <Profile username={username} name={name} size="45" />
      </div>
    </HeaderContainer>
  );
};

export default Header;
