import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: var(--color-grey-0);
  padding: 2rem;
  margin: 0 auto;
  width: 72%;
  gap: 2rem;
`;

export const Content = styled.div`
  flex: 1;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  padding: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

export const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`;

export const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-skyblue-900);
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.6rem;
  margin-left: 2rem;

  &:hover {
    background-color: var(--color-coolgray-800);
    color: var(--color-grey-50);
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-skyblue-900);
  background-color: var(--color-theme-500);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.6rem;
  margin-left: 1rem;

  &:hover {
    background-color: var(--color-coolgray-600);
  }
`;

export const DeactivateButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-red-50);
  background-color: var(--color-red-50);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.6rem;
  margin-left: 1rem;

  &:hover {
    background-color: var(--color-red-100);
    border-color: var(--color-coolgray-600);
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

export const UserInformation = styled.section``;

export const ProfileInformation = styled.section``;

export const FormRow = styled.div`
  margin-top: 2rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

export const FormArea = styled.textarea`
  width: 100%;
  height: 150px; /* Increased height */
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  resize: vertical; /* Allows user to resize vertically */
`;

export const Label = styled.label`
  display: block;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

export const LabelHeading = styled.label`
  display: block;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  padding-bottom: 4px; /* Adjust this to create space */
  border-bottom: 2px solid var(--color-grey-900); /* Set underline thickness and color */
  margin-top: 2rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

export const AddMore = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-coolgray-900);
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.6rem;
  width: 50%;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  color: var(--color-coolgray-900);

  &:hover {
    background-color: var(--color-coolgray-800);
    color: var(--color-grey-50);
  }
`;
