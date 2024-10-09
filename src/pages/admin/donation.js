// pages/admin/donation.js

import { useEffect, useState } from 'react';
import AdminLayout from './components/AdminLayout';

const ManageDonation = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch existing content
    const fetchContent = async () => {
      const res = await fetch('/api/content/donation');
      const data = await res.json();
      setContent(data.content || '');
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    // Save updated content
    const token = localStorage.getItem('token');
    const res = await fetch('/api/content/donation', {
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

  return (
    <AdminLayout>
      <h2>Manage Donation Page</h2>
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

export default ManageDonation;
