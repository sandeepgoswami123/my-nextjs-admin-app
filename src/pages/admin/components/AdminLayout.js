import styles from '../../../styles/AdminLayout.module.css';
import Link from 'next/link';

const AdminLayout = ({ children, onLogout }) => {  // Accept onLogout as a prop
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <h1>Admin Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav>
            <ul>
            <li>
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/home">Manage Home</Link>
              </li>
              <li>
                <Link href="/admin/view-homepage">View Home</Link>
              </li>
              <li>
                <Link href="/admin/edit-homepage">Edit Home</Link>
              </li>
              <li>
                <Link href="/admin/contact">Manage Contact</Link>
              </li>
              <li>
                <Link href="/admin/donation">Manage Donation</Link>
              </li>
              <li>
                {/* Styled like a link */}
                <a onClick={onLogout} className={styles.link}>Logout</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className={styles.content}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
