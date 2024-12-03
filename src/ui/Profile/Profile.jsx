import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth/AuthContext';

import { CgProfile } from 'react-icons/cg';
import { ImProfile } from 'react-icons/im';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { LuLogOut } from 'react-icons/lu';

import userImage from '../../assets/Images/zzz.jpg';

const ProfileContainer = styled.div`
  height: 65px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2.5rem;
  padding: 15px;
  overflow: hidden;
  cursor: pointer;

  span {
    color: #2c3e50;
    font-size: 13px;
    font-weight: 500;
    z-index: 1;
    margin-left: 10px;
    user-select: none;
  }

  .ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--color-brand-200);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.7s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(20);
      opacity: 0;
    }
  }
`;

const ProfileAvatar = styled.img`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 50%;
  border: 2px solid var(--color-blue-600);
  padding: 1px;
`;

const DropdownMenu = styled.div`
  max-width: 240px;
  position: absolute;
  top: ${(props) => `${props.size === '45' ? '8.5%' : '8.5%'}`};
  right: ${(props) => `${props.size === '45' ? '1.3%' : '1.5%'}`};
  padding: 10px;
  background-color: var(--color-grey-100);
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  opacity: 0;
  overflow: hidden;
  z-index: 10;
  transition: max-height 0.3s ease, opacity 0.3s ease;

  &.open {
    max-height: 500px;
    opacity: 1;
    overflow: visible;
    pointer-events: auto; /* Enable when open */
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  padding-top: 5px;
`;

const Profile = ({ userName, name, size }) => {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth();

  const handleAccount = () => {
    navigate(`/instructor/account`);
  };
  const handleProfile = () => {
    navigate(`/profile`);
  };
  const handleSetting = () => {
    navigate(`/settings`);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setIsDropdownOpen((prevState) => !prevState);

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 500);
  };

  return (
    <>
      <ProfileContainer onClick={handleClick}>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple"
            style={{ top: ripple.y, left: ripple.x }}
          ></div>
        ))}
        <ProfileAvatar src={userImage} alt="User Profile" size={size} />
        <div className="flex flex-col items-start justify-center">
          <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{name}</span>
          <span style={{ paddingLeft: '3px' }}>{userName}</span>
        </div>
      </ProfileContainer>
      <DropdownMenu className={isDropdownOpen ? 'open' : ''} size={size}>
        <DropdownButton onClick={handleAccount}>
          <DropdownContent>
            <CgProfile style={{ fontSize: '2rem' }} alt="Account Icon" />
            <Text>My Account</Text>
          </DropdownContent>
        </DropdownButton>
        <DropdownButton onClick={handleProfile}>
          <DropdownContent>
            <ImProfile style={{ fontSize: '2rem' }} alt="Profile Icon" />
            <Text>Profile</Text>
          </DropdownContent>
        </DropdownButton>
        <DropdownButton onClick={handleSetting}>
          <DropdownContent>
            <HiOutlineCog6Tooth
              style={{ fontSize: '2rem' }}
              alt="Settings Icon"
            />
            <Text>Settings</Text>
          </DropdownContent>
        </DropdownButton>
        <DropdownButton style={{ fontSize: '2rem' }} onClick={handleLogout}>
          <DropdownContent>
            <LuLogOut alt="Logout Icon" />
            <Text>Logout</Text>
          </DropdownContent>
        </DropdownButton>
      </DropdownMenu>
    </>
  );
};

export default Profile;
