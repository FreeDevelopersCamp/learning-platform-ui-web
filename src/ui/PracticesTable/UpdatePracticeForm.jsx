import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUpdatePractice } from '../../apis/learn/Practice/hooks/useUpdatePractice';
import Button from '../Buttons/Button';
import Spinner from '../Spinner';

const FormContainer = styled.div`
  max-height: 70vh; /* Fixed height for scroll */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function UpdatePracticeForm({ practice, onCloseModal }) {
  const { updatePractice, isUpdating } = useUpdatePractice();
  const [formData, setFormData] = useState(practice);

  useEffect(() => {
    setFormData(practice);
  }, [practice]);

  const addQuestion = () => {
    setFormData({
      ...formData,
      instructorId: practice.instructorId,
      questions: [
        ...formData.questions,
        {
          question: '',
          choice1: '',
          choice2: '',
          choice3: '',
          choice4: '',
          correctAnswer: '',
        },
      ],
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = formData.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.topic ||
      formData.questions.length === 0
    ) {
      alert(
        'Please fill in all required fields and add at least one question.',
      );
      return;
    }

    updatePractice(formData);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Update Practice</h2>

        <FormRow>
          <Label>Name</Label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormRow>

        <FormRow>
          <Label>Category</Label>
          <Input
            type="text"
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Topic</Label>
          <Input
            type="text"
            required
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>XP</Label>
          <Input
            type="number"
            required
            value={formData.xp}
            onChange={(e) =>
              setFormData({ ...formData, xp: Number(e.target.value) })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            required
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: Number(e.target.value) })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Challenges to Pass</Label>
          <Input
            type="number"
            required
            value={formData.challengesToPass}
            onChange={(e) =>
              setFormData({
                ...formData,
                challengesToPass: Number(e.target.value),
              })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Questions</Label>
          <Button type="button" onClick={addQuestion}>
            Add Question
          </Button>
          {formData.questions.map((question, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Label>Question</Label>
              <Input
                type="text"
                required
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, 'question', e.target.value)
                }
              />

              <Label>Choice 1</Label>
              <Input
                type="text"
                required
                value={question.choice1}
                onChange={(e) =>
                  handleQuestionChange(index, 'choice1', e.target.value)
                }
              />

              <Label>Choice 2</Label>
              <Input
                type="text"
                required
                value={question.choice2}
                onChange={(e) =>
                  handleQuestionChange(index, 'choice2', e.target.value)
                }
              />

              <Label>Choice 3</Label>
              <Input
                type="text"
                value={question.choice3}
                onChange={(e) =>
                  handleQuestionChange(index, 'choice3', e.target.value)
                }
              />

              <Label>Choice 4</Label>
              <Input
                type="text"
                value={question.choice4}
                onChange={(e) =>
                  handleQuestionChange(index, 'choice4', e.target.value)
                }
              />

              <Label>Correct Answer</Label>
              <select
                required
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, 'correctAnswer', e.target.value)
                }
              >
                <option value="">Select the correct answer</option>
                <option value={question.choice1}>{question.choice1}</option>
                <option value={question.choice2}>{question.choice2}</option>
                <option value={question.choice3}>{question.choice3}</option>
                <option value={question.choice4}>{question.choice4}</option>
              </select>
            </div>
          ))}
        </FormRow>

        <ButtonGroup>
          <Button
            type="button"
            onClick={onCloseModal}
            variation="secondary"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? <Spinner /> : 'Update Practice'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}
