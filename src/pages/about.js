import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/Home.module.css';
const About = () => {
  return (
    <div className={styles.container}>
    <Header />
    <main className={styles.main}>
      <h1>About Page</h1>
      <p>This is the About Page.</p>
    </main>
    <Footer />
  </div>
  );
  };
  
  export default About;
  