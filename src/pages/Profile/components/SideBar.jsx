import React from "react";
import "./sideBar.css";

function SideBar() {
  return (
    <div className="sideBar">
      <h2>Settings</h2>
      <ul>
        <li>Personal Information</li>
        <li>Subscription</li>
        <li>Purchases</li>
        <li>Linked Accounts</li>
        <li>Notifications</li>
      </ul>
    </div>
  );
}

export default SideBar;
