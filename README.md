# 💊 Medi Mart

Medi Mart is a modern, full-featured medicine e-commerce web application designed to streamline the management of medicines, orders, and users. It features a responsive frontend powered by Next.js and a robust backend using Node.js and MongoDB.

## 🚀 Features

### 🖥️ Client (Frontend)
- ✅ Order Verification with detailed information  
- 📎 File Uploads (images & PDFs) with preview and validation  
- 📱 Fully Responsive Design across all devices  
- 🔄 State Management using Redux Toolkit  

### 🛠️ Server (Backend)
- 🔐 Authentication: Registration, login, role-based access control  
- 💊 Medicine Management: Full CRUD, with image uploads to Cloudinary  
- 📦 Order Management: Order placement, payment verification, shipping status  
- ⚠️ Centralized Error Handling with custom and Mongoose errors  
- 💳 Payment Integration via **ShurjoPay**  
- 🛡️ Admin Features: Manage users, roles, and order statuses  

## 🧰 Tech Stack

### 🌐 Client
- **Framework:** Next.js, TypeScript, Vite  
- **State Management:** Redux Toolkit  
- **Styling:** Tailwind CSS  
- **Routing:** React Router  
- **Icons:** Lucide React, React Icons  

### 🔧 Server
- **Runtime:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, bcrypt  
- **Validation:** Zod  
- **File Uploads:** Multer + Cloudinary  
- **Payment Gateway:** ShurjoPay  
- **Code Quality:** ESLint, Prettier  
- **Type Safety:** TypeScript  

## ⚙️ Getting Started

### ✅ Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  

## 📦 Installation

### 🖥️ Client Setup

```bash
git clone https://github.com/Azhar730/medi-mart-client.git
cd medi-mart-client
npm install
npm run dev
🔗 Live Site: https://medimart-nu.vercel.app

🛠️ Server Setup
bash
Copy
Edit
git clone https://github.com/Azhar730/medi-mart-server.git
cd medi-mart-server
npm install
🌐 Environment Variables
Rename .env.example to .env and configure the following:

env
Copy
Edit
NODE_ENV=development
PORT=5000
DATABASE_URL=<your_mongodb_connection_string>
BCRYPT_SALT_ROUNDS=8
JWT_ACCESS_SECRET=<your_jwt_secret>
JWT_ACCESS_EXPIRES_IN=1d

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# ShurjoPay
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=<your_shurjopay_username>
SP_PASSWORD=<your_shurjopay_password>
SP_PREFIX=SP
SP_RETURN_URL=<your_return_url>
🚀 Start the Server
bash
Copy
Edit
npm run dev
🔐 Admin Access
Use the following credentials to log in as an admin:

Email: azharmahmud730@gmail.com

Password: 12345678