import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="p-4 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
