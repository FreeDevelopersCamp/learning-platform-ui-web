import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: var(--color-grey-0);
  padding: 2rem;
  margin: 0 auto;
  width: 70%;
  gap: 2rem;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  font-size: 2.8rem;
  font-weight: bold;
  gap: 1rem;

  h1 {
    font-weight: 600;
    color: var(--color-grey-900);
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  background-color: var(--color-coolgray-100);
  border-radius: 8px;
  margin-right: 2rem;
`;

export const SidebarItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  color: var(--color-grey-700);
  cursor: pointer;
  border: 1px solid var(--color-grey-100);

  background-color: ${(props) =>
    props.active ? 'var(--color-grey-0)' : 'transparent'};

  &:hover {
    background-color: var(--color-grey-0);
  }

  &:active {
    background-color: var(--color-coolgray-100);
  }

  span {
    font-size: 2rem;
  }
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
  margin-bottom: 2rem;
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
  border: 1px solid var(--color-red-500);
  background-color: var(--color-red-600);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.6rem;
  margin-left: 1rem;

  &:hover {
    background-color: var(--color-coolgray-600);
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
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
