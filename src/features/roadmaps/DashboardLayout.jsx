import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.filterCount === 0 ? '0' : '100%')};
  width: 100%;
  max-width: 1100px;
  gap: 0.5rem;
`;

function DashboardLayout({ children, filterCount }) {
  return (
    <StyledContainer filterCount={filterCount}>{children}</StyledContainer>
  );
}

export default DashboardLayout;
