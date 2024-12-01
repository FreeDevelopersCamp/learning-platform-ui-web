import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaTachometerAlt,
  FaProductHunt,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

import DashboardIcon from "../../assets/Icons/dashboard.svg";
import MessagesIcon from "../../assets/Icons/messages.svg";
import NotificationsIcon from "../../assets/Icons/notifications.svg";
import SettingsIcon from "../../assets/Icons/settings.svg";

// Styled components
const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? "20%" : "0px")};
  overflow: hidden;
  background-color: var(--color-grey-100);

  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isOpen ? "20px" : "0px")};
  transition: all 0.3s ease;

  ul {
    list-style: none;
    padding: 0;
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: opacity 0.3s ease;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 15px 15px 15px 10px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  color: var(--color-grey-500);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
    transform: translateX(5px);
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    gap: 1rem;

    &:hover {
      color: inherit; /* Ensure link inherits the hover color */
    }
  }

  img {
    width: 25px;
    height: 25px;
  }
`;

// Sidebar component
const Sidebar = ({ isOpen }) => {
  const sidebarItems = [
    { link: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
    { link: "/messages", icon: MessagesIcon, label: "Messages" },
    { link: "/notifications", icon: NotificationsIcon, label: "Notifications" },
    { link: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <ul>
        {sidebarItems.map((item, index) => (
          <ListItem key={index}>
            <Link to={item.link}>
              <img src={item.icon} alt={`${item.label} Icon`} />
              <span>{item.label}</span>
            </Link>
          </ListItem>
        ))}
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
