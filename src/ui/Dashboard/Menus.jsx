import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import styled from 'styled-components';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import UserAvatar from '../../features/authentication/UserAvatar';

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
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.06); /* Updated shadow */
  border-radius: var(--border-radius-lg); /* Smooth corners */
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  min-width: 250px; /* Increased width */
  z-index: 1000;
  padding: 0.5rem 0;
  overflow: hidden;

  & li {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & li:last-child {
    border-bottom: none;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 14px;
  font-weight: 500; /* Slightly bolder text */
  color: var(--color-grey-800);
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.25;

  &:hover {
    background-color: var(--color-grey-50); /* Lighter background */
    color: var(--color-brand-600); /* Brand color for hover */
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-700); /* Softer icon color */
    transition: color 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600); /* Change icon color on hover */
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
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
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
