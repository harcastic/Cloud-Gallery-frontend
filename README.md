# Cloud Gallery Frontend - Next.js Edition

A modern Next.js-based frontend for the Cloud Image Gallery application. This provides:
- User authentication UI (register, login)
- Image gallery display
- Image upload functionality
- User profile display
- Server-side rendering and optimization

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application runs on http://localhost:3000
```

### Environment Setup

Create `.env.local` for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Deployment on Vercel

1. Push to GitHub
2. Import project on Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=<your-backend-url>`
4. Deploy!

## 📁 Project Structure

```
app/
├── login/                 # Login page
├── register/              # Registration page
├── gallery/               # Main gallery page
├── components/Navbar.js   # Navigation
└── layout.js             # Root layout

lib/
└── api.js                # API client

Configuration
├── package.json          # Dependencies (Next.js)
├── next.config.js        # Next.js config
├── jsconfig.json         # Path aliases  
└── vercel.json          # Vercel config
```

## ✨ Features

✅ **User Authentication** - Register, login, logout with JWT
✅ **Image Management** - Upload, view, delete images
✅ **User Profile** - Display user information
✅ **Responsive Design** - Works on desktop and mobile
✅ **Cloud Storage** - Images stored in Azure Blob Storage
✅ **Fast Performance** - Next.js SSR and optimization
✅ **Modern Stack** - React 18, Next.js 14, Axios

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## 📊 Tech Stack

- **Next.js 14** - React framework with SSR
- **React 18** - UI components
- **Axios** - HTTP requests
- **CSS** - Inline styles with glass-morphism design

## 🌐 Deployment

**Platform:** Vercel  
**Build Command:** `npm run build`  
**Output Directory:** `.next`  
**Environment Variable:** `NEXT_PUBLIC_API_URL`

### For Vercel Dashboard

1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL=https://your-backend.render.com/api`
3. Redeploy

## 📝 Important Notes

- This is a **completely independent** Next.js application
- Backend URL must be set in Vercel environment variables
- `.env.local` is for local development only (ignored by git)
- Never commit `.env` files with secrets

## 📚 Additional Documentation

- [README_NEXTJS.md](README_NEXTJS.md) - Detailed Next.js documentation
- [INDEPENDENCE_CHECKLIST_NEXTJS.md](INDEPENDENCE_CHECKLIST_NEXTJS.md) - Independence verification
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed deployment guide

## 🤝 API Endpoints

The frontend connects to these backend endpoints:

**Auth:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile

**Images:**
- `GET /images` - List all images
- `POST /images` - Upload image
- `DELETE /images/:id` - Delete image

---

**Deployed on:** [Vercel](https://vercel.com)  
**Backend:** [Render](https://render.com)  
**Database:** MongoDB Atlas  
**Storage:** Azure Blob Storage

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
