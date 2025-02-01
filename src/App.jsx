import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import { DarkModeProvider } from './contexts/DarkModeContext';

import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import ProtectedRoute from './ui/ProtectedRoute';

import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';

import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Permissions from './pages/admin/Permissions';

import OwnerUsers from '@/pages/owner/OwnerUsers.jsx';
import OwnerDashboard from '@/pages/owner/OwnerDashboard.jsx';
import OwnerPermissions from '@/pages/owner/OwnerPermissions.jsx';

import ManagerDashboard from '@/pages/manager/ManagerDashboard.jsx';
import ManagerUsers from '@/pages/manager/ManagerUsers.jsx';
import ManagerPermissions from '@/pages/manager/ManagerPermissions.jsx';

import AccountManagerUsers from './pages/accountManager/AccountManagerUsers';
import AccountManagerDashboard from './pages/accountManager/AccountManagerDashboard';
import AccountManagerPermissions from './pages/accountManager/AccountManagerPermissions';

import ContentManagerDashboard from './pages/contentManager/ContentManagerDashboard';
import ContentManagerUsers from './pages/contentManager/ContentManagerUsers';
import ContentManagerPermissions from './pages/contentManager/ContentManagerPermissions';

import InstructorDashboard from './pages/Instructor/Dashboard';
import InstructorRoadmaps from './features/instructor/roadmaps/InstructorRoadmaps';
import InstructorProjects from './features/instructor/roadmaps/InstructorProjects';
import InstructorPractices from './features/instructor/roadmaps/InstructorPractices';
import CoursesTable from './pages/Instructor/CoursesTable';
import ProjectsTable from './pages/Instructor/ProjectsTable';
import PracticesTable from './pages/Instructor/PracticesTable';
import RoadmapsTable from './pages/Instructor/RoadmapsTable';

import LearnerPage from './pages/Learner/LearnerPage';
import Library from './pages/Learner/Library';

import Roadmaps from './features/roadmaps/Roadmaps';
import ViewRoadmapDetails from './features/roadmaps/ViewRoadmapDetails';
import ViewCourseOutline from './features/roadmaps/ViewCourseOutline';

import InstructorCourses from './features/courses/InstructorCourses';
import Courses from './features/courses/Courses';
import ViewCourseDetails from './features/courses/ViewCourseDetails';
import ViewOneCourseOutline from './features/courses/ViewOneCourseOutline';

import Projects from './features/projects/Projects';
import ViewProjectDetails from './features/projects/ViewProjectDetails';
import ViewProjectOutline from './features/projects/ViewProjectOutline';

import PageNotFound from './pages/PageNotFound';
import PageNotAuthorized from './pages/PageNotAuthorized';

import HomeLayout from './ui/Layouts/HomeLayout';
import AppLayout from './ui/Layouts/AppLayout';
import LearnerLayout from './ui/Layouts/LearnerLayout';
import CoursesLayout from './ui/Layouts/CoursesLayout';
import CourseLayout from './ui/Layouts/CourseLayout';

import { AuthProvider } from './contexts/auth/AuthContext';
import { InstructorProvider } from './contexts/instructor/InstructorContext';
import { CoursesProvider } from './contexts/courses/CoursesContext';
import { PracticesProvider } from './contexts/practices/PracticesContext';
import { ProjectsProvider } from './contexts/projects/ProjectsContext';
import ChatPage from '@/pages/Chat/ChatPage.jsx';
import PracticesPage from './pages/Learner/PracticesPage';
import Practice from './pages/Learner/Practice';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            <InstructorProvider>
              <CoursesProvider>
                <ProjectsProvider>
                  <PracticesProvider>
                    <Routes>
                      <Route element={<HomeLayout />}>
                        <Route index element={<Navigate replace to="home" />} />
                        <Route path="home" element={<HomePage />} />
                        <Route
                          path="profile"
                          element={
                            <ProtectedRoute role="all">
                              <ProfilePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="settings"
                          element={
                            <ProtectedRoute role="all">
                              <SettingsPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="calendar"
                          element={
                            <ProtectedRoute role="all">
                              <ProfilePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="taskboard"
                          element={
                            <ProtectedRoute role="all">
                              <ProfilePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="community"
                          element={
                            <ProtectedRoute role="all">
                              <ProfilePage />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="chat"
                          element={
                            <ProtectedRoute role="all">
                              <ChatPage />
                            </ProtectedRoute>
                          }
                        />
                      </Route>

                      <Route element={<AppLayout />}>
                        <Route
                          path="admin"
                          element={<Navigate to="dashboard" />}
                        />
                        <Route
                          path="admin/dashboard"
                          element={
                            <ProtectedRoute role="0">
                              <Dashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="admin/users"
                          element={
                            <ProtectedRoute role="0">
                              <Users />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="admin/permissions"
                          element={
                            <ProtectedRoute role="0">
                              <Permissions />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="owner"
                          element={<Navigate to="dashboard" />}
                        />
                        <Route
                          path="owner/dashboard"
                          element={
                            <ProtectedRoute role="1">
                              <OwnerDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="owner/users"
                          element={
                            <ProtectedRoute role="1">
                              <OwnerUsers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="owner/permissions"
                          element={
                            <ProtectedRoute role="1">
                              <OwnerPermissions />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="manager"
                          element={<Navigate to="dashboard" />}
                        />
                        <Route
                          path="manager/dashboard"
                          element={
                            <ProtectedRoute role="2">
                              <ManagerDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="manager/users"
                          element={
                            <ProtectedRoute role="2">
                              <ManagerUsers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="manager/permissions"
                          element={
                            <ProtectedRoute role="2">
                              <ManagerPermissions />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="accountManager"
                          element={<Navigate to="dashboard" />}
                        />
                        <Route
                          path="accountManager/dashboard"
                          element={
                            <ProtectedRoute role="3">
                              <AccountManagerDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="accountManager/users"
                          element={
                            <ProtectedRoute role="3">
                              <AccountManagerUsers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="accountManager/permissions"
                          element={
                            <ProtectedRoute role="3">
                              <AccountManagerPermissions />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="contentManager"
                          element={<Navigate to="dashboard" />}
                        />
                        <Route
                          path="contentManager/dashboard"
                          element={
                            <ProtectedRoute role="4">
                              <ContentManagerDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="contentManager/users"
                          element={
                            <ProtectedRoute role="4">
                              <ContentManagerUsers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="contentManager/permissions"
                          element={
                            <ProtectedRoute role="4">
                              <ContentManagerPermissions />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="contentManager/permissions"
                          element={
                            <ProtectedRoute role="4">
                              <ContentManagerPermissions />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/account"
                          element={
                            <ProtectedRoute role="5">
                              <InstructorDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/profile"
                          element={
                            <ProtectedRoute role="5">
                              <div>instructor/profile</div>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor"
                          element={<Navigate to="dashboard" />}
                        />
                        <Route
                          path="instructor/dashboard"
                          element={
                            <ProtectedRoute role="5">
                              <InstructorDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/roadmaps"
                          element={
                            <ProtectedRoute role="5">
                              <InstructorRoadmaps />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/courses"
                          element={
                            <ProtectedRoute role="5">
                              <InstructorCourses />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/projects"
                          element={
                            <ProtectedRoute role="5">
                              <InstructorProjects />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/practices"
                          element={
                            <ProtectedRoute role="5">
                              <InstructorPractices />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="instructor/courses_table"
                          element={
                            <ProtectedRoute role="5">
                              <CoursesTable />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/projects_table"
                          element={
                            <ProtectedRoute role="5">
                              <ProjectsTable />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/practices_table"
                          element={
                            <ProtectedRoute role="5">
                              <PracticesTable />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="instructor/roadmaps_table"
                          element={
                            <ProtectedRoute role="5">
                              <RoadmapsTable />
                            </ProtectedRoute>
                          }
                        />

                        <Route element={<LearnerLayout />}>
                          <Route
                            path="learner"
                            element={<Navigate to="dashboard" />}
                          />
                          <Route
                            path="learner/dashboard"
                            element={
                              <ProtectedRoute role="6">
                                <LearnerPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/library"
                            element={
                              <ProtectedRoute role="6">
                                <Library />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/roadmaps"
                            element={
                              <ProtectedRoute role="6">
                                <Roadmaps />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/roadmap/:id"
                            element={
                              <ProtectedRoute role="all">
                                <ViewRoadmapDetails />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/course/:id"
                            element={
                              <ProtectedRoute role="all">
                                <ViewCourseDetails />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/certification"
                            element={
                              <ProtectedRoute role="6">
                                <LearnerPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/courses"
                            element={
                              <ProtectedRoute role="6">
                                <Courses />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/projects"
                            element={
                              <ProtectedRoute role="6">
                                <Projects />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/practices"
                            element={
                              <ProtectedRoute role="6">
                                <PracticesPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="learner/practice/:practiceId"
                            element={
                              <ProtectedRoute role="6">
                                <Practice />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/project/:id"
                            element={
                              <ProtectedRoute role="all">
                                <ViewProjectDetails />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/project/:name/:projectId"
                            element={
                              <ProtectedRoute role="all">
                                <ViewProjectOutline />
                              </ProtectedRoute>
                            }
                          />
                        </Route>
                      </Route>

                      <Route element={<CoursesLayout />}>
                        <Route
                          path="courses"
                          element={<Navigate to="/:title/:roadmapId" />}
                        />
                        <Route
                          path="/courses/:title/:roadmapId"
                          element={
                            <ProtectedRoute role="all">
                              <ViewCourseOutline />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/courses/:title/:roadmapId/:courseTitle/:courseId"
                          element={
                            <ProtectedRoute role="all">
                              <ViewCourseOutline />
                            </ProtectedRoute>
                          }
                        />
                      </Route>

                      <Route element={<CourseLayout />}>
                        <Route
                          path="/course/:name/:courseId"
                          element={
                            <ProtectedRoute role="all">
                              <ViewOneCourseOutline />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/course/:name/:courseId/:subCourseName/:subCourseId"
                          element={
                            <ProtectedRoute role="all">
                              <ViewOneCourseOutline />
                            </ProtectedRoute>
                          }
                        />
                      </Route>

                      <Route path="login" element={<AuthPage />} />
                      <Route path="signup" element={<AuthPage />} />
                      <Route
                        path="not-authorized"
                        element={<PageNotAuthorized />}
                      />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </PracticesProvider>
                </ProjectsProvider>
              </CoursesProvider>
            </InstructorProvider>
          </AuthProvider>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
