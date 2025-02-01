import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 20%;
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

function SettingsSidebar() {
  const navigate = useNavigate();
  return (
    <LeftSection>
      <h1>Account Settings</h1>
      <Sidebar>
        <SidebarItem active>
          Profile <span>&gt;</span>
        </SidebarItem>
        <SidebarItem>
          Subscription <span>&gt;</span>
        </SidebarItem>
        <SidebarItem onClick={() => navigate('/settings/notifications')}>
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
  );
}

export default SettingsSidebar;
