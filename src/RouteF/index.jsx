import { Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Sidebar } from '../pages/Sidebar';
import { ForgotPassword, LoginPage } from '../pages';
import { Fallback } from './Fallback';

const isLoggedIn = () => !!localStorage.getItem('email')

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  if (!isLoggedIn()) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  return children
}

const RouteF = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Protected */}
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
              <LoginPage />
          }
        />
        <Route
          path='/forgotpassword'
          element={
              <ForgotPassword />
          }
        />

        {/* Fallback */}
        <Route
          path='*'
          element={isLoggedIn() ? <Navigate to='/' replace /> : <Navigate to='/login' replace />}
        />
      </Routes>
    </Suspense>
  )
}

export default RouteF
