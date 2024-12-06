import React from 'react';
import styled from 'styled-components';

// Flex Container for Progress Bar and Label
const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: ${({ width }) => width || '500%'};
`;

// Styled Progress Bar Container
const ProgressContainer = styled.div`
  flex: 1; /* Allows the bar to stretch */
  height: 1rem;
  background-color: ${({ bgColor }) => bgColor || '#e5e7eb'};
  border-radius: 4rem;
  overflow: hidden;
  position: relative;
`;

// Styled Progress Fill
const ProgressFill = styled.div`
  width: ${({ progress }) => progress || 0}%;
  height: 100%;
  background-color: ${({ fillColor }) => fillColor || '#4f46e5'};
  transition: width 0.3s ease-in-out;
`;

// Progress Label (Right of Progress Bar)
const ProgressLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ labelColor }) => labelColor || '#374151'};
`;

function Progress({ progress = 0, bgColor, fillColor, labelColor, width }) {
  return (
    <ProgressWrapper width={width}>
      <ProgressContainer bgColor={bgColor}>
        <ProgressFill progress={progress} fillColor={fillColor} />
      </ProgressContainer>
      <ProgressLabel labelColor={labelColor}>{progress}%</ProgressLabel>
    </ProgressWrapper>
  );
}

export default Progress;
