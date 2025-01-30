import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import {
  HiEnvelope,
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineUsers,
  HiPresentationChartLine,
} from 'react-icons/hi2';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BsShieldLock } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';
import { GoProjectRoadmap } from 'react-icons/go';
import { BiTask } from 'react-icons/bi';
import {
  MdLeaderboard,
  MdOutlineLibraryBooks,
  MdOutlineAssessment,
} from 'react-icons/md';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InsightsIcon from '@mui/icons-material/Insights';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem;
  position: fixed;
  width: 12.5%;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: ${(props) => (props.isActive ? 'white' : '#9ca3af')};
  background-color: ${(props) =>
    props.isActive ? 'var(--color-brand-900)' : 'transparent'};
  border-radius: ${(props) =>
    props.isActive ? 'var(--border-radius-sm)' : '0'};

  font-size: 16px;
  font-weight: 400;
  min-height: 36px;
  padding: 10px 10px 12px;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #d1d5db;
  }

  & svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.isActive ? 'white' : 'var(--color-grey-400)')};
    transition: all 0.3s;
  }

  &:hover svg {
    color: #d1d5db;
  }
`;

function MainNav({ isOpen, role, onMenuSelect }) {
  const location = useLocation(); // Get current path
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const adminMenu = [
      {
        id: 'dashboard',
        path: '/admin/dashboard',
        icon: <HiOutlineHome />,
        label: 'Dashboard',
      },
      {
        id: 'users',
        path: '/admin/users',
        icon: <HiOutlineUsers />,
        label: 'Users',
      },
      {
        id: 'permissions',
        path: '/admin/permissions',
        icon: <BsShieldLock />,
        label: 'Permissions',
      },
    ];

    const instructorMenu = [
      { id: 'dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
      { id: 'roadmaps', icon: <HiPresentationChartLine />, label: 'Roadmaps' },
      { id: 'courses', icon: <FaTasks />, label: 'Courses' },
      { id: 'projects', icon: <GoProjectRoadmap />, label: 'Projects' },
      { id: 'practices', icon: <BiTask />, label: 'Practices' },
      { id: 'learner', icon: <HiOutlineUsers />, label: 'Learner' },
      { id: 'courses_table', icon: <FaTasks />, label: 'Courses Table' },
      {
        id: 'projects_table',
        icon: <GoProjectRoadmap />,
        label: 'Projects Table',
      },
      { id: 'practices_table', icon: <BiTask />, label: 'Practices Table' },
      {
        id: 'roadmaps_table',
        icon: <HiPresentationChartLine />,
        label: 'Roadmaps Table',
      },
    ];

    const learnerMenu = [
      {
        id: 'dashboard',
        path: '/learner/dashboard',
        icon: <HiOutlineHome />,
        label: 'Dashboard',
      },
      {
        id: 'library',
        path: '/learner/library',
        icon: <MdOutlineLibraryBooks />,
        label: 'My Library',
      },
      {
        id: 'leaderboard',
        path: '/learner/leaderboard',
        icon: <MdLeaderboard />,
        label: 'Leaderboard',
      },
      {
        id: 'roadmaps',
        path: '/learner/roadmaps',
        icon: <InsightsIcon />,
        label: 'Roadmaps',
      },
      {
        id: 'courses',
        path: '/learner/courses',
        icon: <TipsAndUpdatesIcon />,
        label: 'Courses',
      },
      {
        id: 'projects',
        path: '/learner/projects',
        icon: <AccountTreeIcon />,
        label: 'Projects',
      },
      {
        id: 'certifications',
        path: '/learner/certifications',
        icon: <WorkspacePremiumIcon />,
        label: 'Certifications',
      },
      {
        id: 'tutorials',
        path: '/learner/tutorials',
        icon: <CastForEducationIcon />,
        label: 'Tutorials',
      },
    ];

    if (['0', '1', '2', '3', '4'].includes(role)) {
      setMenuItems(adminMenu);
    } else if (role === '5') {
      setMenuItems(instructorMenu);
    } else if (role === '6') {
      setMenuItems(learnerMenu);
    } else {
      throw new Error('Invalid role!');
    }
  }, [role]);

  const isActive = (item) => {
    // Check if the current path matches the main path or sub-paths
    const isExactMatch = location.pathname === item.path;
    const isSubMatch = location.pathname.startsWith(item.path);

    return isExactMatch || (item.id === 'roadmaps' && isSubMatch);
  };

  return (
    isOpen && (
      <nav>
        <NavList>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              isActive={isActive(item)}
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
