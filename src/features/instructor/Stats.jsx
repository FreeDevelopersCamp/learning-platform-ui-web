import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useInstructor } from '../../hooks/instructor/useInstructor';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Stat from './Stat';
import Spinner from '../../ui/Spinner';

function Stats({ userId }) {
  const navigate = useNavigate();

  const { instructor, instructorLoading, instructorError } =
    useInstructor(userId);

  const { instructorData, setInstructorData } = useInstructorData();
  console.log('instructorData', instructorData);

  useEffect(() => {
    const fetchData = async () => {
      if (instructor) {
        setInstructorData(instructor);
      }
    };

    fetchData();
  }, [instructor, instructorLoading, setInstructorData]);

  if (instructorLoading || !instructor) {
    return <Spinner />;
  }

  if (instructorError) {
    console.warn('Using fallback data due to error:', instructorError);
    return <p>Error loading instructor data.</p>;
  }

  const {
    coursesIds = [],
    practicesIds = [],
    projectsIds = [],
    roadmapsIds = [],
  } = instructor || {};

  return (
    <>
      <Stat
        title="Roadmaps"
        data={roadmapsIds}
        onClick={() => navigate('/instructor/roadmaps')}
      />
      <Stat
        title="Projects"
        data={coursesIds}
        onClick={() => navigate('/instructor/projects')}
      />
      <Stat
        title="Courses"
        data={projectsIds}
        onClick={() => navigate('/instructor/courses')}
      />
      <Stat
        title="Practices"
        data={practicesIds}
        onClick={() => navigate('/instructor/practices')}
      />
    </>
  );
}

export default Stats;
