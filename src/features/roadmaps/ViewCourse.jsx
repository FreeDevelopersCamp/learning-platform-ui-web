import styled from 'styled-components';

const Title = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
  text-overflow: ellipsis; /* Handles long text */
  overflow: hidden; /* Prevents content overflow */
  white-space: nowrap; /* Prevents wrapping */
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const CourseItem = styled.li`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Content = styled.div`
  background-color: red;
  padding: 1rem;
  color: white;
  border-radius: 5px;
`;

function ViewCourse({ course }) {
  return <div>ViewCourse</div>;
}

export default ViewCourse;
