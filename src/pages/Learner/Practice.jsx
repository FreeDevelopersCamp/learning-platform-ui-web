import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPractice } from '../../apis/learn/Practice/hooks/useGetPractice';
import { useGetProgress } from '../../apis/learn/Progress/hooks/useGetProgress';
import { useUpdateProgress } from '../../apis/learn/Progress/hooks/useUpdateProgress';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';

import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const QuestionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChoiceButton = styled.button`
  background: ${(props) => (props.selected ? '#2563eb' : '#f3f4f6')};
  color: ${(props) => (props.selected ? 'white' : '#111827')};
  border: 2px solid ${(props) => (props.selected ? '#2563eb' : '#d1d5db')};
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #2563eb;
    color: white;
  }
`;

const NextButton = styled.button`
  background: #10b981;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background: #059669;
  }
`;

const SubmitButton = styled(NextButton)`
  background: #2563eb;

  &:hover {
    background: #1d4ed8;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #10b981;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease-in-out;
`;

const ScoreText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #2563eb;
`;

const Heading = styled.h1`
  font-size: 5rem;
  margin-bottom: 5rem;
  margin-top: 5rem;
`;

function Practice() {
  const { practiceId } = useParams();
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);

  const { practice, isLoading: practiceLoading } = useGetPractice(practiceId);
  const { progress, isLoading: progressLoading } = useGetProgress(
    practice?.user?._id,
  );
  const { updateProgress, isLoading: isUpdating } = useUpdateProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (
    practiceLoading ||
    progressLoading ||
    isUpdating ||
    isLoading ||
    userLoading
  )
    return <Spinner />;
  if (!practice || practice.questions.length === 0)
    return <div>No questions available.</div>;

  const question = practice.questions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer.');
      return;
    }

    if (selectedAnswer === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < practice.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setCompleted(true);
    }
  };

  const handleFinish = async () => {
    const passingScore = Math.ceil(practice.questions.length * 0.7); // 70% to pass

    if (score >= passingScore) {
      toast.success('Congrats! You passed the practice.');
      let updatedProgress = {
        ...progress,
        user: '',
        userId: user?._id,
        completedPracticesIds: [
          ...(Array.isArray(progress?.completedPracticesIds)
            ? progress.completedPracticesIds
            : []),
          practiceId,
        ],
        completedCoursesIds: [
          ...(Array.isArray(progress?.completedCoursesIds)
            ? progress?.completedCoursesIds
            : []),
          practice.courseId,
        ],
      };

      updateProgress(updatedProgress);
    } else {
      toast.error('You did not pass. Try again!');
    }
  };

  return (
    <div>
      <Heading>{practice.name}</Heading>
      <Container>
        {!completed ? (
          <>
            <ProgressBar>
              <ProgressFill
                width={(currentQuestionIndex / practice.questions.length) * 100}
              />
            </ProgressBar>
            <QuestionTitle>{question.question}</QuestionTitle>
            <ChoicesContainer>
              {[
                question.choice1,
                question.choice2,
                question.choice3,
                question.choice4,
              ]
                .filter(Boolean)
                .map((choice, index) => (
                  <ChoiceButton
                    key={index}
                    selected={selectedAnswer === choice}
                    onClick={() => setSelectedAnswer(choice)}
                  >
                    {choice}
                  </ChoiceButton>
                ))}
            </ChoicesContainer>
            <NextButton onClick={handleNext}>
              {currentQuestionIndex + 1 < practice.questions.length
                ? 'Next'
                : 'Finish'}
            </NextButton>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Exam Completed!</h2>
            <ScoreText>
              Your Score: {score} / {practice.questions.length}
            </ScoreText>
            <SubmitButton onClick={handleFinish}>Submit Results</SubmitButton>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Practice;
