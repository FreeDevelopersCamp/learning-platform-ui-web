import React from "react";
import "./instructorSection.css";

const InstructorSection = () => {
  return (
    <section className="instructor-section">
      <div className="image-container">
        <img
          src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
          alt="Instructor"
          className="instructor-image"
        />
      </div>
      <div className="content">
        <h2 className="title">Become an instructor</h2>
        <p className="description">
          Instructors from around the world teach millions of learners on Udemy.
          We provide the tools and skills to teach what you love.
        </p>
        <button className="cta-button">Start teaching today</button>
      </div>
    </section>
  );
};

export default InstructorSection;
