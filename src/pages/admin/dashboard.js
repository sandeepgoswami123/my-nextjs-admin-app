// pages/admin/dashboard.js

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
  const handleLogout = async () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/admin');
  };

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <h2>Welcome to the Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </AdminLayout>
  );
};

export default Dashboard;
