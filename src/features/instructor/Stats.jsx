import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useInstructor } from '../../hooks/instructor/useInstructor';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Stat from './Stat';
import Spinner from '../../ui/Spinner';

function Stats({ userId, filter, onFilterCount }) {
  const navigate = useNavigate();
  const [filteredStats, setFilteredStats] = useState([]);
  const [typeCounts, setTypeCounts] = useState({
    roadmaps: 0,
    courses: 0,
    projects: 0,
    practices: 0,
  });

  const { instructor, instructorLoading, instructorError } =
    useInstructor(userId);
  const { setInstructorData } = useInstructorData();

  useEffect(() => {
    if (instructor) {
      setInstructorData(instructor);

      const counts = {};
      let filteredData = [];

      if (filter === 'all') {
        // Process all types
        filteredData = Object.entries(instructor)
          .filter(([key, value]) => key.endsWith('Ids') && Array.isArray(value))
          .flatMap(([key, value]) => {
            const cleanKey = key.replace(/Ids$/, '');
            counts[cleanKey] = value.length || 0;
            return value.map((id) => ({ id, type: cleanKey }));
          });

        // Ensure ordered counts and fallback to 0 for missing types
        setTypeCounts({
          roadmaps: counts.roadmaps || 0,
          courses: counts.courses || 0,
          projects: counts.projects || 0,
          practices: counts.practices || 0,
        });
      } else {
        // Process specific filter
        const keyName = `${filter.toLowerCase()}Ids`; // E.g., 'roadmaps' becomes 'roadmapIds'
        filteredData = (instructor[keyName] || []).map((id) => ({
          id,
          type: filter,
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
