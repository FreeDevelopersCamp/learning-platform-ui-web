import React from 'react';
import styled from 'styled-components';
import fb from '../../assets/Images/facebook.png';
import twitter from '../../assets/Images/twitter.png';
import LinkedIn from '../../assets/Images/linkedin.png';
import inst from '../../assets/Images/instagram.png';

// Styled Components
const FooterContainer = styled.footer`
  background-color: #18212f;
  padding: 2rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.25); /* Adjust values as needed */
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
          <FooterTitle>For Sponsorships</FooterTitle>
          <FooterLink href="http://localhost:3000/chat">
            <p>Jonas Schmitedman</p>
          </FooterLink>
          <FooterLink href="http://localhost:3000/chat">
            <p>Bara Al-Sedih</p>
          </FooterLink>
          <FooterLink href="http://localhost:3000/chat">
            <p>Yazan Al-Sedih</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="https://roadmap.sh/">
            <p>Roadmap.sh</p>
          </FooterLink>
          <FooterLink href="https://www.youtube.com/">
            <p>YouTube</p>
          </FooterLink>
          <FooterLink href="https://app.datacamp.com/">
            <p>DataCamp</p>
          </FooterLink>
          <FooterLink href="https://www.udacity.com/dashboard">
            <p>Udacity</p>
          </FooterLink>
          <FooterLink href="https://www.udemy.com/?utm_source=bing-brand&utm_medium=udemyads&utm_campaign=BG-Brand-Udemy_la.EN_cc.BE&campaigntype=Search&portfolio=BrandDirect&language=EN&product=Course&test=&audience=&topic=&priority=&utm_content=deal4584&utm_term=_._ag_1211662226721572_._ad__._kw_udemy%2B_._de_c_._dm__._pl__._ti_kwd-75729201413312:aud-808168727:loc-220_._li_220_._pd__._&matchtype=e&msclkid=209247a6a2e4137a964a20386990da37">
            <p>Udemy</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>For technical issues</FooterTitle>
          <FooterLink href="http://localhost:3000/chat">
            <p>Account Manager</p>
          </FooterLink>
          <FooterLink href="http://localhost:3000/chat">
            <p>Bara Al-Sedih</p>
          </FooterLink>
          <FooterLink href="http://localhost:3000/chat">
            <p>Yazan Al-Sedih</p>
          </FooterLink>
        </FooterLinksDiv>
        <FooterLinksDiv>
          <FooterTitle>For content issues</FooterTitle>
          <FooterLink href="http://localhost:3000/chat">
            <p>Content Manager</p>
          </FooterLink>
          <FooterLink href="http://localhost:3000/chat">
            <p>Bara Al-Sedih</p>
          </FooterLink>
          <FooterLink href="http://localhost:3000/chat">
            <p>Yazan Al-Sedih</p>
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
        <p>@{new Date().getFullYear()} FreeDevelopersCamp, Inc.</p>
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
