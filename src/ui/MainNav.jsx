import styled from 'styled-components';
import {
  HiEnvelope,
  HiHashtag,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
  HiPresentationChartLine,
  HiBell, // Notification Icon
  HiLogout, // Logout Icon
} from 'react-icons/hi2';
import { RiDragDropLine } from 'react-icons/ri';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BsShieldLock } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2rem 1.2rem 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: ${(props) =>
    props.isActive ? 'var(--color-grey-800)' : 'var(--color-grey-600)'};
  background-color: ${(props) =>
    props.isActive ? 'var(--color-grey-300)' : 'transparent'};
  border-radius: ${(props) =>
    props.isActive ? 'var(--border-radius-sm)' : '0'};

  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.4rem 2.4rem;
  cursor: pointer;
  transition: all 0.3s;

  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.4rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-300);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${(props) =>
      props.isActive ? 'var(--color-brand-600)' : 'var(--color-grey-400)'};
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ role, isOpen, activeMenu, onMenuSelect }) {
  const menuItems = [
    { id: 'dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
    { id: 'users', icon: <HiOutlineUsers />, label: 'Users' },
    { id: 'permissions', icon: <BsShieldLock />, label: 'Permissions' },
    { id: 'roadmaps', icon: <HiPresentationChartLine />, label: 'Roadmaps' },
    { id: 'blogs', icon: <HiHashtag />, label: 'Blogs' },
    { id: 'email', icon: <HiEnvelope />, label: 'Email' },
    { id: 'chat', icon: <HiChatBubbleLeftRight />, label: 'Chat' },
    {
      id: 'notifications',
      icon: <IoIosNotificationsOutline style={{ fontSize: '3rem' }} />,
      label: 'Notifications',
    },
    { id: 'calendar', icon: <HiOutlineCalendarDays />, label: 'Calendar' },
    { id: 'tasks', icon: <RiDragDropLine />, label: 'Task Board' },
    { id: 'settings', icon: <HiOutlineCog6Tooth />, label: 'Settings' },
    {
      id: 'logout',
      icon: <LuLogOut style={{ fontSize: '2rem' }} />,
      label: 'Logout',
    },
  ];

  return (
    isOpen && (
      <nav>
        <NavList>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              isActive={activeMenu === item.id}
              onClick={() => onMenuSelect(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </MenuItem>
          ))}
        </NavList>
      </nav>
    )
  );
}

export default MainNav;
