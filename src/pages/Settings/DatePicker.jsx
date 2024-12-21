import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useState } from 'react';

// Styled wrapper for the DatePicker
const StyledDatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 500px; /* Adjust the width */
    height: 40px; /* Adjust the height */
    padding: 1rem; /* Increase padding */
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1.6rem; /* Increase font size */
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);

    &:focus {
      border-color: var(--color-skyblue-900);
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Light blue focus */
    }
  }
`;

const CustomDatePicker = ({ selectedDate, onChange }) => {
  return (
    <StyledDatePickerWrapper>
      <DatePicker
        selected={selectedDate}
        onChange={onChange} // Pass the `onChange` handler from props
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        showPopperArrow={false}
      />
    </StyledDatePickerWrapper>
  );
};

export default CustomDatePicker;
