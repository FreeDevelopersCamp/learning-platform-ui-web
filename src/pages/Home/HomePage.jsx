import BootcampSection from './components/BootcampSection';
import IntroductionSection from './components/IntroductionSection';
import EducationStats from './components/EducationStats';
import InstructorSection from './components/InstructorSection';
import StatsSection from './components/StatsSection';
import TopicsChart from './components/TopicsChart';

const HomePage = () => {
  return (
    <>
      <BootcampSection />
      <IntroductionSection />
      <EducationStats />
      <StatsSection />
      <TopicsChart />
      <InstructorSection />
    </>
  );
};

export default HomePage;
