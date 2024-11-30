import React from "react";
import styled from "styled-components";

const ResourcesSection = styled.section`
  background-color: #f4f4f4;
  padding: 40px;
  text-align: center;
`;

const ResourceCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InstructorResources = () => {
  return (
    <ResourcesSection>
      <h2>How to Get Started as an Instructor</h2>
      <div>
        <ResourceCard>
          <h3>Step 1: Create Your Account</h3>
          <p>Sign up to start creating courses and teaching your skills.</p>
        </ResourceCard>
        <ResourceCard>
          <h3>Step 2: Build Your First Course</h3>
          <p>Use our simple tools to create engaging courses.</p>
        </ResourceCard>
        <ResourceCard>
          <h3>Step 3: Publish and Earn</h3>
          <p>Publish your courses and start earning from your teaching.</p>
        </ResourceCard>
      </div>
    </ResourcesSection>
  );
};

export default InstructorResources;
