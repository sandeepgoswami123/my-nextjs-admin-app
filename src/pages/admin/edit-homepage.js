import AdminLayout from './components/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminHomeView.module.css';

export default function EditHomepage() {
  const [formData, setFormData] = useState({
    heading: '',
    shortDesc: '',
    longDesc: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { id } = router.query; // Get the id from query parameters

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
         const response = await fetch(`/api/homepage/get/${id}`);

          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          
          const data = await response.json();

          // Check if the data is valid
          if (data) {
            setFormData({
              heading: data.heading,
              shortDesc: data.shortDesc,
              longDesc: data.longDesc,
            });
          } else {
            alert('No data found for this ID');
          }
        } catch (error) {
          console.error('Error fetching homepage content:', error);
          alert('Error fetching data');
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/homepage/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const result = await response.json();
      alert(result.message);
      router.push('/admin/view-homepage'); // Redirect to view page after update
    } catch (error) {
      console.error('Error updating homepage content:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ textAlign: 'center' }}>Edit HomePage Content</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputWrapper}>
            <label>Heading:</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Short Description:</label>
            <input
              type="text"
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Long Description:</label>
            <textarea
              name="longDesc"
              value={formData.longDesc}
              onChange={handleChange}
              required
              className={styles.textAreaField}
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Update</button>
        </form>
      </div>
    </AdminLayout>
  );
}
