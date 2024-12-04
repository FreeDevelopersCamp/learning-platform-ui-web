import styled from 'styled-components';
import Button from '../../ui/Button';

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 1fr;
  position: relative;
  height: 15rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

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

  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: none;
  }

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
  text-align: center;
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
  justify-content: center;
  text-align: center;

  height: 100%;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

function Stat({ title, data, onClick }) {
  return (
    <StyledStat>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <Title>{title}</Title>
          <Value>{data?.length || 0}</Value>
        </div>
      </div>
      <StyledButton onClick={onClick} size="medium" variation="secondary">
        Show All
      </StyledButton>
    </StyledStat>
  );
}

export default Stat;
