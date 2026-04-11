'use client';

import React from 'react';
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
        <div style={styles.logo}>
          <span style={styles.logoIcon}>📸</span>
          <span>Cloud Gallery</span>
        </div>
        <div style={styles.userSection}>
          {user && (
            <div style={styles.userInfo}>
              <span style={styles.userIcon}>👤</span>
              <span style={styles.userName}>{user.name}</span>
            </div>
          )}
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
    background: 'linear-gradient(135deg, rgba(238, 233, 221, 0.95) 0%, rgba(255, 250, 246, 0.95) 100%)',
    borderBottom: '2px solid #c87620',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(20px)',
    boxShadow: '0 10px 30px rgba(69, 55, 36, 0.1)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #c87620 0%, #93c193 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoIcon: {
    display: 'flex',
    fontSize: '1.8rem',
    WebkitTextFillColor: 'unset',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(147, 193, 147, 0.15)',
    borderRadius: '20px',
    border: '1px solid rgba(147, 193, 147, 0.3)',
    color: '#453724',
  },
  userIcon: {
    fontSize: '1.2rem',
  },
  userName: {
    fontSize: '0.95rem',
    color: '#453724',
  },
  logoutBtn: {
    background: 'linear-gradient(135deg, #c87620 0%, #a85f1a 100%)',
    padding: '10px 20px',
    fontSize: '0.9rem',
  },
};
