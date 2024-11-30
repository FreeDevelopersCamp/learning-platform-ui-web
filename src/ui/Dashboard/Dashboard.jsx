import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  flex: 1;
  background-color: var(--color-grey-300);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;

  .card {
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Dashboard = () => (
  <DashboardContainer>
    <div className="card">Empty Dashboard</div>
  </DashboardContainer>
);
export default Dashboard;
