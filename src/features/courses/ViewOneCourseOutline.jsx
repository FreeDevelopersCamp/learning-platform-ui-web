import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useUpdateProgress } from '../../hooks/learner/useProgress';

import ViewCourse from './ViewCourse';
import Spinner from '../../ui/Spinner';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 2rem;
  margin-top: 2.5rem;
  padding: 2.5rem 0 3rem;
  border-top: 1px solid var(--color-grey-300);
`;

const Previous = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-blue-600);
  border: 2px solid var(--color-blue-600);
  border-radius: 3px;
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-700);
    color: var(--color-blue-100);
  }

  &:disabled {
    background-color: var(--color-blue-200);
    color: var(--color-blue-600);
    cursor: not-allowed;
  }
`;

const Next = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--color-blue-600);
  color: var(--color-grey-0);
  border: 2px solid var(--color-blue-600);
  border-radius: 3px;
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-800);
    color: var(--color-grey-100);
  }

  &:disabled {
    background-color: var(--color-blue-200);
    color: var(--color-blue-600);
    cursor: not-allowed;
  }
`;

function ViewOneCourseOutline() {
  // const { courseId } = useParams();
  // const { userProgress } = useOutletContext();

  // const { mutate: updateProgress, isLoading: updatingProgress } =
  //   useUpdateProgress();

  console.log('courseId: ');
  // console.log('userProgress: ', userProgress);
  return <Container>{/* <p>Course ID: {courseId}</p> */}</Container>;
}

export default ViewOneCourseOutline;
