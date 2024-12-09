import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;
  background-color: red;

  & input[type='checkbox'] {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-mutedblue-600);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }

    &:checked {
      transform: scale(1.05);
    }
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-mutedblue-400);
    cursor: not-allowed;
  }

  & label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
  }
`;

function TableCheckbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  );
}

export default TableCheckbox;
