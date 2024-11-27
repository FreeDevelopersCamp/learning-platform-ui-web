import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmApprove = styled.div`
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

function ConfirmApprove({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  roleId,
}) {
  return (
    <StyledConfirmApprove>
      <Heading as="h3">Approve {resourceName}</Heading>
      <p>Are you sure you want to approve this {resourceName}?</p>

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
          disabled={disabled}
          onClick={() => onConfirm(roleId)}
        >
          Approve
        </Button>
      </div>
    </StyledConfirmApprove>
  );
}

export default ConfirmApprove;
