import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  background-color: var(--color-dark-blue-500);
  padding: 15px 30px 20px;
  gap: 5px;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const Label = styled.div`
  color: var(--color-grey-200);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BarContainer = styled.div`
  display: flex;
  width: 50%;
  background-color: var(--color-mutedblue-100);
  height: 8px;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.percentage || 0}%;
  background-color: #03ef62;
  transition: width 0.4s ease;
`;

const Percentage = styled.div`
  color: var(--color-grey-200);
  font-size: 1.2rem;
`;

function ProgressBar({ percentage }) {
  return (
    <ProgressBarContainer>
      <Label>Track Completion</Label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
        }}
      >
        <BarContainer>
          <Progress percentage={percentage} />
        </BarContainer>
        <Percentage>{percentage}%</Percentage>
      </div>
    </ProgressBarContainer>
  );
}

export default ProgressBar;
