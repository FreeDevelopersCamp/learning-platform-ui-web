import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileImg from '../../assets/Images/zzz.jpg';

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;

  span {
    color: #2c3e50;
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
    z-index: 1;
  }

  img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }

  .ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--color-brand-200);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(20);
      opacity: 0;
    }
  }
`;

function Profile() {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 500);
  };

  return (
    <ProfileContainer onClick={handleClick}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{ top: ripple.y, left: ripple.x }}
        ></div>
      ))}
      <span>Yazan Al-Sedih</span>
      <img src={ProfileImg} alt="User Profile" />
    </ProfileContainer>
  );
}

export default Profile;
