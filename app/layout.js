import './globals.css';

export const metadata = {
  title: 'Cloud Gallery',
  description: 'Upload and manage your images in the cloud',
  icons: {
    icon: { url: '/logo.png', sizes: 'any', type: 'image/png' },
    apple: { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
