import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth/AuthContext';

import {
  HiEnvelope,
  HiHashtag,
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineUsers,
  HiPresentationChartLine,
} from 'react-icons/hi2';
import { RiDragDropLine } from 'react-icons/ri';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BsShieldLock } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';
import { GoProjectRoadmap } from 'react-icons/go';
import { BiTask } from 'react-icons/bi';
import { MdLeaderboard } from 'react-icons/md';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InsightsIcon from '@mui/icons-material/Insights';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { MdOutlineAssessment } from 'react-icons/md';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 1.2rem 0;
  color: white;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: ${(props) => (props.isActive ? 'white' : 'var(--color-grey-300)')};
  background-color: 'transparent';
  border-radius: ${(props) =>
    props.isActive ? 'var(--border-radius-sm)' : '0'};

  font-size: 16px;
  font-weight: 400;
  min-height: 36px;
  padding-bottom: 8px;
  /* padding-top: 8px; */

  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #030b35;
  }

  & svg {
    width: 24px;
    height: 24px;
    color: ${(props) =>
      props.isActive ? 'var(--color-brand-600)' : 'var(--color-grey-400)'};
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ isOpen, activeMenu, role, onMenuSelect }) {
  const { logout } = useAuth();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const adminMenu = [
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
    ];

    const instructorMenu = [
      { id: 'dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
      { id: 'roadmaps', icon: <HiPresentationChartLine />, label: 'Roadmaps' },
      { id: 'courses', icon: <FaTasks />, label: 'Courses' },
      { id: 'projects', icon: <GoProjectRoadmap />, label: 'Projects' },
      { id: 'tasks', icon: <RiDragDropLine />, label: 'Tasks' },
      { id: 'quizes', icon: <BiTask />, label: 'Quizes' },
      { id: 'learner', icon: <HiOutlineUsers />, label: 'Learner' },
      { id: 'email', icon: <HiEnvelope />, label: 'Email' },
      { id: 'chat', icon: <HiChatBubbleLeftRight />, label: 'Chat' },
      {
        id: 'notifications',
        icon: <IoIosNotificationsOutline style={{ fontSize: '3rem' }} />,
        label: 'Notifications',
      },
      { id: 'calendar', icon: <HiOutlineCalendarDays />, label: 'Calendar' },
    ];

    const learnerMenu = [
      { id: 'dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
      { id: 'library', icon: <MdOutlineLibraryBooks />, label: 'My Library' },
      {
        id: 'leaderboard',
        icon: <MdLeaderboard />,
        label: 'Leaderboard',
      },
      { id: 'roadmaps', icon: <InsightsIcon />, label: 'Roadmaps' },
      { id: 'courses', icon: <TipsAndUpdatesIcon />, label: 'Courses' },
      { id: 'practices', icon: <FitnessCenterIcon />, label: 'Practices' },
      {
        id: 'assessments',
        icon: <MdOutlineAssessment />,
        label: 'Assessments',
      },
      { id: 'projects', icon: <AccountTreeIcon />, label: 'Projects' },
      {
        id: 'certifications',
        icon: <WorkspacePremiumIcon />,
        label: 'Certifications',
      },
      { id: 'tutorials', icon: <CastForEducationIcon />, label: 'Tutorials' },
    ];

    if (role === '0') {
      setMenuItems(adminMenu);
    } else if (role === '5') {
      setMenuItems(instructorMenu);
    } else if (role === '6') {
      setMenuItems(learnerMenu);
    } else {
      throw new Error('Invalid role!');
    }
  }, [role, logout]);

  const handleLogout = () => {
    logout();
  };

  return (
    isOpen && (
      <nav>
        <NavList>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              isActive={activeMenu === item.id}
              onClick={
                item.id === 'logout'
                  ? handleLogout
                  : () => onMenuSelect(item.id)
              }
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
