'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { request } from '@/lib/api';

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
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card} className="glass">
          <div style={styles.header}>
            <span style={styles.icon}>🔐</span>
            <h1 style={styles.title}>Cloud Gallery</h1>
            <p style={styles.subtitle}>Secure Image Storage</p>
          </div>
          
          {error && <div style={styles.error}>{error}</div>}
          
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📧 Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={styles.input}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>🔑 Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={styles.input}
              />
            </div>
            
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? '⏳ Logging in...' : '✨ Login'}
            </button>
          </form>

          <div style={styles.divider}></div>

          <p style={styles.footer}>
            Don't have an account?{' '}
            <button
              style={styles.linkButton}
              onClick={() => router.push('/register')}
              disabled={loading}
            >
              Create one now →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f6f5f0 0%, #faf9f6 50%, #eee9dd 100%)',
    padding: '2rem',
  },
  container: {
    width: '100%',
    maxWidth: '450px',
  },
  card: {
    padding: '3rem 2rem',
    animation: 'fadeIn 0.5s ease',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  icon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #c87620 0%, #93c193 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0.5rem 0',
  },
  subtitle: {
    color: '#6b5d47',
    fontSize: '0.95rem',
    marginTop: '0.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#453724',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    padding: '12px 16px !important',
    border: '2px solid #d4ccc0 !important',
    borderRadius: '8px',
    background: 'white !important',
    color: '#453724 !important',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    marginBottom: '0 !important',
  },
  error: {
    background: 'rgba(217, 119, 96, 0.1)',
    border: '1px solid rgba(217, 119, 96, 0.3)',
    color: '#a85f1a',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  submitBtn: {
    marginTop: '0.5rem',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #c87620 0%, #d98930 100%)',
    transition: 'all 0.3s ease',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #c87620, transparent)',
    margin: '2rem 0',
  },
  footer: {
    textAlign: 'center',
    color: '#6b5d47',
    fontSize: '0.95rem',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#c87620',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    padding: '0',
    transition: 'color 0.3s',
    textDecoration: 'none',
  },
};
