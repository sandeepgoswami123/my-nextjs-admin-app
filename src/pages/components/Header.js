// components/Header.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu in mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
     <div className={styles.logo}>
    <img src="/logo.png" alt="YourLogo" className={styles.logoImage} /> {/* Replace with your logo path */}
    </div>

      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </button>
      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/donation">Donate</Link>
      </nav>
    </header>
  );
};

export default Header;
