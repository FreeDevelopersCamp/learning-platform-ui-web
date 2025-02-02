import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import PythonLogo from '../../../assets/Icons/python.svg';
import GitLogo from '../../../assets/Icons/git.svg';
import ReactLogo from '../../../assets/Icons/react.svg';
import NodejsLogo from '../../../assets/Icons/node-js.svg';
import programmingTeamImage from '../../../assets/Images/programming-team.jpg';
import JavascriptIcon from '../../../assets/Icons/javascript.svg';

// Styled Components
const IntroductionSectionWrapper = styled.section`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const IntroductionContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  padding: 2rem;
  gap: 5rem;
  border: none;
`;

const IntroductionImageWrapper = styled.div`
  position: relative;
  width: 550px;
  height: 550px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  border: none;
`;

const IntroductionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
`;

const IconBackground = styled.div`
  position: absolute;
  bottom: 50px;
  right: -5%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background-color: var(--color-grey-0);
  border-radius: 50%;
  padding: 20px;
`;

const IconOverlay = styled.div`
  width: 80px;
  height: 80px;
  transition: opacity 0.5s ease-in-out;
`;

const IconImage = styled.img`
  margin: 5px 0 0 15px;
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const IntroductionText = styled.div`
  width: 50%;
  text-align: left;
`;

const IntroductionTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-grey-900);
  line-height: 1.2;
`;

const Highlight = styled.span`
  color: var(--color-darkmidnightblue-600);
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-top: 1.5rem;
`;

const StartLearningLink = styled.a`
  color: var(--color-grey-0);
  background-color: var(--color-mutedblue-800);
  padding: 15px;
  border-radius: 5px;

  font-size: 1.6rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: var(--color-grey-300);
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const IntroductionSection = () => {
  const navigate = useNavigate();
  const logos = [PythonLogo, JavascriptIcon, GitLogo, ReactLogo, NodejsLogo];
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
        setFade(true); // Fade back in
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <IntroductionSectionWrapper id="courses">
      <IntroductionContent>
        <IntroductionImageWrapper>
          <IntroductionImage
            src={programmingTeamImage}
            alt="Programming Team"
          />
          <IconBackground>
            <IconOverlay
              className={`w-20 h-20 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
              <IconImage src={logos[currentLogoIndex]} alt="Rotating Logo" />
            </IconOverlay>
          </IconBackground>
        </IntroductionImageWrapper>
        <IntroductionText>
          <IntroductionTitle>
            Learn to <Highlight>&lt;/code&gt;</Highlight> and Start your Career
            in Tech
          </IntroductionTitle>
          <Buttons>
            <StartLearningLink onClick={() => navigate('/login')}>
              Start learning for free{' '}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '8px' }}
              />
            </StartLearningLink>
          </Buttons>
        </IntroductionText>
      </IntroductionContent>
    </IntroductionSectionWrapper>
  );
};

export default IntroductionSection;
