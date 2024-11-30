import React, { useState, useEffect } from "react";
import "./introductionSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PythonLogo from "../../../../assets/icons/python.svg";
import GitLogo from "../../../../assets/icons/git.svg";
import ReactLogo from "../../../../assets/icons/react.svg";
import NodejsLogo from "../../../../assets/icons/node-js.svg";
import programmingTeamImage from "../../../../assets/images/programming-team.jpg";
import JavascriptIcon from "../../../../assets/icons/javascript.svg";

const IntroductionSection = () => {
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
    <section className="introduction-section">
      <div className="introduction-content">
        <div className="introduction-image-wrapper">
          {/* Display the programming team image */}
          <img
            src={programmingTeamImage}
            alt="Programming Team"
            className="introduction-image"
          />
          <div className="icon-background">
            {/* Display the rotating SVG logos */}
            <div className={`icon-overlay ${fade ? "fade-in" : "fade-out"}`}>
              <img src={logos[currentLogoIndex]} alt="Rotating Logo" />
            </div>
          </div>
        </div>
        <div className="introduction-text">
          <h1>
            Learn to <span className="highlight">&lt;/code&gt;</span> and Start
            your Career in Tech
          </h1>
          <div className="buttons">
            <button className="browse-courses">Browse Courses</button>
            <a href="#start-learning" className="start-learning">
              Start learning for free{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: "8px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
