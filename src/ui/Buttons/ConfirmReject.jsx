import styled from 'styled-components';
import Button from './Button';
import Heading from '../Heading';

const StyledConfirmReject = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmReject({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmReject>
      <Heading as="h3">Reject {resourceName}</Heading>
      <p>
        Are you sure you want to reject this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Reject
        </Button>
      </div>
    </StyledConfirmReject>
  );
}

export default ConfirmReject;
