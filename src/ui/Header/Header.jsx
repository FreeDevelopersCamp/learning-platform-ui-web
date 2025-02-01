import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { MdMenuOpen, MdOutlineMenu, MdTranslate } from 'react-icons/md';
import {
  HiChatBubbleLeftRight,
  HiOutlineMoon,
  HiOutlineSun,
  HiUser,
} from 'react-icons/hi2';
import { BsFire } from 'react-icons/bs';
import {
  RiDragDropLine,
  RiNotificationLine,
  RiStarSmileLine,
} from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { FiCalendar } from 'react-icons/fi';

import { useGetUser } from '@/apis/core/User/hooks/useGetUser.ts';
import { getRoleCode } from '@/utils/helpers.js';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetNotifications } from '../../apis/communication/Notification/hooks/useGetNotifications';

import AuthButtons from './AuthButtons';
import ShortcutsMenus from './ShortcutsMenu';
import SearchBar from './SearchBar';
import Menus from './ProfileMenu';
import SpinnerMini from '../SpinnerMini';
import NavBar from './NavBar';
import Modal from '../Menus/Modal';
import NotificationsMenu from './NotificationsMenu';

const HeaderContainer = styled.div`
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 5px 25px;
  border-bottom: 1px solid var(--color-grey-300);
  height: var(--header-height);

  .left-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .menu-icon {
      cursor: pointer;
      color: var(--color-grey-900);
      padding: 10px;
      margin-left: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: background-color 0.5s;

      &:hover {
        color: var(--color-grey-800);
        background-color: var(--color-grey-100);
      }

      font-size: 2.4rem;
      font-weight: 700;

      button:focus,
      button:active {
        outline: none;
        border: none;
      }
    }

    .logo {
      font-size: 20px;
      font-weight: 700;
      color: var(--color-grey-900);
      letter-spacing: 1px;
      cursor: pointer;
      display: flex;
      min-width: 240px;
      justify-content: center;
      align-items: center;
    }

    span {
      padding-top: 4px;
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 5px;

    .icon-container {
      font-size: 2.2rem;
      color: var(--color-grey-900);
      font-weight: 700;
      padding: 7px;
      border-radius: 50%;
      transition: color 0.5s;
      cursor: pointer;

      &:hover {
        color: var(--color-grey-700);
        background-color: var(--color-grey-100);
      }

      button:focus,
      button:active {
        outline: none;
        border: none;
      }
    }

    .icon-notifications {
      margin-top: 0.75rem;
      font-size: 2.2rem;
      color: var(--color-grey-900);
      font-weight: 700;
      padding: 7px;
      border-radius: 50%;
      transition: color 0.5s;
      cursor: pointer;

      &:hover {
        color: var(--color-grey-700);
        background-color: var(--color-grey-100);
      }

      button:focus,
      button:active {
        outline: none;
        border: none;
      }
    }

    *:focus,
    *:active {
      outline: none;
    }
  }
`;

const Header = ({ page, toggleSidebar, atHome = false }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoading: sessionLoading, session, logout } = useAuth();

  const { user, isLoading: userLoading } = useGetUser(session?.username, {
    enabled: !!session?.username,
  });

  const { notifications, isLoading } = useGetNotifications(user?._id);

  if (
    (sessionLoading || userLoading || !session || !user || isLoading) &&
    !atHome
  )
    return <SpinnerMini />;

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  const toggleStyles = atHome ? { display: 'none' } : { display: 'block' };

  return (
    <Modal>
      <HeaderContainer>
        <div className="left-section">
          <div
            className="logo architects-daughter-regular"
            onClick={() => navigate('/')}
          >
            {`freeDevelopersCamp`}
            <span className="pl-1">{'('}</span>
            <span className="pb-2">
              <BsFire />
            </span>
            <span>)</span>
          </div>
          {page === 'course' && (
            <div
              className="menu-icon"
              style={toggleStyles}
              onClick={handleToggle}
            >
              {isSidebarOpen ? (
                <MdOutlineMenu style={{ fontSize: '2.4rem', zIndex: 1 }} />
              ) : (
                <MdMenuOpen style={{ fontSize: '2.4rem' }} />
              )}
            </div>
          )}
          <NavBar hidden={!atHome} />
          <SearchBar />
        </div>

        {session && session?.active ? (
          <div className="right-section">
            <div className="icon-container">
              <button className="flex items-center">
                <MdTranslate />
              </button>
            </div>
            <div className="icon-container">
              <button onClick={toggleDarkMode} className="flex items-center">
                {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
              </button>
            </div>
            <div className="icon-container">
              <ShortcutsMenus>
                <ShortcutsMenus.Menu>
                  <ShortcutsMenus.Toggle icon={<RiStarSmileLine />} />
                  <ShortcutsMenus.List>
                    <ShortcutsMenus.Button
                      icon={<RxDashboard />}
                      onClick={() =>
                        navigate(
                          `${getRoleCode(session.role).toLowerCase().split(' ').join('')}`,
                        )
                      }
                    >
                      Dashboard
                    </ShortcutsMenus.Button>
                    <ShortcutsMenus.Button
                      icon={<PeopleIcon />}
                      onClick={() => navigate('/community')}
                    >
                      Community
                    </ShortcutsMenus.Button>
                    <ShortcutsMenus.Button
                      icon={<FiCalendar />}
                      onClick={() => navigate('/calendar')}
                    >
                      Calendar
                    </ShortcutsMenus.Button>
                    <ShortcutsMenus.Button
                      icon={<RiDragDropLine />}
                      onClick={() => navigate('/taskboard')}
                    >
                      Task Board
                    </ShortcutsMenus.Button>
                  </ShortcutsMenus.List>
                </ShortcutsMenus.Menu>
              </ShortcutsMenus>
            </div>

            <div className="icon-notifications">
              <NotificationsMenu notifications={notifications}>
                {({ isOpen, setIsOpen }) => (
                  <>
                    <NotificationsMenu.Toggle
                      id="notifications-menu"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                    {isOpen && (
                      <NotificationsMenu.List
                        id="notifications-menu"
                        notifications={notifications}
                      />
                    )}
                  </>
                )}
              </NotificationsMenu>
            </div>

            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={user?._id} user={user} />
                <Menus.List id={user?._id}>
                  <Menus.Button
                    icon={<HiUser />}
                    onClick={() =>
                      navigate(`/profile?username=${user?.userName}`)
                    }
                    style={{ fontSize: '2rem' }}
                  >
                    My Profile
                  </Menus.Button>
                  <Menus.Button
                    icon={<HiChatBubbleLeftRight />}
                    onClick={() => navigate('/chat')}
                  >
                    Chat
                  </Menus.Button>

                  <Menus.Button
                    icon={<SettingsIcon />}
                    onClick={() => navigate(`/settings`)}
                  >
                    Account Settings
                  </Menus.Button>
                  <Menus.Button icon={<LogoutIcon />} onClick={logout}>
                    Log Out
                  </Menus.Button>
                </Menus.List>
              </Menus.Menu>
            </Menus>
          </div>
        ) : (
          <AuthButtons />
        )}
      </HeaderContainer>
    </Modal>
  );
};

export default Header;
