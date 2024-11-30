import React from "react";
import styled from "styled-components";

const HeroSection = () => {
  return (
    <HeroContainer>
      <div className="content">
        <h1>Last day to save!</h1>
        <p>Courses designed to help you reach your goals.</p>
        <button>Browse Courses</button>
      </div>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background-color: #f7f9fa;
  padding: 50px;
  text-align: center;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 24px;
    margin-bottom: 30px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default HeroSection;
