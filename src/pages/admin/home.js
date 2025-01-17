import AdminLayout from './components/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminPage.module.css'; // Updated CSS for responsiveness

export default function AdminPage() {
  const initialFormData = {
    heading: '',
    shortDesc: '',
    longDesc: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

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

    const response = await fetch('/api/homepage/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);

      // Reset form data to initial values
      setFormData(initialFormData);
    } else {
      const errorResult = await response.json();
      alert(`Error: ${errorResult.message}`);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ textAlign: 'center' }}>Add HomePage Content</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputWrapper}>
            <label>Heading:</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className={styles.inputField} // Adding class here
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
              className={styles.inputField} // Adding class here
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Long Description:</label>
            <textarea
              name="longDesc"
              value={formData.longDesc}
              onChange={handleChange}
              required
              className={styles.textAreaField} // Adding class here
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </AdminLayout>
  );
}
