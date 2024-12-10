import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useInstructor } from '../../hooks/instructor/useInstructor';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Stat from './Stat';
import Spinner from '../../ui/Spinner';

function Stats({ userId, filter, onFilterCount }) {
  const navigate = useNavigate();
  const [filteredStats, setFilteredStats] = useState([]);
  const [typeCounts, setTypeCounts] = useState({});

  const { instructor, instructorLoading, instructorError } =
    useInstructor(userId);
  const { setInstructorData } = useInstructorData();

  useEffect(() => {
    if (instructor) {
      setInstructorData(instructor);

      let filteredData;
      const counts = {};

      if (filter === 'all') {
        filteredData = Object.entries(instructor)
          .filter(([key, value]) => Array.isArray(value))
          .flatMap(([key, value]) => {
            const cleanKey = key.replace(/Ids$/, '');
            counts[cleanKey] = value.length;
            return value.map((id) => ({ id, type: cleanKey }));
          });

        const orderedCounts = {
          roadmaps: counts.roadmaps || 0,
          courses: counts.courses || 0,
          projects: counts.projects || 0,
          practices: counts.practices || 0,
        };
        setTypeCounts(orderedCounts);
      } else {
        const cleanFilter = filter.replace(/Ids$/, '');
        filteredData = (instructor[`${filter}Ids`] || []).map((id) => ({
          id,
          type: cleanFilter,
        }));
      }

      setFilteredStats(filteredData);
      onFilterCount(filteredData.length);
    }
  }, [instructor, filter, onFilterCount, setInstructorData]);

  if (instructorLoading || !instructor) return <Spinner />;
  if (instructorError) {
    console.warn('Error or missing data:', instructorError);
    return <p>Error loading instructor data.</p>;
  }

  return (
    <>
      {filter === 'all' ? (
        Object.keys(typeCounts).map((type) => (
          <Stat
            key={type}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            data={{ count: typeCounts[type] }}
            onClick={() => navigate(`/instructor/${type}`)}
          />
        ))
      ) : (
        <Stat
          key={filter}
          title={`${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
          data={{ count: filteredStats.length }}
          onClick={() => navigate(`/instructor/${filter}`)}
        />
      )}
    </>
  );
}

export default Stats;
