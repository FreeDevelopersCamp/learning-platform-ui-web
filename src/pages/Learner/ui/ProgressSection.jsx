import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillLightningFill } from 'react-icons/bs';

import UserAvatar from '../../../features/authentication/UserAvatar';
import { useUser } from '../../../hooks/users/useUser';
import { useAuth } from '../../../contexts/auth/AuthContext';
import Spinner from '../../../ui/Spinner';

const StyledProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

  span {
    font-size: 1.5rem;
    font-weight: 500;
    color: #6b7280;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 2rem;

  div {
    width: 70%; /* Example progress percentage */
    height: 8px;
    background-color: #3b82f6;
    transition: width 0.3s ease;
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
      font-weight: 600;
      color: #1f2937;
    }

    span {
      font-size: 1.5rem;
      font-weight: 600;
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
      font-weight: 600;
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

function ProgressSection() {
  const navigate = useNavigate();
  const { auth, isLoading } = useAuth();

  const { user, isLoading: userLoading } = useUser(auth?.username, {
    enabled: !!auth?.username && !isLoading, // Trigger only when username is available and auth is not loading
  });

  if (isLoading || userLoading) return <Spinner>Loading session...</Spinner>;

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Labels for days of the week

  function handleClick(e) {
    e.preventDefault();
    navigate(`/profile?username=${auth.username}`);
  }

  return (
    auth.isAuthenticated && (
      <StyledProgressSection>
        <ProfileSection>
          <UserAvatar user={user} size="6rem" />
          <div>
            <h2>Hey, {user.personalInformation.name.first}! &gt;</h2>
            <span onClick={handleClick}>See Profile</span>
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
    )
  );
}

export default ProgressSection;
