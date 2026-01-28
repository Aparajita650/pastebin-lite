# Pastebin-Lite

A minimal Pastebin-like web application that allows users to create and share
text pastes with optional expiration time (TTL) and view-count limits.

---

## Features

- ✨ Create text pastes instantly
- 🔗 Generate shareable URLs
- ⏰ Optional time-based expiration
- 👁️ Optional maximum view limits
- 🎨 Modern, attractive UI with animations
- 📋 Copy-to-clipboard functionality
- 🔒 Safe paste rendering (no script execution)
- 📱 Fully responsive design
- ⚡ Lightning-fast with Upstash Redis

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Upstash Redis
- Styled JSX
- Vercel (deployment)

---

## Running the Project Locally

1. **Clone the repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Get your Redis credentials from [Upstash Console](https://console.upstash.com/)
   - Add your credentials:
     ```env
     UPSTASH_REDIS_REST_URL="your-redis-rest-url"
     UPSTASH_REDIS_REST_TOKEN="your-redis-rest-token"
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

---

## Deploying to Vercel (5 Minutes)

### Step 1: Get Redis Credentials (2 min)
1. Visit [Upstash Console](https://console.upstash.com/)
2. Create free account
3. Create a new Redis database
4. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### Step 1: Get Redis Credentials (2 min)
1. Visit [Upstash Console](https://console.upstash.com/)
2. Create free account
3. Create a new Redis database
4. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### Step 2: Push to GitHub (1 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel (2 min)
1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your repository
5. Add environment variables:
   - `UPSTASH_REDIS_REST_URL` = (your value from Step 1)
   - `UPSTASH_REDIS_REST_TOKEN` = (your value from Step 1)
6. Click **"Deploy"**
7. Done! 🎉

Your app will be live at: `https://your-project.vercel.app`

---

## API Endpoints

### Create Paste
```bash
POST /api/pastes
Content-Type: application/json

{
  "content": "Your paste content",
  "ttl_seconds": 3600,      // Optional: expires after 1 hour
  "max_views": 10           // Optional: expires after 10 views
}
```

### Get Paste (API)
```bash
GET /api/pastes/:id
```

### View Paste (Web)
```bash
GET /p/:id
```

### Health Check
```bash
GET /api/healthz
```

---

## Project Structure

```
app/
├── api/
│   ├── healthz/
│   │   └── route.js          # Health check endpoint
│   └── pastes/
│       ├── route.js           # Create paste endpoint
│       └── [id]/
│           └── route.js       # Get paste endpoint (with view tracking)
├── p/
│   └── [id]/
│       ├── page.js            # Server component for data fetching
│       └── PasteView.js       # Client component with UI
├── layout.js                  # Root layout with global styles
├── not-found.js               # 404 page
└── page.js                    # Home page (create paste)

lib/
├── redis.js                   # Redis client configuration
├── lua.js                     # Lua script for atomic view counting
└── time.js                    # Deterministic time support
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis authentication token | Yes |

---

## Continuous Deployment

After initial deployment, every time you push to GitHub:
1. Vercel automatically detects the changes
2. Builds your app
3. Deploys if build succeeds
4. Sends you a notification

**No manual redeployment needed!**

---

## Troubleshooting

### "Failed to save paste" error
- Check that environment variables are correctly set in Vercel
- Verify Upstash Redis credentials are valid
- Go to Vercel → Settings → Environment Variables

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Try running `npm run build` locally first

### 404 on all paste pages
- Verify Redis connection is working
- Check environment variables are set for production
- Try redeploying after updating env vars

---

## License

MIT
