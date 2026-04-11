import './globals.css';

export const metadata = {
  title: 'Cloud Image Gallery',
  description: 'Upload and manage your images in the cloud',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
