import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import AdminLayout from './components/AdminLayout';

const ManageContact = () => {
  const [content, setContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add auth state
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // Set auth status
    }
  }, [router]); // Add router to dependencies

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch existing content only after authentication
      const fetchContent = async () => {
        const res = await fetch('/api/content/contact', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setContent(data.content || '');
      };

      fetchContent();
    }
  }, [isAuthenticated]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/content/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      alert('Content updated successfully');
    } else {
      alert('Failed to update content');
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything until authenticated
  }

  return (
    <AdminLayout>
      <h2>Manage Contact Page</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        cols="80"
      />
      <br />
      <button onClick={handleSave}>Save</button>
    </AdminLayout>
  );
};

export default ManageContact;
