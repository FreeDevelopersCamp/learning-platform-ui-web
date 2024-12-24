import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import styled from 'styled-components';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import UserAvatar from '../User/UserAvatar';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  border-radius: 3rem;
  font-size: 1rem;
  font-weight: 500;
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow:
    0px 4px 8px rgba(0, 0, 0, 0.2),
    0px 2px 4px rgba(0, 0, 0, 0.06); /* Updated shadow */
  border-radius: var(--border-radius-lg); /* Smooth corners */
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  min-width: 250px; /* Increased width */
  z-index: 1000;
  padding: 0.5rem 0;
  overflow: hidden;

  & li {
    font-size: 2rem;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  margin-left: 8px;
  margin-right: 8px;
  outline: 0px;
  padding: 8px 12px;
  position: relative;

  transition: background-color 125ms ease-out;
  width: calc(100% - 16px);
  background: transparent;
  min-height: 36px;

  font-size: 1.5rem;
  font-weight: 500; /* Slightly bolder text */
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: var(--color-grey-600);

  border-radius: 5px;
  /* transition: all 0.2s; */

  display: flex;
  align-items: center;
  gap: 1.4rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1rem;

  &:hover {
    background-color: var(--color-grey-100); /* Lighter background */
    color: var(--color-grey-700); /* Darker text color */
  }

  & svg {
    width: 1.8rem;
    height: 2rem;
    color: var(--color-grey-600); /* Softer icon color */
    transition: color 0.3s;
  }

  &:hover svg {
    color: var(--color-grey-700); /* Change icon color on hover */
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, user }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x - 34,
      y: rect.y + rect.height,
    });

    openId === id ? close() : open(id);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <UserAvatar user={user} />
      {openId === id ? (
        <HiChevronUp style={{ marginLeft: '8px', fontSize: '0.5rem' }} />
      ) : (
        <HiChevronDown style={{ marginLeft: '8px', fontSize: '0.5rem' }} />
      )}
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
