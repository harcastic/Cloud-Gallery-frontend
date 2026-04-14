'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

export default function Navbar({ user, onLogout, isAuthenticated = false }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            src="/logo.png" 
            alt="Cloud Gallery Logo" 
            width={60} 
            height={60}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>Cloud Gallery</span>
        </Link>
        
        <nav className={styles.nav}>
          {!isAuthenticated && (
            <>
              <a href="/#features" className={styles.navLink}>Features</a>
              <a href="/#about" className={styles.navLink}>About</a>
            </>
          )}
        </nav>

        <div className={styles.navButtons}>
          {isAuthenticated && user ? (
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <span className={styles.userIcon}>👤</span>
                <span className={styles.userName}>{user.name || user.email}</span>
              </div>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Sign In</Link>
              <Link href="/register" className={styles.signupBtn}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
