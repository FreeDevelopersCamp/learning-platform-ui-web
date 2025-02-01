import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillLightningFill } from 'react-icons/bs';

import UserAvatar from '../../../ui/User/UserAvatar';
import { formatDuration } from '../../../utils/helpers'; // Import duration formatter

const StyledProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: right;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;

  h2 {
    font-size: 2rem;
    font-weight: 750;
    color: #1f2937;
  }

  button {
    font-size: 1.5rem;
    font-weight: 500;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #4b5563;
    }

    &:active {
      color: #1f2937;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  width: 100%;

  div {
    text-align: center;

    p {
      font-size: 3rem;
      font-weight: 500;
      color: #1f2937;
    }

    span {
      font-size: 1.5rem;
      font-weight: 500;
    }

    &:not(:last-child) {
      border-right: 1px solid #e5e7eb;
    }
  }
`;

const DailyStreak = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .streak-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    span {
      font-size: 1.5rem;
    }

    .streak-icon {
      font-size: 1.6rem;
      color: #3b82f6;
    }
  }

  .streak-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.8rem;

    .day {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;

      .label {
        font-size: 1.2rem;
        font-weight: 500;
        color: #6b7280;
      }

      .circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #e5e7eb;
        transition: background-color 0.3s ease;

        &.active {
          background-color: #3b82f6;
        }
      }
    }
  }
`;

const CompletionStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;

  div {
    text-align: center;
    padding: 0.5rem 0;

    p {
      font-size: 2.2rem;
      font-weight: 500;
      color: #1f2937;
    }

    span {
      font-size: 1.2rem;
      font-weight: 500;
    }

    &:not(:last-child) {
      border-right: 1px solid #e5e7eb;
    }
  }
`;

const TotalHours = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.6rem;
    font-weight: 450;
    color: #1f2937;
  }

  span {
    font-size: 1.75rem;
    font-weight: 600;
    color: #1f2937;
  }
`;

function ProgressSection({ user, userProgress }) {
  const navigate = useNavigate();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Labels for days of the week

  // **Extract user progress statistics**
  const totalHours = formatDuration(userProgress?.spentTime || 0);
  const completedCourses = userProgress?.completedCoursesIds?.length || 0;
  const currentRoadmaps = userProgress?.currentRoadmapsIds?.length || 0;

  // **Filter projects that have `status === '2'` (Passed)**
  const completedProjects =
    userProgress?.currentProjectsIds?.filter((p) => p.status === '2')?.length ||
    0;

  function handleClick(e) {
    e.preventDefault();
    navigate(`/profile?username=${user.userName}`);
  }

  return (
    <StyledProgressSection>
      <ProfileSection>
        <UserAvatar user={user} size="6rem" />
        <div>
          <h2>Hey, {user.personalInformation.name.first}! &gt;</h2>
          <button onClick={handleClick}>See Profile</button>
        </div>
      </ProfileSection>

      <Divider />

      <StatsRow>
        <div>
          <span>Daily XP</span>
          <p>50/250</p>
        </div>
        <div>
          <span>Total XP</span>
          <p>{userProgress.xp}</p>
        </div>
      </StatsRow>

      <Divider />

      <TotalHours>
        <p>Total Hours Spent: </p>
        <span>{totalHours}</span>
      </TotalHours>

      <Divider />

      <DailyStreak>
        <div className="streak-header flex flex-col">
          <span className="text-lg font-semibold">Daily Streak</span>
          <div className="flex flex-row gap-1 items-center">
            <span className="streak-icon">
              <BsFillLightningFill />
            </span>
            <span>1 Days</span>
          </div>
        </div>
        <div className="streak-wrapper">
          {days.map((day, index) => (
            <div className="day" key={index}>
              <span className="label">{day}</span>
              <div className={`circle ${index < 1 ? 'active' : ''}`} />
            </div>
          ))}
        </div>
      </DailyStreak>

      <Divider />

      <CompletionStats>
        <div>
          <p>{completedCourses}</p>
          <span>Completed Courses</span>
        </div>
        <div>
          <p>{currentRoadmaps}</p>
          <span>Current Roadmaps</span>
        </div>
        <div>
          <p>{completedProjects}</p>
          <span>Completed Projects</span>
        </div>
      </CompletionStats>
    </StyledProgressSection>
  );
}

export default ProgressSection;
