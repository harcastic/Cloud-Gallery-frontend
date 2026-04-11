'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { request } from '@/lib/api';

export default function Gallery() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [view, setView] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [token, router]);

  const fetchData = async () => {
    try {
      const [imagesData, userData] = await Promise.all([
        request('/images', 'GET', null, false, token),
        request('/auth/profile', 'GET', null, false, token),
      ]);
      setImages(imagesData);
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!file) {
        throw new Error('Please select a file');
      }

      const formData = new FormData();
      formData.append('file', file);

      await request('/images', 'POST', formData, true, token);
      
      setFile(null);
      setView('gallery');
      await fetchData();
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      setLoading(true);
      await request(`/images/${id}`, 'DELETE', null, false, token);
      await fetchData();
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      
      <div style={styles.container}>
        {error && <div style={styles.error}>{error}</div>}

        {/* Upload View */}
        {view === 'upload' && (
          <div style={styles.card} className="glass">
            <h2>Upload Image</h2>
            
            <form onSubmit={handleUpload}>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                disabled={loading}
                accept="image/*"
              />
              
              <div style={styles.buttonGroup}>
                <button type="submit" disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => setView('gallery')}
                  disabled={loading}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery View */}
        {view === 'gallery' && (
          <>
            <button
              onClick={() => setView('upload')}
              style={styles.uploadBtn}
              disabled={loading}
            >
              + Upload Image
            </button>

            {images.length === 0 ? (
              <div style={styles.emptyState}>
                <p>No images yet. Start by uploading one!</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {images.map((img) => (
                  <div key={img._id} style={styles.imageCard} className="glass">
                    <img
                      src={img.url}
                      alt={img.filename || 'Gallery image'}
                      style={styles.image}
                      onClick={() => setSelectedImage(img.url)}
                    />
                    <div style={styles.cardFooter}>
                      <button
                        onClick={() => handleDelete(img._id)}
                        disabled={loading}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Full Screen View */}
        {selectedImage && (
          <div
            style={styles.modal}
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full screen image view"
              style={styles.fullImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  card: {
    padding: '2rem',
    marginBottom: '2rem',
    maxWidth: '500px',
  },
  error: {
    color: '#d32f2f',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    borderRadius: '5px',
    textAlign: 'center',
  },
  uploadBtn: {
    marginBottom: '2rem',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  cancelBtn: {
    background: '#999',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  imageCard: {
    overflow: 'hidden',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  cardFooter: {
    padding: '0.5rem',
  },
  deleteBtn: {
    width: '100%',
    background: '#d32f2f',
    padding: '8px',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    cursor: 'pointer',
  },
  fullImage: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    objectFit: 'contain',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: 'white',
    fontSize: '1.1rem',
  },
};
