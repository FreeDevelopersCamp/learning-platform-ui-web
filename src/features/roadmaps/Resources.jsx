import styled from 'styled-components';

const ResourceContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 1200px;
`;

const ResourceTitle = styled.h4`
  font-size: 1.6rem;
  color: var(--color-grey-900);
  margin-bottom: 0.5rem;
`;

const ResourceLink = styled.a`
  font-size: 1.4rem;
  color: var(--color-blue-600);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

function Resources({ resource, typeLabels }) {
  if (!resource || !resource.type) {
    return (
      <ResourceContainer>
        <ResourceTitle>Invalid Resource</ResourceTitle>
        <p>This resource is missing type information or is undefined.</p>
      </ResourceContainer>
    );
  }

  return (
    <ResourceContainer>
      {resource.type === '0' && (
        <div>
          <ResourceTitle>Article: {resource.name}</ResourceTitle>
          <ResourceLink
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Article
          </ResourceLink>
        </div>
      )}
      {resource.type === '1' && (
        <div>
          <ResourceTitle>Video: {resource.name}</ResourceTitle>
          <VideoContainer>
            <iframe
              src={
                resource.url
                  ? `https://www.youtube.com/embed/${new URL(resource.url).searchParams.get('v')}`
                  : ''
              }
              title={resource.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
              }}
              onError={(e) => console.error('Iframe error:', e)}
            ></iframe>
          </VideoContainer>
        </div>
      )}
      {/* Add additional types here */}
      {!typeLabels[resource.type] && (
        <div>
          <ResourceTitle>Unknown Type: {resource.name}</ResourceTitle>
          <ResourceLink
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Resource
          </ResourceLink>
        </div>
      )}
    </ResourceContainer>
  );
}

export default Resources;
