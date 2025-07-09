import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";

const Profile = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated and not loading
    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/auth/login");
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Show the appropriate profile based on user role
    return user.isAdmin ? <AdminProfile /> : <UserProfile />;
};

export default Profile;
