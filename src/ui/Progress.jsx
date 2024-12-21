import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 0px;
  gap: 5px;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const BarContainer = styled.div`
  display: flex;
  width: 30%;
  background-color: var(--color-grey-300);
  height: 7px;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.percentage || 0}%;
  background-color: var(--color-light-green-500);
  transition: width 0.4s ease;
`;

const Percentage = styled.div`
  color: var(--color-grey-800);
  font-size: 1.4rem;
`;

function Progress({ percentage }) {
  return (
    <ProgressBarContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
        }}
      >
        <BarContainer>
          <ProgressBar percentage={percentage} />
        </BarContainer>
        <Percentage>{percentage}%</Percentage>
      </div>
    </ProgressBarContainer>
  );
}

export default Progress;
