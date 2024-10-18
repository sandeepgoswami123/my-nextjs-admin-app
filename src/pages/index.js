import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        // Fetch the data from the API
        const response = await fetch('/api/homepage/get', {
          signal: controller.signal
        });

        clearTimeout(timeoutId); // Clear the timeout once the request is successful

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result); // Set the data
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data'); // Set error state
      } finally {
        setLoading(false); // Stop loading once the request is done
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once, when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {data.map((item) => (
          <div key={item._id}>
            <h2>{item.heading}</h2>
            <p>{item.shortDesc}</p>
            <div>{item.longDesc}</div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
