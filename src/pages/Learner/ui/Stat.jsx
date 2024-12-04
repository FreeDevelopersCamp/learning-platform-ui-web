import styled from 'styled-components';

const StyledStat = styled.div`
  border-radius: var(--border-radius-md);
  padding: 20px;

  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  position: relative;
  height: auto;

  /* background-color: ${({ bgColor }) => bgColor || '#f9fafb'}; */
  border: 1px;

  /* Responsive Design */
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Value = styled.p`
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  color: ${({ iconColor }) => iconColor || '#6b7280'};
  margin: 0;
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 5rem; /* This affects non-MUI icons */
  color: ${({ iconColor }) => iconColor || '#6b7280'};
  background-color: ${({ iconBgColor }) => iconBgColor || '#e5e7eb'};
  border-radius: 15%;

  & > svg {
    font-size: 3rem; /* Explicitly target MUI icons */
  }
`;

const Values = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  align-items: center;
  width: 100%;
`;

function Stat({ title, data, children, bgColor, iconColor, iconBgColor }) {
  return (
    <StyledStat bgColor={bgColor}>
      <IconContainer iconColor={iconColor} iconBgColor={iconBgColor}>
        {children}
      </IconContainer>
      <Values>
        <Title>{title}</Title>
        <Value iconColor={iconColor}>{data || 0}</Value>
      </Values>
    </StyledStat>
  );
}

export default Stat;
