import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Show Navbar only on home */}
      {isHomePage && <Navbar />}

      {/* Page Content */}
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      {/* Show Footer only on home */}
      {isHomePage && <Footer />}
    </div>
  );
};

export default MainLayout;