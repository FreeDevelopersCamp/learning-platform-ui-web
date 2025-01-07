import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1100px;
  gap: 0.5rem;
`;

function DashboardLayout({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default DashboardLayout;
