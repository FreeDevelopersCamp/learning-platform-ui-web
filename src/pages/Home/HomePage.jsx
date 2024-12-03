import React from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';

import BootcampSection from './ui/BootcampSection';
import IntroductionSection from './ui/IntroductionSection';
import EducationStats from './ui/EducationStats';
import InstructorSection from './ui/InstructorSection';

import Spinner from '../../ui/Spinner';

const HomePage = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <Spinner>Loading session...</Spinner>;

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
