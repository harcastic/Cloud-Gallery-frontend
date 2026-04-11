# Frontend Deployment Guide - Vercel

## Deployment Steps

### 1. **Prepare Your Frontend Repository**
- Ensure all code is pushed to your GitHub repository
- `.env.local` file is in `.gitignore` (✅ already configured)
- `vercel.json` is created for configuration (✅ already created)
- Update `src/api.js` to use environment variables (✅ already updated)

### 2. **Create a Vercel Account**
- Go to [vercel.com](https://vercel.com)
- Sign up and connect your GitHub account

### 3. **Deploy Frontend**

1. Click "Add New..." → "Project"
2. Import your frontend GitHub repository
3. Vercel will auto-detect it as a React app
4. Click "Deploy"

### 4. **Set Environment Variables in Vercel**

After deployment:

1. Go to Project Settings → Environment Variables
2. Add the following variable:
   ```
   REACT_APP_API_URL=https://<your-render-backend-url>.render.com/api
   ```
   
   Example: `https://cloud-image-gallery-backend.render.com/api`

3. Re-deploy the project for changes to take effect

### 5. **Verify Deployment**
- Visit your Vercel URL
- Test login and image upload functionality
- Check browser console for any API errors

## Local Development

For local development, use the `.env.local` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Make sure your backend is running on `localhost:5000`.

## Deployment Process Flow

```
Local Development
    ↓
    └─ Running backend on localhost:5000
    └─ Running frontend on localhost:3000
    └─ Using .env.local with REACT_APP_API_URL

GitHub Repositories (Two separate repos)
    ↓
Vercel (Frontend) ←→ Render (Backend)
```

---

## Environment Variables

### Development (`.env.local`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Production (Vercel - Set in Dashboard)
```
REACT_APP_API_URL=<your-render-backend-url>/api
```

**Note**: These are not in `.env` files pushed to GitHub; they're set in Vercel's dashboard.

---

## Important Notes

- **REACT_APP_** prefix is required for browser-accessible environment variables in React
- Vercel automatically rebuilds on push to connected GitHub branch
- Frontend will be available at `https://<project-name>.vercel.app`
- Update the backend CORS configuration if changing frontend URL
