# Cloud Gallery Frontend

A React-based frontend for the Cloud Image Gallery application. This provides:
- User authentication UI (register, login)
- Image gallery display
- Image upload functionality
- User profile display

## 🚀 Deployment

This frontend is deployed on **Vercel** as an independent service.

### Environment Variables (Required)

```env
REACT_APP_API_URL=https://your-render-backend-url.render.com/api
```

**Note**: This must be set in Vercel's Environment Variables dashboard (not in a committed .env file).

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Application runs on http://localhost:3000
```

For local development, create a `.env.local` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Deployment on Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import this GitHub repository
4. Vercel auto-detects it as a React app
5. In Project Settings → Environment Variables, add:
   - `REACT_APP_API_URL=<your-render-backend-url>/api`
6. Deploy

### Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── api.js              # API request helper
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   ├── components/
│   │   └── Navbar.js       # Navigation component
│   └── pages/
│       ├── Login.js        # Login page
│       ├── Register.js     # Registration page
│       └── Gallery.js      # Gallery page
├── package.json            # Dependencies
└── vercel.json            # Vercel configuration
```

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (⚠️ irreversible)
npm run eject
```

### Important Notes

- ** This is an independent service** - no dependencies on the backend folder
- `REACT_APP_*` prefix is required for environment variables to be accessible in the browser
- The `.env.local` file is only for local development - never commit it
- Never hardcode the backend URL in code - always use environment variables
- Vercel automatically handles SPA routing (rewrites to index.html)

### Features

✅ User registration and login
✅ JWT token-based authentication
✅ Image gallery display
✅ Image upload to cloud storage
✅ Image deletion
✅ User profile display
✅ Responsive design

---

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed Vercel deployment instructions.

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
