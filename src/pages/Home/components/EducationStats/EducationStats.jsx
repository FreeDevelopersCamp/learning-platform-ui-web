import React from "react";
import "./educationStats.css";
import CapIcon from "../../../../assets/icons/cap.svg";
import BookIcon from "../../../../assets/icons/book.svg";
import BuildIcon from "../../../../assets/icons/build.svg";

const EducationStats = () => {
  return (
    <div className="education-stats">
      <h2>
        More than a platform. <strong>Free Developers Camp</strong> is a
        commitment to bringing tech and open source collaboration to students
        and educators across the globe.
      </h2>
      <div className="stats-cards">
        <div className="card">
          <div className="icon">
            <img src={CapIcon} alt="Cap Icon" width="32" height="32" />
          </div>
          <h3>5 million students</h3>
          <p>
            Connect with millions of peers who've expanded their skills through
            GitHub Education.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <img src={BookIcon} alt="Book Icon" width="32" height="32" />
          </div>
          <h3>200K verified educators</h3>
          <p>
            Collaborate with educators around the world who enhance their lesson
            plans and workstreams with GitHub tools.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <img src={BuildIcon} alt="Build Icon" width="32" height="32" />
          </div>
          <h3>+2K educational institutions</h3>
          <p>
            Join thousands of schools globally that incorporate GitHub into
            their tech curriculum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationStats;
