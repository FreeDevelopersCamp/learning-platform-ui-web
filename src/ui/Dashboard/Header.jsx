import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { MdOutlineMenu, MdMenuOpen } from 'react-icons/md';
import { HiOutlineMoon, HiOutlineSun, HiUser } from 'react-icons/hi2';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BsFire } from 'react-icons/bs';
import { RiStarSmileLine } from 'react-icons/ri';
import { RiNotificationLine } from 'react-icons/ri';
import { MdTranslate } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { FiCalendar } from 'react-icons/fi';
import { RiDragDropLine } from 'react-icons/ri';

import { useLogout } from '../../contexts/auth/AuthContext';
import { useSession } from '../../hooks/auth/useSession';
import { useUser } from '../../hooks/users/useUser';
import { getRoleCode } from '../../utils/helpers';

import AuthButtons from '../Header/AuthButtons';
import ShortcutsMenus from './ShortcutsMenu';
import SearchBar from './SearchBar';
import Menus from './ProfileMenu';
import SpinnerMini from '../SpinnerMini';
import NavBar from '../Header/NavBar';
import { useDarkMode } from '../../contexts/DarkModeContext';

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
      padding: 13px;
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

    *:focus,
    *:active {
      outline: none;
    }

  }
`;

const Header = ({ toggleSidebar, atHome = false }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { isLoading: sessionLoading, session } = useSession();

  const { user, isLoading: userLoading } = useUser(session?.username, {
    enabled: !!session?.username,
  });

  if ((sessionLoading || userLoading || !session || !user) && !atHome)
    return <SpinnerMini />;

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  const toggleStyles = atHome ? { display: 'none' } : { display: 'block' };

  return (
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
        <div className="menu-icon" style={toggleStyles} onClick={handleToggle}>
          {isSidebarOpen ? (
            <MdOutlineMenu style={{ fontSize: '2.4rem', zIndex: 1 }} />
          ) : (
            <MdMenuOpen style={{ fontSize: '2.4rem' }} />
          )}
        </div>
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
                    onClick={() => navigate(`${getRoleCode(session.role)}`)}
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
          <div className="icon-container">
            <button className="flex items-center">
              <RiNotificationLine />
            </button>
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
                  icon={<NotificationsIcon />}
                  onClick={() => console.log('Logout clicked')}
                >
                  Notifications
                </Menus.Button>

                <Menus.Button
                  icon={<EmailIcon />}
                  onClick={() => console.log('Logout clicked')}
                >
                  Email
                </Menus.Button>

                <Menus.Button
                  icon={<HiChatBubbleLeftRight />}
                  onClick={() => console.log('Logout clicked')}
                >
                  Chat
                </Menus.Button>

                <Menus.Button
                  icon={<SettingsIcon />}
                  onClick={() => console.log('Logout clicked')}
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
  );
};

export default Header;
