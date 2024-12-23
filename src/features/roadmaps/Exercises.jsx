import { useState } from 'react';
import styled from 'styled-components';

import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem auto;
  max-width: 600px;
`;

const QuestionContainer = styled.div`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Option = styled.label`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;

  input {
    margin: 0;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  svg {
    font-size: 1.4rem;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--color-blue-600);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 3px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-blue-800);
  }

  &:disabled {
    background-color: var(--color-blue-200);
    cursor: not-allowed;
  }
`;

function Exercises({ exercises }) {
  const [answers, setAnswers] = useState(
    exercises.map(() => ({
      selected: null,
      submitted: false,
      isCorrect: null,
    })),
  );

  const handleOptionChange = (index, selected) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].selected = selected;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].submitted = true;
    updatedAnswers[index].isCorrect =
      exercises[index].correctAnswer === `${updatedAnswers[index].selected}`;
    setAnswers(updatedAnswers);
  };

  return (
    <Container>
      {exercises.map((exercise, index) => (
        <QuestionContainer key={index}>
          <Question>
            Question {index + 1} of {exercises.length}
          </Question>
          <Description>{exercise.question}</Description>
          <Options>
            {exercise.answers.map((answer, answerIndex) => (
              <Option key={answerIndex}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '.5rem',
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={answerIndex}
                    checked={answers[index].selected === answerIndex}
                    onChange={() => handleOptionChange(index, answerIndex)}
                    disabled={answers[index].submitted}
                  />
                  {answer}
                </div>
                {answers[index].submitted &&
                  answers[index].selected === answerIndex &&
                  (answers[index].isCorrect ? (
                    <FaCheck color="green" />
                  ) : (
                    <IoClose color="red" size="1.6rem" />
                  ))}
              </Option>
            ))}
          </Options>
          <SubmitButton
            onClick={() => handleSubmit(index)}
            disabled={
              answers[index].selected === null || answers[index].submitted
            }
          >
            {answers[index].submitted ? 'Submitted!' : 'Submit'}
          </SubmitButton>
        </QuestionContainer>
      ))}
    </Container>
  );
}

export default Exercises;
