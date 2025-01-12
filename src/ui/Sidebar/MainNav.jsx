import { useState, useEffect } from 'react';
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
  background-color: 'transparent';
  border-radius: ${(props) =>
    props.isActive ? 'var(--border-radius-sm)' : '0'};

  font-size: 16px;
  font-weight: 400;
  min-height: 36px;
  padding: 10px 10px 12px;

  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #d1d5db;
  }

  & svg {
    width: 24px;
    height: 24px;
    color: ${(props) =>
      props.isActive ? 'var(--color-brand-600)' : 'var(--color-grey-400)'};
    transition: all 0.3s;
  }

  &:hover svg {
    color: #d1d5db;
  }
`;

function MainNav({ isOpen, activeMenu, role, onMenuSelect }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const adminMenu = [
      { id: 'dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
      { id: 'users', icon: <HiOutlineUsers />, label: 'Users' },
      { id: 'permissions', icon: <BsShieldLock />, label: 'Permissions' },
    ];

    const instructorMenu = [
      { id: 'dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
      { id: 'roadmaps', icon: <HiPresentationChartLine />, label: 'Roadmaps' },
      { id: 'courses', icon: <FaTasks />, label: 'Courses' },
      { id: 'projects', icon: <GoProjectRoadmap />, label: 'Projects' },
      { id: 'practices', icon: <BiTask />, label: 'Practices' },
      { id: 'learner', icon: <HiOutlineUsers />, label: 'Learner' },
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

    if (
      role === '0' ||
      role === '1' ||
      role === '2' ||
      role === '3' ||
      role === '4'
    ) {
      setMenuItems(adminMenu);
    } else if (role === '5') {
      setMenuItems(instructorMenu);
    } else if (role === '6') {
      setMenuItems(learnerMenu);
    } else {
      throw new Error('Invalid role!');
    }
  }, [role]);

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
              <span style={{ transform: 'translateY(2.5px)' }}>
                {item.label}
              </span>
            </MenuItem>
          ))}
        </NavList>
      </nav>
    )
  );
}

export default MainNav;
