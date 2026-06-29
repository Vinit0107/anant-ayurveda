<div align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c50e4bfc90f0ca053a/icons/NextJS-Dark.svg" width="60" alt="Next.js" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c50e4bfc90f0ca053a/icons/TypeScript.svg" width="60" alt="TypeScript" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c50e4bfc90f0ca053a/icons/MongoDB.svg" width="60" alt="MongoDB" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c50e4bfc90f0ca053a/icons/TailwindCSS-Dark.svg" width="60" alt="Tailwind CSS" />
  
  <br/><br/>
  
  <h1 align="center">Anant Ayurveda: Enterprise E-Commerce Platform</h1>
  <p align="center">A high-performance, full-stack Ayurvedic e-commerce platform featuring a secure payment gateway, cloud database architecture, and a dedicated admin order management portal.</p>
  
  <p align="center">
    <a href="https://anant-ayurveda.vercel.app"><b>🔴 Live Demo</b></a> •
    <a href="#-architecture"><b>Architecture</b></a> •
    <a href="#-features"><b>Features</b></a> •
    <a href="#-getting-started"><b>Getting Started</b></a>
  </p>
</div>

---

## ⚡ Key Features

### 🛍️ Customer Experience
- **Fluid UI/UX:** Built with React & Tailwind CSS, featuring micro-animations via Framer Motion for a premium dark-mode aesthetic.
- **State Management:** Utilizing Zustand for a persistent, lightning-fast slide-out shopping cart.
- **Secure Authentication:** NextAuth.js integration for encrypted, stateless session management.
- **Real-Time Tracking:** Customers can view a dynamic progress bar tracking their order from "Paid" to "Delivered".

### 💼 Admin & Order Management
- **Role-Based Access Control (RBAC):** Secure `/admin` routes strictly protected via server-side session validation.
- **Fulfillment Dashboard:** A centralized portal for admins to view shipping details, update order statuses, and attach courier tracking numbers.
- **Database Synchronization:** Real-time updates pushed seamlessly to MongoDB Atlas.

### 💳 Financial Infrastructure
- **Razorpay Integration:** Complete end-to-end payment gateway setup.
- **Cryptographic Verification:** Backend API routes strictly verify Razorpay HMAC SHA256 signatures to prevent fraudulent transactions before saving to the database.

---

## 🏗️ Architecture & Tech Stack

This project leverages a modern, serverless architecture to ensure maximum scalability and security.

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** Strict [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/) (Cloud NoSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Deployment:** [Vercel](https://vercel.com) (Edge Network)

---

## 🛡️ Security Hardening
This application has been strictly hardened against common web vulnerabilities:
- **Prisma Parameterized Queries:** Blocks NoSQL injection attacks.
- **Strict HTTP Headers:** Enforces Content-Security-Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Frame-Options to prevent XSS and Clickjacking.
- **React Escaping:** Automatic mitigation of cross-site scripting.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- MongoDB Atlas cluster URL
- Razorpay API Keys (Test or Live)

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/Vinit0107/anant-ayurveda.git
   cd anant-ayurveda
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/anant_ayurveda"
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   RAZORPAY_KEY_ID="rzp_test_yourkey"
   RAZORPAY_KEY_SECRET="your_razorpay_secret"
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_yourkey"
   ```

4. **Initialize the Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

---
<p align="center"><i>Developed by Vinit Pathak</i></p>
