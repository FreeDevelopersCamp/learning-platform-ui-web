import styled from 'styled-components';
import UserAvatar from '@/ui/User/UserAvatar.jsx';
import { useEffect, useState, useMemo, memo } from 'react';

// Sidebar container
const Sidebar = styled.aside`
  border-right: 1px solid var(--border-color);
  padding: 3rem;
  width: 30%;
  height: 100%;
  overflow: auto;
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
    background-color: var(--hover-color, #f1f5f9);
  }

  cursor: pointer;

  background-color: ${({ isSelected }) =>
    isSelected
      ? 'var(--selected-hover-color, var(--color-theme-300))'
      : 'transparent'};
`;

const ChatSidebar = memo(
  ({ users, onUserSelect, selectedUser, sessions, listSessions }) => {
    const [currentSessions, setCurrentSessions] = useState(sessions || []);

    useEffect(() => {
      const fetchSessions = async () => {
        const fetchedSessions = await listSessions();
        setCurrentSessions((prevSessions) =>
          JSON.stringify(prevSessions) !== JSON.stringify(fetchedSessions)
            ? fetchedSessions
            : prevSessions,
        );
      };

      fetchSessions();
      const interval = setInterval(fetchSessions, 15000); // Fetch every 15 seconds

      return () => clearInterval(interval);
    }, [listSessions]);

    // Memoized online usernames
    const onlineUsernames = useMemo(
      () =>
        currentSessions
          .filter((session) => session.active)
          .map((session) => session.username),
      [currentSessions],
    );

    // Sort users: Selected user > Online users > Offline users
    const sortedUsers = useMemo(() => {
      return [...users].sort((a, b) => {
        if (selectedUser?._id === a._id) return -1; // Selected user first
        if (selectedUser?._id === b._id) return 1;

        const aOnline = onlineUsernames.includes(a.userName);
        const bOnline = onlineUsernames.includes(b.userName);

        if (aOnline && !bOnline) return -1; // Online users come before offline
        if (!aOnline && bOnline) return 1;

        return 0; // Keep original order if both are online or offline
      });
    }, [users, selectedUser, onlineUsernames]);

    return (
      <Sidebar>
        <h1 className="font-semibold mb-4">Users</h1>
        <ul>
          {sortedUsers.map((user) => (
            <ListItem key={user._id} onClick={() => onUserSelect(user)}>
              <Row isSelected={selectedUser?._id === user._id}>
                <UserAvatar user={user} />
                <div className="flex flex-col">
                  <span className="text-gray-800">{`${user.personalInformation.name.first} ${user.personalInformation.name.last}`}</span>
                  <span>
                    {onlineUsernames.includes(user.userName)
                      ? 'Online'
                      : 'Offline'}
                  </span>
                </div>
              </Row>
            </ListItem>
          ))}
        </ul>
      </Sidebar>
    );
  },
);

export default ChatSidebar;
