import React from "react";
import styled from "styled-components";

const TestimonialsSection = styled.section`
  padding: 40px;
  text-align: center;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InstructorTestimonials = () => {
  return (
    <TestimonialsSection>
      <h2>What Our Instructors Say</h2>
      <div>
        <TestimonialCard>
          <p>"Teaching on this platform has been an amazing experience!"</p>
          <strong>- Jane Smith</strong>
        </TestimonialCard>
        <TestimonialCard>
          <p>
            "I love the freedom to create content and share it with the world."
          </p>
          <strong>- Mark Johnson</strong>
        </TestimonialCard>
      </div>
    </TestimonialsSection>
  );
};

export default InstructorTestimonials;
