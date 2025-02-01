import styled from 'styled-components';

const StyledStat = styled.div`
  border-radius: var(--border-radius-md);
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 200px;
  height: 120px;
`;

const Title = styled.h2`
  font-size: 1.3rem;
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
  height: 75px;
  width: 90px;
  font-size: 2rem;
  background-color: ${({ iconBgColor }) => iconBgColor || '#e5e7eb'};
  border-radius: 10px;

  & > svg {
    font-size: 2.8rem;
    color: ${({ iconColor }) => iconColor || '#6b7280'};
  }
`;

const Values = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  align-items: center;
  flex-grow: 1;
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
