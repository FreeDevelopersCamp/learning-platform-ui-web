import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillLightningFill } from 'react-icons/bs';

import UserAvatar from '../../../ui/User/UserAvatar';

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
    font-size: 1.5rem; /* Tailwind: text-lg */
    font-weight: 500; /* Tailwind: font-medium */
    color: #6b7280; /* Tailwind: text-gray-500 */
    background: none; /* Remove default button styles */
    border: none; /* Remove default border */
    outline: none; /* Remove focus outline */
    cursor: pointer; /* Change to pointer on hover */
    transition: color 0.3s ease; /* Smooth transition for color */

    &:hover {
      color: #4b5563; /* Tailwind: text-gray-600 */
    }

    &:active {
      color: #1f2937; /* Tailwind: text-gray-800 */
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
        color: #6b7280; /* Gray for the day label */
      }

      .circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #e5e7eb; /* Gray for inactive */
        transition: background-color 0.3s ease;

        &.active {
          background-color: #3b82f6; /* Blue for active */
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

  div {
    text-align: center;

    p {
      font-size: 2.5rem;
      font-weight: 500;
      color: #1f2937;
    }

    span {
      font-size: 1.4rem;
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
    color: #1f2937; /* Gray for the total hours label */
  }
`;

function ProgressSection({ user }) {
  const navigate = useNavigate();

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Labels for days of the week

  function handleClick(e) {
    e.preventDefault();
    console.log(user);
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
          <p>0/250</p>
        </div>
        <div>
          <span>Total XP</span>
          <p>175,959</p>
        </div>
      </StatsRow>

      <Divider />

      <TotalHours>
        <p>Total Hours Spent: </p>
        <span> 56h 14m</span>
      </TotalHours>

      <Divider />

      <DailyStreak>
        <div className="streak-header flex flex-col">
          <span className="text-lg font-semibold">Daily Streak</span>
          <div className="flex flex-row gap-1 items-center">
            <span className="streak-icon">
              <BsFillLightningFill />
            </span>
            <span>0 Days</span>
          </div>
        </div>
        <div className="streak-wrapper">
          {days.map((day, index) => (
            <div className="day" key={index}>
              <span className="label">{day}</span>
              <div className={`circle ${index < 2 ? 'active' : ''}`} />
            </div>
          ))}
        </div>
      </DailyStreak>

      <Divider />

      <CompletionStats>
        <div>
          <p>31</p>
          <span>Courses completed</span>
        </div>
        <div>
          <p>3</p>
          <span>Roadmaps completed</span>
        </div>
        <div>
          <p>5</p>
          <span>Projects completed</span>
        </div>
      </CompletionStats>
    </StyledProgressSection>
  );
}

export default ProgressSection;
