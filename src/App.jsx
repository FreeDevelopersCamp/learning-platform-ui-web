import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';

import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/admin/Users';
import Permissions from './pages/admin/Permissions';
import InstructorPage from './pages/Instructor/InstructorPage';
import PageNotFound from './pages/PageNotFound';
import PageNotAuthorized from './pages/PageNotAuthorized';

// import { DarkModeProvider } from './context/DarkModeContext';

import HomeLayout from './ui/HomeLayout';
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import ProfilePage from './pages/Profile/ProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute role="none">
                <HomeLayout />
              </ProtectedRoute>
            }
          >
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
          </Route>

          <Route element={<AppLayout />}>
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute role="0" tab="dashboard">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/users"
              element={
                <ProtectedRoute role="0" tab="users">
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/permissions"
              element={
                <ProtectedRoute role="0" tab="permissions">
                  <Permissions />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/permissions"
              element={
                <ProtectedRoute role="0" tab="permissions">
                  <Permissions />
                </ProtectedRoute>
              }
            />

            <Route
              path="instructor/dashboard"
              element={
                <ProtectedRoute role="5" tab="dashboard">
                  <InstructorPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="auth" element={<AuthPage />} />
          <Route path="not-authorized" element={<PageNotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
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
  );
}

export default App;
