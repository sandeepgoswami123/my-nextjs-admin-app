import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from './components/AdminLayout';

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/admin');
  };

  if (!isAuthenticated) return null; // Render nothing until authenticated

  return (
    <AdminLayout onLogout={handleLogout}> {/* Pass handleLogout as prop */}
      <h2>Welcome to the Admin Dashboard</h2>
    </AdminLayout>
  );
};

export default Dashboard;
