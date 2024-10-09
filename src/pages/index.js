// pages/index.js
import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Welcome to Our Website</h1>
        <p>This is the Home Page.</p>
      </main>
      <Footer />
    </div>
  );
}
