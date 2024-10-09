import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/Home.module.css';
const Contact = () => {
    return (
      <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Contact Page</h1>
        <p>This is the Contact Page.</p>
      </main>
      <Footer />
    </div>
    );
  };
  
  export default Contact;
  