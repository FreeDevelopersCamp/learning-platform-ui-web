import styled from 'styled-components';
import { BsFire } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  width: 50%;

  .logo {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-grey-900);
    cursor: pointer;
    display: flex;
    min-width: 240px;
    justify-content: center;
    align-items: center;
  }
`;

function ProfileFooter() {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <p>Powered by</p>
      <div
        className="logo architects-daughter-regular"
        onClick={() => navigate('/')}
      >
        {`freeDevelopersCamp`}
        <span className="pl-1">{'('}</span>
        <span className="pb-2">
          <BsFire />
        </span>
        <span>)</span>
      </div>
    </StyledContainer>
  );
}

export default ProfileFooter;
