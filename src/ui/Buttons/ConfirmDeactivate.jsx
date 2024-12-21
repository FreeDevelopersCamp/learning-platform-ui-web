import styled from 'styled-components';
import Button from './Button';
import Heading from '../Heading';

const StyledConfirmDeactivate = styled.div`
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

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDeactivate>
      <Heading as="h3">Deactivate {resourceName}</Heading>
      <p>Are you sure you want to deactivate this {resourceName}?</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Deactivate
        </Button>
      </div>
    </StyledConfirmDeactivate>
  );
}

export default ConfirmDelete;
