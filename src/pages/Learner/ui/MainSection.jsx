import styled from 'styled-components';

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f9fafb; /* Tailwind's bg-gray-50 */
  border-radius: 8px; /* Tailwind's rounded-lg */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Tailwind's shadow-md */
`;

const TrackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;

  a {
    color: #3b82f6; /* Tailwind's text-blue-500 */
    font-weight: 600;
    text-decoration: none; /* Remove underline by default */
    cursor: pointer;

    &:hover {
      text-decoration: underline; /* Add underline on hover */
    }
  }

  button {
    background-color: #10b981; /* Tailwind's bg-green-500 */
    color: #fff; /* Tailwind's text-white */
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #059669; /* Tailwind's bg-green-600 */
    }
  }
`;

const LearningSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h3 {
    font-size: 1.25rem; /* Tailwind's text-lg */
    font-weight: 600; /* Tailwind's font-semibold */
  }

  .header a {
    color: #3b82f6; /* Tailwind's text-blue-500 */
    font-size: 0.875rem; /* Tailwind's text-sm */
    font-weight: 500; /* Tailwind's font-medium */
    cursor: pointer;
  }
`;

const SectionCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background-color: #ffffff; /* Tailwind's bg-white */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* Tailwind's shadow-sm */
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Tailwind's shadow-md */
  }

  .icon {
    font-size: 2rem;
    color: #10b981; /* Tailwind's text-green-500 */
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 1rem; /* Tailwind's text-base */
      font-weight: 600; /* Tailwind's font-semibold */
    }

    p {
      font-size: 0.875rem; /* Tailwind's text-sm */
      font-weight: 500; /* Tailwind's font-medium */
      color: #6b7280; /* Tailwind's text-gray-500 */
    }
  }
`;

function MainSection() {
  return (
    <StyledMainSection>
      {/* Track Information */}
      <TrackInfo>
        <div>
          You’re enrolled in the{' '}
          <a href="#">Associate Data Scientist In Python</a> track.
        </div>
        <button>Keep Making Progress</button>
      </TrackInfo>

      {/* Current Learning Section */}
      <LearningSection>
        <div className="header">
          <h3>Learn</h3>
          <a href="#">Working with Dates and Times in Python &gt;</a>
        </div>
        <SectionCard>
          <div className="icon">💡</div>
          <div className="info">
            <h4>Working with Dates and Times in Python</h4>
            <p>54% complete - 2 hours to go</p>
          </div>
        </SectionCard>
      </LearningSection>

      {/* Practice and Apply */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard>
          <div className="icon">🏋️</div>
          <div className="info">
            <h4>Practice: Understanding Data Engineering</h4>
          </div>
        </SectionCard>
        <SectionCard>
          <div className="icon">🎥</div>
          <div className="info">
            <h4>Apply: Investigating Netflix Movies</h4>
          </div>
        </SectionCard>
      </div>
    </StyledMainSection>
  );
}

export default MainSection;
