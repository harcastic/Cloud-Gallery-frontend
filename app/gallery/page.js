'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { request } from '@/lib/api';
import styles from './gallery.module.css';

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
      <Navbar user={user} onLogout={handleLogout} isAuthenticated={true} />
      
      <div className={styles.container}>
        {error && (
          <div className={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Upload View */}
        {view === 'upload' && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📤 Upload Your Image</h2>
            
            <form onSubmit={handleUpload}>
              <div className={styles.formGroup}>
                <label className={styles.label}>📸 Choose Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  disabled={loading}
                  accept="image/*"
                  className={styles.fileInput}
                />
              </div>
              
              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.uploadBtn}
                >
                  {loading ? '⏳ Uploading...' : '✓ Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => setView('gallery')}
                  disabled={loading}
                  className={styles.cancelBtn}
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
            <div className={styles.uploadSection}>
              <button
                onClick={() => setView('upload')}
                className={styles.uploadTriggerBtn}
                disabled={loading}
              >
                📤 Upload Image
              </button>
            </div>

            {images.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyStateIcon}>📸</span>
                <div className={styles.emptyStateTitle}>Your gallery is empty</div>
                <div className={styles.emptyStateDesc}>
                  Start by uploading your first image to build your collection
                </div>
                <button
                  onClick={() => setView('upload')}
                  className={styles.emptyStateBtn}
                  disabled={loading}
                >
                  🚀 Upload Your First Image
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {images.map((img) => (
                  <div
                    key={img._id}
                    className={styles.imageCard}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={img.url}
                        alt={img.filename || 'Gallery image'}
                        className={styles.image}
                        onClick={() => setSelectedImage(img.url)}
                      />
                    </div>
                    <div className={styles.cardFooter}>
                      <button
                        onClick={() => handleDelete(img._id)}
                        disabled={loading}
                        className={styles.deleteBtn}
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
            className={styles.modal}
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full screen image view"
              className={styles.fullImage}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
