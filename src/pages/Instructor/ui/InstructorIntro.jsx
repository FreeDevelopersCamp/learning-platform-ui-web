import React from "react";
import styled from "styled-components";

const IntroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const InstructorImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 20px;
`;

const IntroText = styled.div`
  max-width: 600px;
`;

const InstructorIntro = () => {
  return (
    <IntroSection>
      <InstructorImage
        src="https://example.com/instructor.jpg"
        alt="Instructor"
      />
      <IntroText>
        <h2>Meet John Doe</h2>
        <p>
          John is an experienced instructor with a passion for teaching and
          helping others learn. He has taught over 10,000 students and is
          excited to help you on your teaching journey.
        </p>
      </IntroText>
    </IntroSection>
  );
};

export default InstructorIntro;
