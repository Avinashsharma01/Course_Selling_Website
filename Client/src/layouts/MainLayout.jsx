import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            {/* Show Navbar on all pages */}
            <Navbar />

            {/* Toast Notifications */}
            <Toast />

            {/* Page Content */}
            <main className="flex-grow px-4 pt-16 md:pt-20">
                <Outlet />
            </main>

            {/* Show Footer on all pages */}
            <Footer />
        </div>
    );
};

export default MainLayout;
