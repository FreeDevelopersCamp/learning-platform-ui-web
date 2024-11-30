import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TitleStyle = styled.h1`
  font-weight: 600;
  font-size: 34px;
`;

const Title = () => {
  return (
    <TitleStyle className="header-title">
      <Link to="/">Free Developers Camp</Link>
    </TitleStyle>
  );
};

export default Title;
