import styled from 'styled-components';
import UserAvatar from '@/ui/User/UserAvatar.jsx';

// Sidebar container
const Sidebar = styled.aside`
  border-right: 1px solid var(--border-color);
  padding: 3rem;
  width: 30%;
  height: 100%;
  overflow: scroll;
`;

// Individual list items
const ListItem = styled.li`
  padding: 0.5rem 0;
`;

// Row with hover and clickable styles
const Row = styled.div`
  display: flex;
  padding: 1rem 1rem;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(
      --hover-color,
      #f1f5f9
    ); /* Default light gray hover */
  }

  cursor: pointer;

  &:hover {
    background-color: var(--selected-hover-color, var(--color-theme-300));
  }
`;

const ChatSidebar = ({ users, onUserSelect, selectedUser }) => {
  return (
    <Sidebar>
      <h1 className="font-semibold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <ListItem key={user._id} onClick={() => onUserSelect(user)}>
            <Row isSelected={selectedUser?._id === user._id}>
              <UserAvatar user={user} />
              <div className="flex flex-col">
                <span className="text-gray-800">{`${user.personalInformation.name.first} ${user.personalInformation.name.last}`}</span>
                <span>Offline</span>
              </div>
            </Row>
          </ListItem>
        ))}
      </ul>
    </Sidebar>
  );
};

export default ChatSidebar;
