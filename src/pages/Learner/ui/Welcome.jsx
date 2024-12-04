import styled from 'styled-components';
import Spinner from '../../../ui/Spinner';

const StyledWelcome = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 2rem;

  span {
    font-size: 2.7rem;
    font-weight: 600;
  }

  p {
    font-size: 1.6rem;
    font-weight: 600;
    color: #6b7280;
  }
`;

function Welcome({ user }) {
  if (!user) return <Spinner />;

  return (
    <StyledWelcome>
      Welcome back, <span>{user.personalInformation.name.first} 👋</span>
      <p>
        Here is your progress this week. let's keep it up and get a lot of
        points reward!
      </p>
    </StyledWelcome>
  );
}

export default Welcome;
