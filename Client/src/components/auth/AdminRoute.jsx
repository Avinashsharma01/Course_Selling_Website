import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/auth/admin/login" replace />;
    }

    // Redirect to dashboard if user is not an admin
    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    // Render children if user is an admin
    return children;
};

export default AdminRoute;
