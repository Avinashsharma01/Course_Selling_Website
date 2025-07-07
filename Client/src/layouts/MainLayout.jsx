import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="p-6 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
