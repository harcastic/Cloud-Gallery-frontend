'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar({ user, onLogout }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    router.push('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Cloud Gallery</h1>
        <div style={styles.userSection}>
          {user && <span style={styles.userName}>Welcome, {user.name}!</span>}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userName: {
    fontSize: '0.9rem',
  },
  logoutBtn: {
    background: '#d32f2f',
    padding: '8px 16px',
    fontSize: '0.9rem',
  },
};
