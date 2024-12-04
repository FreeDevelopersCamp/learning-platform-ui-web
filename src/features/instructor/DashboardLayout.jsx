import styled from 'styled-components';

// import { useInstructor } from '../../hooks/instructor/useInstructor';
// import Stats from './Stats';

// import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
  gap: 2.4rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  gap: 0.5rem;
  padding: 20px;
`;

const StyledHeading = styled.h5`
  font-weight: 500;
  font-size: 2.5rem;
`;

function DashboardLayout() {
  // const { instructors, isLoading4, error } = useInstructor(token);

  // console.log('Instructors: ', instructors);

  // if (isLoading4) return <Spinner />;

  return (
    <StyledContainer>
      {/* <div><p className="text-gray-600 mb-8"></p></div> */}
      <StyledDashboardLayout>{/* <Stats /> */}</StyledDashboardLayout>
    </StyledContainer>
  );
}

export default DashboardLayout;
