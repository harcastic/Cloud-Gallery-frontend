'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { request } from '@/lib/api';
import styles from './register.module.css';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      await request('/auth/register', 'POST', { name, email, password });
      
      alert('Registration successful! Redirecting to login...');
      router.push('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
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
              <h1 className={styles.title}>Join Cloud Gallery</h1>
              <p className={styles.subtitle}>Create your secure account</p>
            </div>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <form onSubmit={handleRegister} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>👤 Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className={styles.input}
                />
              </div>
              
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
                <label className={styles.label}>🔑 Password (min 6 characters)</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className={styles.input}
                />
              </div>
              
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? '⏳ Creating account...' : '🚀 Create Account'}
              </button>
            </form>

            <div className={styles.divider}></div>

            <p className={styles.footer}>
              Already have an account?{' '}
              <button
                className={styles.linkButton}
                onClick={() => router.push('/login')}
                disabled={loading}
              >
                Login here →
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

