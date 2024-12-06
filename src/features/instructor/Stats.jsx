import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useInstructor } from '../../hooks/instructor/useInstructor';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Stat from './Stat';
import Spinner from '../../ui/Spinner';

function Stats({ userId, filter, onFilterCount }) {
  const navigate = useNavigate();
  const [filteredStats, setFilteredStats] = useState([]);
  const [typeCounts, setTypeCounts] = useState({}); // Store counts for each type

  const { instructor, instructorLoading, instructorError } =
    useInstructor(userId);
  const { setInstructorData } = useInstructorData();

  useEffect(() => {
    if (instructor) {
      // Set the instructor data in the context
      setInstructorData(instructor);

      let filteredData;
      const counts = {}; // To calculate individual type counts

      if (filter === 'all') {
        // Combine all IDs from different types
        filteredData = Object.entries(instructor)
          .filter(([key, value]) => Array.isArray(value)) // Only process arrays
          .flatMap(([key, value]) => {
            counts[key] = value.length; // Store count for each type
            return value.map((id) => ({ id, type: key })); // Include type for rendering
          });

        setTypeCounts(counts); // Save individual counts for rendering
      } else {
        // Filter specific data based on filter
        filteredData = (instructor[`${filter}Ids`] || []).map((id) => ({
          id,
          type: filter,
        }));
      }

      setFilteredStats(filteredData); // Update state with filtered stats
      onFilterCount(filteredData.length); // Pass count to parent
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
        // Render 4 distinct cards for each type with its count
        Object.keys(typeCounts).map((type) => (
          <Stat
            key={type}
            title={type.charAt(0).toUpperCase() + type.slice(1)} // Capitalize type
            data={{ count: typeCounts[type] }} // Pass the count for this type
            onClick={() => navigate(`/instructor/${type}`)} // Navigate to type page
          />
        ))
      ) : (
        // Render a single card with the count when filter !== "all"
        <Stat
          key={filter}
          title={`${filter.charAt(0).toUpperCase() + filter.slice(1)}`} // Title for the card
          data={{ count: filteredStats.length }} // Pass count as data
          onClick={() => navigate(`/instructor/${filter}`)} // Navigate to the filter page
        />
      )}
    </>
  );
}

export default Stats;
