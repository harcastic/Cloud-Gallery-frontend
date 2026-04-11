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
    <div style={styles.container}>
      <div style={styles.card} className="glass">
        <h1>Cloud Gallery</h1>
        <h2>Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.link}>
          Don't have an account?{' '}
          <button
            style={styles.linkButton}
            onClick={() => router.push('/register')}
            disabled={loading}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  card: {
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  error: {
    color: '#d32f2f',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    borderRadius: '5px',
  },
  link: {
    marginTop: '20px',
    fontSize: '0.9rem',
  },
  linkButton: {
    background: 'none',
    color: '#667eea',
    padding: '0',
    textDecoration: 'underline',
    cursor: 'pointer',
    border: 'none',
    fontSize: '0.9rem',
  },
};
