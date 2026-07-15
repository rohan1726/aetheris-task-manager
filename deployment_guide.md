# Task Manager Deployment Guide

This guide describes how to deploy your Task Manager application: the **Frontend** to Netlify and the **Backend** to Railway.

---

## Prerequisites

1. A **GitHub** account.
2. A **Netlify** account (linked to GitHub).
3. A **Railway** account (linked to GitHub).
4. A **MongoDB Atlas** database connection string (free tier is perfect).

---

## Step 1: Upload Project to GitHub

Since we initialized Git and committed your local files, you just need to create a repository on GitHub and push the code:

1. Go to [GitHub](https://github.com) and create a new **public or private repository** named `aetheris-task-manager`. Do **not** initialize it with a README, gitignore, or license.
2. Open your terminal in the project directory (`c:\Users\bhalk\Downloads\aetheris-task-manager\aetheris-task-manager`) and run:
   ```bash
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Railway

1. Log in to [Railway](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your `aetheris-task-manager` repository.
4. Click **Variables** on the newly created service and add the following:
   - `PORT` = `5000`
   - `MONGO_URI` = `<your-mongodb-atlas-uri>`
   - `JWT_SECRET` = `choose_a_long_random_string`
   - `JWT_EXPIRES_IN` = `7d`
   - `CLIENT_URL` = `https://<your-netlify-app-name>.netlify.app` *(You can update this after Step 3)*
5. Click **Settings** and scroll down to the **Root Directory** field. Set it to `server`.
6. Click **Deploy**.
7. Railway will generate a public URL for your backend (e.g., `https://web-production-xxx.up.railway.app`). Copy this URL.

---

## Step 3: Deploy Frontend to Netlify

1. Log in to [Netlify](https://www.netlify.com).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify to access your repository.
4. Select `aetheris-task-manager`.
5. Configure the Build settings:
   - **Root directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist` (Vite output folder)
6. Add the following **Environment Variable** under the "Environment variables" section:
   - `VITE_API_URL` = `https://web-production-xxx.up.railway.app/api` *(Paste your Railway backend URL followed by `/api`)*
7. Click **Deploy site**.
8. Once Netlify finishes building, it will give you a public URL (e.g., `https://beautiful-app-12345.netlify.app`).

---

## Step 4: Finish CORS Setup
1. Go back to your **Railway** dashboard.
2. Open the backend service variables.
3. Update the `CLIENT_URL` variable to your new Netlify URL (e.g., `https://beautiful-app-12345.netlify.app`).
4. Railway will automatically redeploy the backend.

**Your full-stack application is now successfully deployed and live!**
