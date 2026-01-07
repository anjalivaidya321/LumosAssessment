# Deployment Guide for Render

This guide outlines the steps to deploy your **LumosAssessment** application to [Render](https://render.com/). The project consists of a **Node.js/Express Backend** and a **React (Vite) Frontend**.

## Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to a GitHub repository.
2.  **MongoDB Atlas**: You need a cloud MongoDB database.
    *   Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas/database).
    *   Get your connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.texample.mongodb.net/thread_system?retryWrites=true&w=majority`).
    *   **Allow Access**: In Atlas Network Access, allow access from anywhere (`0.0.0.0/0`) since Render IPs vary.

---

## Part 1: Deploying the Backend

1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `lumos-backend` (or similar)
    *   **Root Directory**: `Backend`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Environment Variables**:
    *   Scroll down to "Environment Variables" and add:
        *   `MONGODB_URI`: Paste your MongoDB Atlas connection string.
        *   `PORT`: `4000` (Optional, Render sets `PORT` automatically, but your code defaults to 4000).
6.  Click **Create Web Service**.
7.  Wait for the deployment to finish. Copy the **Service URL** (e.g., `https://lumos-backend.onrender.com`).

---

## Part 2: Deploying the Frontend

1.  On the Render Dashboard, click **New +** and select **Static Site**.
2.  Connect the same GitHub repository.
3.  Configure the site:
    *   **Name**: `lumos-frontend`
    *   **Root Directory**: `Frontend/thread-frontend`
    *   **Build Command**: `npm install && npm run build`
    *   **Publish Directory**: `dist`
4.  **Environment Variables**:
    *   Add a variable for the backend URL:
        *   Key: `VITE_API_BASE_URL`
        *   Value: `https://lumos-backend.onrender.com/api`  
            *(IMPORTANT: Paste your Backend Service URL from Part 1 and append `/api`)*
5.  **Redirect/Rewrite Rules** (Critical for React Router):
    *   Go to the **Redirects/Rewrites** tab (or "Advanced" settings during creation).
    *   Add a Rewrite Rule:
        *   **Source**: `/*`
        *   **Destination**: `/index.html`
        *   **Action**: `Rewrite`
6.  Click **Create Static Site**.

---

## Verification

1.  Visit your Frontend URL (e.g., `https://lumos-frontend.onrender.com`).
2.  Try creating a post to ensure it connects to the backend and saves to the database.

## Troubleshooting

*   **CORS Error**: If requests fail, ensure your Backend `server.js` uses `cors()`. (It is already configured!)
*   **MongoDB Error**: Check if your IP is whitelisted in MongoDB Atlas (use `0.0.0.0/0` to allow Render).
*   **Routes 404 on Refresh**: Ensure you added the "Rewrite" rule in Step 2.5.
