'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { request } from '@/lib/api';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const data = await request('/auth/login', 'POST', { email, password });
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/gallery');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={false} />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.iconWrapper}>
                <img src="/logo.png" alt="Cloud Gallery Logo" />
              </div>
              <h1 className={styles.title}>Cloud Gallery</h1>
              <p className={styles.subtitle}>Secure Image Storage</p>
            </div>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>📧 Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>🔑 Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className={styles.input}
                />
              </div>
              
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? '⏳ Logging in...' : '✨ Login'}
              </button>
            </form>

            <div className={styles.divider}></div>

            <p className={styles.footer}>
              Don't have an account?{' '}
              <button
                className={styles.linkButton}
                onClick={() => router.push('/register')}
                disabled={loading}
              >
                Create one now →
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
