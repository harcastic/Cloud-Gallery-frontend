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
  const [filter, setFilter] = useState('all');

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

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit');
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
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Upload View */}
        {view === 'upload' && (
          <div style={styles.card} className="glass">
            <h2 style={{
              color: '#453724',
              marginBottom: '1.5rem',
              fontSize: '1.8rem',
              background: 'linear-gradient(135deg, #c87620 0%, #93c193 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              📤 Upload Your Image
            </h2>
            
            <form onSubmit={handleUpload}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#453724',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}>
                  📸 Choose Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  disabled={loading}
                  accept="image/*,video/*"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid rgba(200, 118, 32, 0.3)',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#453724',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b5d47' }}>
                  Maximum file size: 5MB
                </div>
              </div>
              
              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{...styles.uploadBtn, flex: 1}}
                  className="button"
                >
                  {loading ? '⏳ Uploading...' : '✓ Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => setView('gallery')}
                  disabled={loading}
                  style={{...styles.cancelBtn, flex: 1}}
                  className="button"
                >
                  ✕ Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery View */}
        {view === 'gallery' && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <button
                onClick={() => setView('upload')}
                style={styles.uploadBtn}
                disabled={loading}
                className="button"
              >
                📤 Upload Image/Video
              </button>
            </div>

            {images.length > 0 && (
              <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setFilter('all')}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === 'all' ? styles.filterBtnActive : {}),
                  }}
                  className="button"
                >
                  📁 All
                </button>
                <button
                  onClick={() => setFilter('image')}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === 'image' ? styles.filterBtnActive : {}),
                  }}
                  className="button"
                >
                  🖼️ Images
                </button>
                <button
                  onClick={() => setFilter('video')}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === 'video' ? styles.filterBtnActive : {}),
                  }}
                  className="button"
                >
                  🎬 Videos
                </button>
              </div>
            )}

            {images.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: '#453724' }}>
                  Your gallery is empty
                </div>
                <div style={{ fontSize: '0.95rem', color: '#6b5d47' }}>
                  Start by uploading your first image to build your collection
                </div>
              </div>
            ) : (
              <div style={styles.grid}>
                {images
                  .filter((img) => filter === 'all' || img.fileType === filter)
                  .map((img) => (
                  <div
                    key={img._id}
                    style={{
                      ...styles.imageCard,
                      background: 'linear-gradient(135deg, rgba(147, 193, 147, 0.1) 0%, rgba(200, 118, 32, 0.1) 100%)',
                      border: '1px solid rgba(200, 118, 32, 0.2)',
                    }}
                    className="glass"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(200, 118, 32, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {img.fileType === 'video' ? (
                      <video
                        src={img.url}
                        style={{
                          ...styles.image,
                          borderRadius: '12px 12px 0 0',
                        }}
                        controls
                      />
                    ) : (
                      <img
                        src={img.url}
                        alt={img.filename || 'Gallery image'}
                        style={{
                          ...styles.image,
                          borderRadius: '12px 12px 0 0',
                        }}
                        onClick={() => setSelectedImage(img.url)}
                      />
                    )}
                    <div style={styles.cardFooter}>
                      <button
                        onClick={() => handleDelete(img._id)}
                        disabled={loading}
                        style={styles.deleteBtn}
                        className="button"
                      >
                        🗑️ Delete
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
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: 'calc(100vh - 80px)',
  },
  card: {
    padding: '2.5rem',
    marginBottom: '2rem',
    maxWidth: '600px',
  },
  error: {
    background: 'rgba(217, 119, 96, 0.15)',
    border: '1px solid rgba(217, 119, 96, 0.3)',
    color: '#a85f1a',
    padding: '1rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  uploadBtn: {
    marginBottom: '2rem',
    padding: '12px 24px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #c87620 0%, #d98930 100%)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  cancelBtn: {
    background: 'linear-gradient(135deg, #999 0%, #777 100%)',
    flex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  imageCard: {
    overflow: 'hidden',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  cardFooter: {
    padding: '1rem',
    background: 'rgba(238, 233, 221, 0.9)',
  },
  deleteBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #d97760 0%, #c87620 100%)',
    padding: '6px 12px',
    fontSize: '0.85rem',
  },
  filterBtn: {
    padding: '8px 16px',
    fontSize: '0.95rem',
    fontWeight: '600',
    background: 'linear-gradient(135deg, rgba(200, 118, 32, 0.2) 0%, rgba(147, 193, 147, 0.2) 100%)',
    color: '#453724',
    border: '2px solid rgba(200, 118, 32, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #c87620 0%, #93c193 100%)',
    color: 'white',
    border: '2px solid rgba(200, 118, 32, 0.8)',
    boxShadow: '0 4px 12px rgba(200, 118, 32, 0.2)',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(69, 55, 36, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  },
  fullImage: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    objectFit: 'contain',
    animation: 'fadeIn 0.3s ease',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6b5d47',
    fontSize: '1.1rem',
  },
};
