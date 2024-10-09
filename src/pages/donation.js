import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/Home.module.css';
const Donation = () => {
    return (
      <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Donation Page</h1>
        <p>This is the Donation Page.</p>
      </main>
      <Footer />
    </div>
    );
  };
  
  export default Donation;
  