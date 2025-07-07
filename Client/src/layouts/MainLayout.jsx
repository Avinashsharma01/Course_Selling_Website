import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] p-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
