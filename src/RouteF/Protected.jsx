import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.clear();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default Protected;