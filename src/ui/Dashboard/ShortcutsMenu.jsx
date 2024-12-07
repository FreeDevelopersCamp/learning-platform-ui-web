import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Divider } from '@mui/material';

import { useOutsideClick } from '../../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  font-size: 2.4rem;
  color: var(--color-grey-900);
  font-weight: 700;
  /* padding: 7px; */
  transition: color 0.5s;
  cursor: pointer;

  &:hover {
    color: var(--color-grey-600);
    background-color: var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.div`
  position: fixed;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.06); /* Updated shadow */
  border-radius: var(--border-radius-lg);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  min-width: 380px; /* Increased width */
  min-height: 300px; /* Increased width */
  z-index: 1000;

  overflow: hidden;

  list-style: none;

  & li {
    font-size: 2rem;
    /* width: 100%;
    height: 100%; */
  }

  & h2 {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 2.2rem;
    padding: 1rem 1.5rem;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  width: 100%;
  height: 100%;
  padding: 4.5rem;

  border: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  font-size: 1.6rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: var(--color-grey-800);

  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    font-size: 3rem;
    color: var(--color-grey-600);
    margin-bottom: 1.5rem;
  }
`;

const MenusContext = createContext();

function ShortcutsMenus({ children }) {
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

function Toggle({ id, icon }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x - 34,
      y: rect.y + rect.height + 8,
    });

    openId === id ? close() : open(id);
  }

  return <StyledToggle onClick={handleClick}>{icon}</StyledToggle>;
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      <h2>Shortcuts</h2>
      <Divider />
      <StyledGrid>{children}</StyledGrid>
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

ShortcutsMenus.Menu = Menu;
ShortcutsMenus.Toggle = Toggle;
ShortcutsMenus.List = List;
ShortcutsMenus.Button = Button;

export default ShortcutsMenus;
