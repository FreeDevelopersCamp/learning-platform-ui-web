import styled from 'styled-components';
import UserAvatar from '../authentication/UserAvatar';
import Button from '../../ui/Button';

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 20px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 1fr;

  position: relative;
  height: 15rem;

  /* Add shadow */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */

  /* Responsive Design */
  @media (max-width: 768px) {
    height: 18rem;
    grid-template-rows: auto auto;
    padding: 15px;
  }

  @media (max-width: 480px) {
    height: auto;
    padding: 10px;
    grid-template-rows: auto auto auto;
  }
`;

const StyledButton = styled(Button)`
  height: 4rem;
  padding-top: 1rem;

  font-size: 1.5rem;
  border-radius: 6px;

  &:hover {
    background-color: var(--color-grey-300);
    color: var(--color-primary-dark);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Smooth transition for hover effects */
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  /* Remove focus outline */
  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Responsive Font Size */
  @media (max-width: 768px) {
    font-size: 1.3rem;
    height: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    height: 3rem;
  }
`;

const Title = styled.h2`
  align-self: end;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: left;
  text-align: left;
  padding-left: 2.1rem;

  height: 100%;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const AvatarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 0 0.8rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

/* Individual Avatar */
const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--color-grey-0); /* Add border for spacing effect */
  overflow: hidden;
  margin-left: -1.5rem; /* Overlap avatars */

  /* Apply dynamic z-index from props */
  z-index: ${(props) => props.zIndex};
`;

const MoreAvatars = styled.div`
  width: 41px;
  height: 41px;
  border-radius: 50%;
  background-color: var(--color-grey-200);
  color: var(--color-grey-700);
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -1.5rem; /* Overlap avatars */

  /* Apply dynamic z-index from props */
  z-index: ${(props) => props.zIndex};
  border: 2px solid var(--color-grey-0);
`;

function UsersAvatars({ users }) {
  const visibleUsers = users.slice(0, 3); // Show up to 3 users
  const extraCount = users.length - 3; // Calculate overflow count

  return (
    <AvatarsContainer>
      {visibleUsers.map((user, index) => (
        <AvatarWrapper zIndex={index + 1} key={user.roleId}>
          <UserAvatar user={user} />
        </AvatarWrapper>
      ))}
      {extraCount > 0 && <MoreAvatars zIndex={4}>+{extraCount}</MoreAvatars>}
    </AvatarsContainer>
  );
}

function Stat({ title, data, onClick }) {
  return (
    <StyledStat>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col mt-2 h-8 gap-3">
          <Title>{title}</Title>
          <Value>{data?.length || 0}</Value>
        </div>

        <UsersAvatars users={data} />
      </div>
      <StyledButton onClick={onClick} size="medium" variation="secondary">
        Show All
      </StyledButton>
    </StyledStat>
  );
}

export default Stat;
