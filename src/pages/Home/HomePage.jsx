import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BootcampSection from "./ui/BootcampSection";
import IntroductionSection from "./ui/IntroductionSection";
import EducationStats from "./ui/EducationStats";
import InstructorSection from "./ui/InstructorSection";

const HomePage = () => {
  // const [isLoginParams] = useSearchParams();
  // const [isLogin, setIsLogin] = useState(null);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const loginStatus = isLoginParams.get("isLogin");
  //   setIsLogin(loginStatus);
  // }, []);

  // useEffect(() => {
  //   const userParam = isLoginParams.get("user");

  //   try {
  //     setUser(userParam ? JSON.parse(decodeURIComponent(userParam)) : null);
  //   } catch (error) {
  //     console.error("Failed to parse user data:", error);
  //     setUser(null);
  //   }
  // }, [isLoginParams]);

  return (
    <>
      <BootcampSection />
      <IntroductionSection />
      <EducationStats />
      <InstructorSection />
    </>
  );
};

export default HomePage;
