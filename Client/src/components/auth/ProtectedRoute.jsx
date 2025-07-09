import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // Render children if user is authenticated
    return children;
};

export default ProtectedRoute;
