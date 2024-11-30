import React from "react";
import styled from "styled-components";
import fb from "../../assets/Images/facebook.png";
import twitter from "../../assets/Images/twitter.png";
import LinkedIn from "../../assets/Images/linkedin.png";
import inst from "../../assets/Images/instagram.png";

// Styled Components
const FooterContainer = styled.div`
  background-color: var(--color-grey-800);
  padding: 2rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;
`;

const FooterLinksDiv = styled.div`
  width: 150px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  color: white;
`;

const FooterTitle = styled.h4`
  font-size: 16px;
  line-height: 17px;
  margin-bottom: 0.9rem;
`;

const FooterLink = styled.a`
  color: var(--color-grey-400);
  text-decoration: none;

  p {
    font-size: 14px;
    line-height: 15px;
    margin: 0.5rem 0;
    cursor: pointer;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 80%;
  }
`;

const FooterCopyright = styled.div`
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-top: 20px;
  }
`;
const FooterHr = styled.hr`
  color: white !important;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLinksDiv>
          <FooterTitle>For Business</FooterTitle>
          <FooterLink href="/employer">
            <p>Employer</p>
          </FooterLink>
          <FooterLink href="/healthplan">
            <p>Health Plan</p>
          </FooterLink>
          <FooterLink href="/individual">
            <p>Individual</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="/employer">
            <p>Resources Center</p>
          </FooterLink>
          <FooterLink href="/healthplan">
            <p>Testimonials</p>
          </FooterLink>
          <FooterLink href="/individual">
            <p>STV</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>Partners</FooterTitle>
          <FooterLink href="/employer">
            <p>Minute Magic</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="/about">
            <p>About</p>
          </FooterLink>
          <FooterLink href="/press">
            <p>Press</p>
          </FooterLink>
          <FooterLink href="/career">
            <p>Career</p>
          </FooterLink>
          <FooterLink href="/contact">
            <p>Contact</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>Coming soon on</FooterTitle>
          <SocialMedia>
            <p>
              <img src={fb} alt="Facebook" />
            </p>
            <p>
              <img src={twitter} alt="Twitter" />
            </p>
            <p>
              <img src={LinkedIn} alt="LinkedIn" />
            </p>
            <p>
              <img src={inst} alt="Instagram" />
            </p>
          </SocialMedia>
        </FooterLinksDiv>
      </FooterLinks>

      <FooterHr />

      <FooterCopyright>
        <p>@{new Date().getFullYear()} FreeDevloperCamp, Inc.</p>
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
