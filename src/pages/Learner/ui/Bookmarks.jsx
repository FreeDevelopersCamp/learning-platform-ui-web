import styled from 'styled-components';

const BookmarksContainer = styled.div`
  margin-bottom: 2rem;
`;

const BookmarkCard = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

function Bookmarks({ courses = [], projects = [] }) {
  if (courses.length === 0 && projects.length === 0)
    return <p>No Bookmarks Available</p>;

  return (
    <BookmarksContainer>
      <h2>Bookmarks</h2>
      {courses.map((item) => (
        <BookmarkCard key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </BookmarkCard>
      ))}
      {projects.map((item) => (
        <BookmarkCard key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </BookmarkCard>
      ))}
    </BookmarksContainer>
  );
}

export default Bookmarks;
