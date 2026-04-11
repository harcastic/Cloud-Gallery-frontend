'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { request } from '@/lib/api';

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
    <div style={styles.container}>
      <div style={styles.card} className="glass">
        <h1>Cloud Gallery</h1>
        <h2>Register</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={styles.link}>
          Already have an account?{' '}
          <button
            style={styles.linkButton}
            onClick={() => router.push('/login')}
            disabled={loading}
          >
            Login here
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
