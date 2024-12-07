import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { MdOutlineMenu, MdMenuOpen } from 'react-icons/md';
import { LuSun } from 'react-icons/lu';
import { HiUser } from 'react-icons/hi2';
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
import Spinner from '../Spinner';
import NavBar from '../Header/NavBar';

const HeaderContainer = styled.div`
  background-color: #ffffff;
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
      font-weight: 700;
      color: #2c3e50;
      /* letter-spacing: 1px; */
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
        color: var(--color-grey-600);
        background-color: var(--color-grey-100);
      }
    }
  }
`;

const Header = ({ toggleSidebar, atHome = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { isLoading: sessionLoading, session } = useSession();

  const { user, isLoading: userLoading } = useUser(session?.username, {
    enabled: !!session?.username,
  });

  if ((sessionLoading || userLoading) && !atHome) return <Spinner />;

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
            <MdOutlineMenu style={{ fontSize: '2rem', zIndex: 1 }} />
          ) : (
            <MdMenuOpen style={{ fontSize: '2rem' }} />
          )}
        </div>
        <NavBar hidden={!atHome} />
        <SearchBar />
      </div>

      {session?.active ? (
        <div className="right-section">
          <div className="icon-container">
            <button className="flex items-center">
              <MdTranslate />
            </button>
          </div>
          <div className="icon-container">
            <button className="flex items-center">
              <LuSun />
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
