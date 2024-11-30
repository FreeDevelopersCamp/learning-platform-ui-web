import React, { useState } from "react";
import Sidebar from "../../ui/Dashboard/Sidebar";
import Header from "../../ui/Dashboard/Header";
import Dashboard from "../../ui/Dashboard/Dashboard";
import styled from "styled-components";

const InstructorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const MainContent = styled.div`
  display: flex;
`;

const InstructorPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <InstructorPageContainer>
      <Header toggleSidebar={toggleSidebar} />
      <MainContent>
        <Sidebar isOpen={isSidebarOpen} />
        <Dashboard />
      </MainContent>
    </InstructorPageContainer>
  );
};

export default InstructorPage;
