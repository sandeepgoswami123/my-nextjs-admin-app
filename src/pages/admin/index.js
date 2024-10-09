import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      document.cookie = `token=${data.token}; path=/; max-age=3600`; // expires in 1 hour
      localStorage.setItem('token', data.token);
      router.push('/admin/dashboard');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logo} /> {/* Add your logo here */}
          <h1>Admin Portal</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2>Admin Login</h2>
          <input
            className={styles.input}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Admin Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}
