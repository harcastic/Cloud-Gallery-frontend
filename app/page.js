'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import styles from './landing.module.css';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      setIsLoggedIn(true);
      router.push('/gallery');
    }
  }, [router]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Header/Navbar */}
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Cloud Image Gallery</h1>
          <p className={styles.heroSubtitle}>
            Store, organize, and share your precious moments in the cloud. Secure, reliable, and beautifully simple.
          </p>
          <div className={styles.heroCTA}>
            <Link href="/register" className={styles.ctaPrimary}>
              Start Free Today
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              Already have an account? Sign In →
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image 
            src="/landingPic.png" 
            alt="Cloud Gallery Illustration" 
            width={500} 
            height={400}
            priority
            className={styles.heroImageImg}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Creators Choose Cloud Gallery</h2>
        <p className={styles.featureSubtitle}>Store, organize, and access your memories with confidence</p>
        
        {/* Main Feature Cards */}
        <div className={styles.mainFeatureGrid}>
          {/* Feature 1: Security */}
          <div className={styles.mainFeatureCard}>
            <div className={styles.featureImageWrapper}>
              <Image 
                src="/cloud-security.png" 
                alt="Enterprise-grade Security" 
                width={350} 
                height={300}
                className={styles.featureImage}
              />
            </div>
            <div className={styles.featureContent}>
              <h3>Safe & Secure</h3>
              <p>We keep your memories secure and always available whenever you need them.</p>
              <ul className={styles.featureList}>
                <li>🔐 Secure encryption</li>
                <li>🛡️ 99.99% uptime guarantee</li>
                <li>🔒 Privacy-focused</li>
              </ul>
            </div>
          </div>

          {/* Feature 2: User Experience */}
          <div className={styles.mainFeatureCard}>
            <div className={styles.featureImageWrapper}>
              <Image 
                src="/cg-user.png" 
                alt="Intuitive User Experience" 
                width={350} 
                height={300}
                className={styles.featureImage}
              />
            </div>
            <div className={styles.featureContent}>
              <h3>Intuitive & Beautiful Interface</h3>
              <p>Designed for simplicity. Upload, organize, and share your photos in seconds. No learning curve, just pure ease of use.</p>
              <ul className={styles.featureList}>
                <li>📱 Works on all devices</li>
                <li>⚡ Lightning-fast uploads</li>
                <li>🎨 Stunning gallery view</li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Ecosystem */}
          <div className={styles.mainFeatureCard}>
            <div className={styles.featureImageWrapper}>
              <Image 
                src="/cloud-gallery-ecosystem.png" 
                alt="Smart Ecosystem" 
                width={350} 
                height={300}
                className={styles.featureImage}
              />
            </div>
            <div className={styles.featureContent}>
              <h3>Complete Ecosystem</h3>
              <p>Everything you need in one place. Automatic backups, smart organization, and seamless sharing. Your digital life, simplified.</p>
              <ul className={styles.featureList}>
                <li>📦 Auto-backup from devices</li>
                <li>🔍 Smart search & tagging</li>
                <li>👥 Easy sharing controls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Benefits */}
        <div className={styles.quickBenefits}>
          <h3>What Users Love</h3>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <span className={styles.benefitNumber}>1</span>
              <h4>Store Unlimited</h4>
              <p>Generous free tier to get you started</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitNumber}>2</span>
              <h4>Access Anywhere</h4>
              <p>Your photos, always at your fingertips</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitNumber}>3</span>
              <h4>Share Easily</h4>
              <p>Control who sees what with smart permissions</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitNumber}>4</span>
              <h4>Never Lose Data</h4>
              <p>Redundant backups across multiple regions</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>About Cloud Gallery</h2>
          <p className={styles.aboutText}>
            Cloud Gallery is a modern, secure cloud storage solution designed specifically for photographers, 
            creators, and anyone who values their digital memories. Built with cutting-edge technology and powered by Azure, 
            we provide a reliable platform to store, organize, and access your images from anywhere in the world.
          </p>
          <p className={styles.aboutText}>
            Our mission is to make cloud storage simple, secure, and accessible to everyone. Whether you're a professional 
            photographer or someone who just wants to keep their memories safe, Cloud Gallery is the perfect solution.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users storing their precious moments in the cloud securely.</p>
        <Link href="/register" className={styles.ctaPrimary}>
          Create Your Free Account Now
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Cloud Gallery</h4>
            <p>Secure cloud image storage for everyone.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link href="/login">Sign In</Link>
          </div>
          <div className={styles.footerSection}>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Cloud Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
