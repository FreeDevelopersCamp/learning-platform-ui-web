import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: var(--color-grey-0);
  padding: 2rem;
  margin: 0 auto;
  width: 65%;
  gap: 2rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 22%;
  font-size: 2.8rem;
  font-weight: bold;
  gap: 1rem;

  h1 {
    width: 100%;
    font-weight: 600;
    color: var(--color-grey-900);
  }
`;

const Sidebar = styled.div`
  width: 100%;
  background-color: var(--color-coolgray-100);
  border-radius: 8px;
  margin-right: 2rem;
`;

const SidebarItem = styled.div`
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

const Content = styled.div`
  flex: 1;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-skyblue-900);
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--color-coolgray-800);
    color: #fff;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fdfdfd;
`;

const SettingsPage = () => {
  return (
    <Container>
      <LeftSection>
        <h1>Account Settings</h1>
        <Sidebar>
          <SidebarItem active>
            Profile <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Subscription <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Notifications <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Social <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Password <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Emails <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            More <span>&gt;</span>
          </SidebarItem>
        </Sidebar>
      </LeftSection>
      <Content>
        <Header>Account Settings</Header>
        <ProfileSection>
          <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
          <UploadButton>Upload New Picture</UploadButton>
        </ProfileSection>
        <Form>
          <FormRow>
            <Label>First name</Label>
            <Input type="text" placeholder="First name" defaultValue="Bara" />
          </FormRow>
          <FormRow>
            <Label>Last name</Label>
            <Input
              type="text"
              placeholder="Last name"
              defaultValue="Al-Sedih"
            />
          </FormRow>
          <FormRow>
            <Label>E-mail address</Label>
            <Input
              type="email"
              placeholder="Email"
              defaultValue="baraalsedih@gmail.com"
            />
          </FormRow>
          <FormRow>
            <Label>Phone</Label>
            <Input type="text" placeholder="Phone" defaultValue="0599407644" />
          </FormRow>
          <FormRow>
            <Label>Location</Label>
            <Input
              type="text"
              placeholder="Location"
              defaultValue="Palestine"
            />
          </FormRow>
          <FormRow>
            <Label>Company/school</Label>
            <Input
              type="text"
              placeholder="Company/school"
              defaultValue="Najah National University"
            />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
};

export default SettingsPage;
