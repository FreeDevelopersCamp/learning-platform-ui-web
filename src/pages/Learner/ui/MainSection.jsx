import styled from 'styled-components';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

import Progress from './Progress';
import Review from './Review';

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9fafb;
  border-radius: 10px; /* Tailwind's rounded-lg */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TrackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;

  a {
    /* Tailwind's text-blue-500 */
    font-weight: 600;
    text-decoration: none; /* Remove underline by default */
    cursor: pointer;

    &:hover {
      text-decoration: underline; /* Add underline on hover */
    }
  }

  button {
    background-color: #03ef62; /* Tailwind's bg-green-500 */
    color: black; /* Tailwind's text-white */
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0bcc11; /* Tailwind's bg-green-600 */
    }
  }
`;

const CourseName = styled.h2`
  font-weight: 600;
  font-size: 2.4rem;
  text-decoration: none; /* Remove underline by default */
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
`;

function MainSection() {
  return (
    <StyledMainSection>
      <TrackInfo>
        <div className="flex flex-col">
          <div>
            You’re enrolled in the{' '}
            <a href="#">Associate Data Scientist In Python</a> roadmap.
          </div>
          <CourseName href="#">
            Working with Dates and Times in Python
          </CourseName>
          <ProgressSection>
            <Progress
              progress={50}
              bgColor="#E0E1E9"
              fillColor="#03EF62"
              labelColor="#000"
              width="50%"
            />
            <div className="flex flex-row items-center gap-2">
              <QueryBuilderIcon />
              {`2 hours to go`}
            </div>
          </ProgressSection>
        </div>
        <div>
          <button>Keep Making Progress</button>
        </div>
      </TrackInfo>

      <Review />
    </StyledMainSection>
  );
}

export default MainSection;
