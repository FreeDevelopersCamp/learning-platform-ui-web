import React, { useState } from "react";
import "./bootcampSection.css";

const BootcampSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const jobCards = [
    { title: "Data Science", icon: "🔍" },
    { title: "Programming & Development", icon: "💻" },
    { title: "Artificial Intelligence", icon: "🤖" },
    { title: "Business", icon: "📈" },
    { title: "Autonomous Systems", icon: "🚗" },
    { title: "Product Management", icon: "📋" },
    { title: "Cloud Computing", icon: "☁️" },
  ];

  return (
    <section className="bootcamp-section">
      <h1 className="bootcamp-title">
        Bootcamp level quality,{" "}
        <span className="highlight">at a free of the cost.</span>
      </h1>
      <div className="job-cards">
        {jobCards.map((job, index) => (
          <div
            key={index}
            className={`job-card ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="job-icon">{job.icon}</div>
            <p className="job-title">{job.title}</p>
          </div>
        ))}
        <p className="section-title">Explore courses by job function</p>
      </div>
    </section>
  );
};

export default BootcampSection;
