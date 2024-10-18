import AdminLayout from './components/AdminLayout';
import { useState, useEffect } from 'react';
import styles from '../../styles/AdminHomeView.module.css';
import { useRouter } from 'next/router';

export default function ViewHomepage() {
  const [homepageData, setHomepageData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await fetch('/api/homepage/view');
        const data = await response.json();
        setHomepageData(data);
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      }
    };

    fetchHomepageData();
  }, []);

  const handleEdit = (id) => {
    // Redirect to edit page with the specific id
    router.push(`/admin/edit-homepage?id=${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/homepage/delete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove the deleted item from the state
          setHomepageData(homepageData.filter(item => item._id !== id));
        } else {
          console.error('Failed to delete the item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1 style={{ textAlign: 'center' }}>Homepage Content</h1>
        {homepageData.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Heading</th>
                <th>Short Description</th>
                <th>Long Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {homepageData.map((item) => (
                <tr key={item._id}>
                  <td>{item.heading}</td>
                  <td>{item.shortDesc}</td>
                  <td>{item.longDesc}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(item._id)} 
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)} 
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </AdminLayout>
  );
}
