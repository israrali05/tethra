# Tethra Banking & Multi-Currency Yield Platform

A full-stack banking, multi-currency wallet, and 2.0% 24-hour compound yield application built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Express REST API**.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (Frontend + Backend on Port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
npm run build
```

This compiles the static assets into `dist/` and bundles the standalone Node.js server into `dist/server.cjs`.

---

## 🌐 Deploy Directly to Netlify

This project is pre-configured for 1-click Netlify deployment with `netlify.toml` and `public/_redirects`:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Complete Tethra Banking Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site"** > **"Import an existing project"**
   - Connect your GitHub repository
   - Netlify will auto-detect the configuration:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click **"Deploy site"**!

---

## 🔑 Features & Architecture
- **Multi-Currency Ledger**: Instant exchange and balances across USD, EUR, GBP, USDT (TRC-20 / ERC-20), and Bitcoin (BEP-20 / On-chain).
- **2.0% 24h Yield Engine**: Automated compounding staking mechanism for USDT Tether deposits.
- **Admin Management Portal**: KYC verification, audit logging, balance adjustment, and withdrawal request approvals.
- **Express REST Backend**: Pre-integrated API endpoints on `/api/*` with mock storage and server fallback.
- **SPA Routing**: Configured with Netlify URL rewrites for seamless page refreshes.
