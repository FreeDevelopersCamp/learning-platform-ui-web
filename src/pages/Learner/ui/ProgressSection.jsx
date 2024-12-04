import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    font-size: 1.8rem;
    font-weight: bold;
    color: #1f2937;
  }

  span {
    font-size: 1.2rem;
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
  margin: 2rem 0; /* Adds space before and after the divider */
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;

  div {
    text-align: center;
    padding: 1rem;

    p {
      font-size: 1.6rem;
      font-weight: bold;
      color: #1f2937;
    }

    span {
      font-size: 1.2rem;
      color: #6b7280;
    }

    &:not(:last-child) {
      border-right: 1px solid #e5e7eb; /* Vertical separator between elements */
    }
  }
`;

const DailyStreak = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  p {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    gap: 0.4rem;

    span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #e5e7eb;

      &.active {
        background-color: #3b82f6;
      }
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

  function handleClick(e) {
    e.preventDefault();
    navigate(`/profile?username=${auth.username}`);
  }

  return (
    auth.isAuthenticated && (
      <StyledProgressSection>
        {/* Profile Section */}
        <ProfileSection>
          <UserAvatar user={user} size="6rem" />
          <div>
            <h2>Hey, {user.personalInformation.name.first}!</h2>
            <span>See Profile</span>
          </div>
        </ProfileSection>

        {/* Divider */}
        <Divider />

        {/* Statistics Row with Vertical Separators */}
        <StatsRow>
          <div>
            <p>0/250</p>
            <span>Daily XP</span>
          </div>
          <div>
            <p>175,959</p>
            <span>Total XP</span>
          </div>
        </StatsRow>

        {/* Divider */}
        <Divider />

        {/* Daily Streak */}
        <DailyStreak>
          <p>Daily Streak</p>
          <div>
            <span className="active" />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </DailyStreak>

        {/* Divider */}
        <Divider />

        {/* Completion Stats */}
        <StatsRow>
          <div>
            <p>31</p>
            <span>Courses completed</span>
          </div>
          <div>
            <p>3</p>
            <span>Tracks completed</span>
          </div>
          <div>
            <p>5</p>
            <span>Projects completed</span>
          </div>
        </StatsRow>
      </StyledProgressSection>
    )
  );
}

export default ProgressSection;
