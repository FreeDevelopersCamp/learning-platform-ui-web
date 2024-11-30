import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users';
import AuthPage from './pages/Auth/AuthPage';
import PageNotFound from './pages/PageNotFound';
import PageNotAuthorized from './pages/PageNotAuthorized';
import HomePage from './pages/Home/HomePage';

import AppLayout from './ui/AppLayout';
import Instructor from './pages/Instructor/Instructor';
import ProtectedRoute from './ui/ProtectedRoute';

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
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="admin" element={<Navigate replace to="dashboard" />} />

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
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route path="instructor" element={<Instructor />} />
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
