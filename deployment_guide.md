# 🚂 Railway Deployment Guide: Skilio

This guide explains how to deploy your **Skilio AI Interview Coach** on [Railway](https://railway.app/). We will create two services: one for the backend and one for the frontend.

---

## 🛠 Phase 1: Push Your Code to GitHub
Your code must be on GitHub so Railway can pull it.

1.  **Terminal Check**: Run these in the `skilio` root folder:
    ```powershell
    git add .
    git commit -m "chore: railway deployment setup"
    git push origin main
    ```

---

## 🧠 Phase 2: Deploy the Backend
1.  **Railway Dashboard**: Click **"New"** → **"GitHub Repo"**.
2.  **Select your repo**.
3.  **Choose "Manual"** setup when prompted (or just wait for it to create).
4.  **Service Settings**:
    *   **Name**: `skilio-backend`
    *   **Root Directory**: `backend`
    *   **Watch Patterns**: `/backend`
5.  **Variables**: Add ALL values from your [backend/.env](file:///d:/skilio/backend/.env):
    *   `DATABASE_URL`
    *   `CLERK_SECRET_KEY`
    *   `NVIDIA_API_KEY`
    *   `SUPABASE_URL`
    *   `SUPABASE_SERVICE_ROLE_KEY`
    *   `PORT`: `8000`
6.  **Railway Link**: Railway will give you a domain (e.g., `skilio-production.up.railway.app`). **Copy it.**

---

## 🎨 Phase 3: Deploy the Frontend
1.  **Railway Dashboard**: Go back to your project and click **"New"** → **"GitHub Repo"**.
2.  **Select the SAME repo**.
3.  **Service Settings**:
    *   **Name**: `skilio-frontend`
    *   **Root Directory**: `./` (Root)
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npx serve -s dist`
4.  **Variables**:
    *   `VITE_API_URL`: **Paste the Backend Domain from Step 2 here.**
    *   `VITE_CLERK_PUBLISHABLE_KEY`: (From your frontend dashboard).
5.  **Install `serve`**: Since Vite produces static files, we need a small server to host them. I'll add `serve` to your package.json dependencies now.

---

## 🚀 Troubleshooting
*   If the frontend doesn't load, check the **Variables** to ensure the backend URL includes `https://`.
*   Railway automatically handles SSL, so your links will be secure by default.

---

**Good luck on the tracks!** 🚂💨
