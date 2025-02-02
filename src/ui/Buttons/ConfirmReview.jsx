import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Heading from '../Heading';

const StyledConfirmReview = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & textarea {
    width: 100%;
    height: 80px;
    padding: 8px;
    color: var(--color-grey-700);
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    resize: vertical;
    font-size: 14px;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmReview({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  roleId,
}) {
  const [reviewText, setReviewText] = useState('');

  return (
    <StyledConfirmReview>
      <Heading as="h3">Approve {resourceName}</Heading>
      <p>
        Are you sure you want to approve this {resourceName}? Please provide
        feedback.
      </p>

      <textarea
        placeholder="Write a review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={disabled || reviewText.trim() === ''}
          onClick={() => onConfirm(roleId, reviewText)}
        >
          Approve
        </Button>
      </div>
    </StyledConfirmReview>
  );
}

export default ConfirmReview;
