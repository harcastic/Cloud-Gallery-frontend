# Cloud Gallery Frontend - Next.js

A modern Next.js-based frontend for the Cloud Image Gallery application. This provides:
- User authentication UI (register, login)
- Image gallery display
- Image upload functionality
- User profile display
- Server-side rendering and optimization

## 🚀 Deployment

This frontend is deployed on **Vercel** as an independent service.

### Features

✅ User registration and login
✅ JWT token-based authentication
✅ Image gallery display with infinite scroll capability
✅ Image upload to cloud storage
✅ Image deletion
✅ User profile display
✅ Responsive design with CSS Grid
✅ Server-side rendering (SSR)
✅ Optimized performance

### Environment Variables (Required)

For production deployment on Vercel, set:
```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.render.com/api
```

**Note**: This must be set in Vercel's Environment Variables dashboard.

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application runs on http://localhost:3000
```

For local development, create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Deployment on Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import this GitHub repository
4. Vercel auto-detects it as a Next.js app
5. In Project Settings → Environment Variables, add:
   - `NEXT_PUBLIC_API_URL=<your-render-backend-url>/api`
6. Deploy

### Project Structure

```
app/
├── layout.js              # Root layout and metadata
├── globals.css            # Global styles
├── page.js                # Root page (redirects to login/gallery)
├── login/
│   └── page.js           # Login page
├── register/
│   └── page.js           # Registration page
├── gallery/
│   └── page.js           # Gallery page (main app)
└── components/
    └── Navbar.js         # Navigation component

lib/
└── api.js                # API request helper with axios

jsconfig.json             # Path aliases configuration
next.config.js            # Next.js configuration
vercel.json              # Vercel deployment config
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Important Notes

- **This is an independent service** - no dependencies on the backend folder
- `NEXT_PUBLIC_` prefix is required for environment variables to be accessible in the browser
- The `.env.local` file is only for local development - never commit it
- Never hardcode the backend URL in code - always use environment variables
- Next.js automatically handles routing and optimization
- Uses `'use client'` directive for client-side components where needed

### Technologies Used

- **Next.js 14**: React framework with SSR and SSG
- **React 18**: UI components
- **Axios**: HTTP client for API requests
- **CSS**: Inline styles with glass-morphism design

### API Integration

The frontend communicates with the backend via REST API:

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (returns JWT token)
- `GET /api/auth/profile` - Get user profile (requires JWT token)

#### Images
- `GET /api/images` - Get all images
- `POST /api/images` - Upload image (requires JWT token)
- `DELETE /api/images/:id` - Delete image (requires JWT token)

---

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed Vercel deployment instructions.
