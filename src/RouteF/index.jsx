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

    const PublicRoute = ({ children }) => {
      if (isAuthenticated()) {
        return <Navigate to="/" replace />;
      }
      return children;
    } 

  return (
    
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute><LoginPage /></PublicRoute>}
        />
        <Route
          path="/forgotpassword"
          element={<PublicRoute><ForgotPassword /></PublicRoute>}
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
