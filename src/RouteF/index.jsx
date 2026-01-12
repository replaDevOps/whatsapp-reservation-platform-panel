import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ForgotPassword, LoginPage } from '../pages';
import { Fallback } from './Fallback';
import Protected from './Protected.jsx';
const Entry = lazy(() => import('../pages/Sidebar/index.jsx'))

const RouteF = () => {
  const isAuthenticated = () => {
      return !!localStorage.getItem("accessToken");
    };
    useEffect(() => {
      const handleStorageChange = () => {
          if (!isAuthenticated()) {
              window.location.href = "/login"; 
          }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
          window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
  return (
    
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated() ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/forgotpassword"
          element={!isAuthenticated() ? <ForgotPassword /> : <Navigate to="/" replace />}
        />
        <Route
          path="/*"
          element={
            <Protected>
              <Suspense fallback={<Fallback />}>
                <Entry />
              </Suspense>
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} replace />} />
      </Routes>
  )
}

export default RouteF
