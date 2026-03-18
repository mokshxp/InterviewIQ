# 🚀 Skilio Deployment Guide: Step-by-Step

This guide will walk you through deploying your **Skilio AI Interview Coach** from scratch. Don't worry, even if this is your first time, these steps will make it simple and safe!

---

## 🛠 Phase 1: Push Your Code to GitHub
Your code needs to be on GitHub so that Vercel (for frontend) and Render (for backend) can "read" it and build your website.

1.  **Open your terminal** in the root `skilio` folder.
2.  **Run these commands** one by one:
    ```powershell
    git add .
    git commit -m "chore: prepare for first deployment"
    git push origin main
    ```

---

## 🧠 Phase 2: Deploy the Backend (Render)
The backend is the "brain" of your app. It handles AI logic, database connections, and WebSockets.

1.  **Go to [dashboard.render.com](https://dashboard.render.com)** and log in with GitHub.
2.  **Click "New" → "Web Service"**.
3.  **Connect your GitHub Repository** (`Skilio-AI-Interview-Coach`).
4.  **Configure the Service**:
    *   **Name**: `skilio-backend`
    *   **Environment**: `Node`
    *   **Root Directory**: `backend`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Add Environment Variables**:
    *   Click **"Advanced"** → **"Add Environment Variable"**.
    *   Copy **every key** from your [backend/.env](file:///d:/skilio/backend/.env) file. You will need:
        *   `DATABASE_URL` (From Supabase)
        *   `CLERK_SECRET_KEY` (From Clerk)
        *   `OPENAI_API_KEY` (Your AI key)
        *   `PORT` (Set to `10000`)
6.  **Click "Create Web Service"**.
    *   *Wait for the console to say "Server running".*
    *   **Important**: Copy the URL Render gives you (e.g., `https://skilio-backend.onrender.com`).

---

## 🎨 Phase 3: Deploy the Frontend (Vercel)
The frontend is the "face" of your app that users actually see.

1.  **Go to [vercel.com](https://vercel.com)** and log in with GitHub.
2.  **Click "Add New" → "Project"**.
3.  **Import your `skilio` repo**.
4.  **Override Settings** (Vercel usually detects this, but double-check):
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: `./` (Leave as default)
    *   **Output Directory**: `frontend/dist`
    *   **Build Command**: `npm run build`
5.  **Add Environment Variables**:
    *   `VITE_API_URL`: **Paste the Backend URL you copied from Render here.**
    *   `VITE_CLERK_PUBLISHABLE_KEY`: (From your Clerk dashboard).
6.  **Click "Deploy"**.

---

## 🚀 What Happens Next?
*   **Live Link**: Vercel will give you a domain (e.g., `skilio.vercel.app`).
*   **Updates**: From now on, whenever you want to update the site, just do another **Git Push**. The site will update automatically in ~2 minutes!
*   **No Risk**: If something breaks, the old version stays live until the new one is fixed. It's safe!

---

**Good luck! You're about to put your first project on the internet!** 🎊
