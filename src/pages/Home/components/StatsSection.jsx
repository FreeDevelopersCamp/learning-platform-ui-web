import React from 'react';
import styled from 'styled-components';
import {
  FaCode,
  FaLaptopCode,
  FaDatabase,
  FaCogs,
  FaUserTie,
} from 'react-icons/fa';

import UserAvatar from '../../../ui/User/UserAvatar';

const StatsWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StatsContainer = styled.div`
  background-color: var(--color-theme-800);
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  width: 350px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.span`
  font-size: 20px;
`;

const TitleText = styled.span`
  font-size: 14px;
`;

const Views = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
`;

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: 300;
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: '5rem';
  height: 5rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const courses = [
  {
    title: 'HTML',
    views: '50',
    icon: <FaCode />,
  },
  {
    title: 'CSS',
    views: '48',
    icon: <FaCode />,
  },
  {
    title: 'Git',
    views: '37',
    icon: <FaCode />,
  },
  {
    title: 'GitHub',
    views: '35',
    icon: <FaCode />,
  },
  { title: 'JavaScript', views: '29', icon: <FaCode /> },
];

const roadmaps = [
  { title: 'Front-End Beginner', views: '66', icon: <FaCode /> },
  { title: 'Front-End Development', views: '52', icon: <FaLaptopCode /> },
  { title: 'Back-End Developer', views: '0', icon: <FaDatabase /> },
  { title: 'DevOps Engineer', views: '0', icon: <FaCogs /> },
  { title: 'Data Science', views: '0', icon: <FaDatabase /> },
];
const instructors = [
  {
    name: 'Instructor Family',
    topic: 'Front-End Development',
    courses: '9',
    image:
      'https://storage.googleapis.com/free-developers-camp-images/uploads/osman.jpg',
  },
  {
    name: 'Bara Al-Sedih',
    topic: 'Machine Learning Specialist',
    courses: '6',
    image:
      'https://storage.googleapis.com/free-developers-camp-images/uploads/DSC01543.jpeg',
  },
  {
    name: 'Yazan Al-Sedih',
    topic: 'Front-End Development',
    courses: '5',
    image:
      'https://storage.googleapis.com/free-developers-camp-images/uploads/20240608_104010953_iOS.jpg',
  },
  {
    name: 'Admin Lastname',
    topic: 'Full-Stack Development',
    courses: '2',
    image:
      'https://storage.googleapis.com/free-developers-camp-images/uploads/artugrul.jpg',
  },
];

function StatsSection() {
  return (
    <StatsWrapper>
      {/* Top Courses Card */}
      <StatsContainer>
        <Title>Top Courses</Title>
        <List>
          {courses.map((course, index) => (
            <ListItem key={index}>
              <Info>
                <Icon>{course.icon}</Icon>
                <TitleText>{course.title}</TitleText>
              </Info>
              <Views>{course.views} Views</Views>
            </ListItem>
          ))}
        </List>
      </StatsContainer>

      {/* Top Roadmaps Card */}
      <StatsContainer>
        <Title>Top Roadmaps</Title>
        <List>
          {roadmaps.map((roadmap, index) => (
            <ListItem key={index}>
              <Info>
                <Icon>{roadmap.icon}</Icon>
                <TitleText>{roadmap.title}</TitleText>
              </Info>
              <Views>{roadmap.views} Views</Views>
            </ListItem>
          ))}
        </List>
      </StatsContainer>

      {/* Top Instructors Card */}
      <StatsContainer>
        <Title>Popular Instructors</Title>
        <List>
          {instructors.map((instructor, index) => (
            <ListItem key={index}>
              <Info>
                <StyledUserAvatar>
                  <Avatar src={instructor?.image} alt={instructor?.name} />
                </StyledUserAvatar>
                <div>
                  <TitleText>
                    <strong>{instructor.name}</strong>
                  </TitleText>
                  <br />
                  <TitleText style={{ fontSize: '12px', color: '#aaa' }}>
                    {instructor.topic}
                  </TitleText>
                </div>
              </Info>
              <Views>{instructor.courses} Courses</Views>
            </ListItem>
          ))}
        </List>
      </StatsContainer>
    </StatsWrapper>
  );
}

export default StatsSection;
