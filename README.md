<!-- # Medi Mart

Medi Mart is a modern web application designed to streamline the process of managing medicines, orders, and users. It features a responsive frontend built with Next.js and a robust backend powered by Node.js and MongoDB.

## Features

### Client (Frontend)
- **Order Verification**: Verify orders with detailed information.
- **File Uploads**: Upload images and PDFs with preview and validation.
- **Responsive Design**: Fully responsive UI for all devices.
- **State Management**: Integrated with Redux Toolkit for efficient state handling.

### Server (Backend)
- **Authentication**: User registration, login, password change, and role-based access control.
- **Medicine Management**: CRUD operations for medicines, including image uploads to Cloudinary.
- **Order Management**: Place orders, verify payments, and manage shipping statuses.
- **Error Handling**: Centralized error handling with support for Mongoose and custom errors.
- **Payment Integration**: Integrated with ShurjoPay for payment processing.
- **Admin Features**: Manage users, roles, and statuses.

## Tech Stack

### Client
- **Framework**: Next.js, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React, React Icons

### Server
- **Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
- **File Uploads**: Multer, Cloudinary
- **Payment Gateway**: ShurjoPay
- **Linting & Formatting**: ESLint, Prettier
- **TypeScript**: Strongly typed codebase

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

#### Client
1. Clone the client repository:
   ```bash
   git clone https://github.com/Azhar730/medi-mart-client.git
   cd medi-mart-client

2. Install dependencies
    ```bash
    npm install

3. Start the development server
```bash
npm run dev
4. Access the live application:
```bash
https://medimart-nu.vercel.app

Server
1. Clone the server repository
git clone https://github.com/Azhar730/medi-mart-server.git
cd medi-mart-server
2. Install dependencies
npm install
3. Set up the environment variables:
Rename .env.example to .env and configure the required variables:
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

4. Start the development server:
npm run dev

Admin Login
Use the following credentials to log in as an admin:

Email: azharmahmud730@gmail.com
Password: 12345678
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.

For any questions or issues, please contact the project maintainer. ``` -->


# 💊 Medi Mart

Medi Mart is a modern, full-featured medicine e-commerce web application designed to streamline the management of medicines, orders, and users. It features a responsive frontend powered by Next.js and a robust backend using Node.js and MongoDB.

---

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

---

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

---

## ⚙️ Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## 📦 Installation

### 🖥️ Client Setup

```bash
git clone https://github.com/Azhar730/medi-mart-client.git
cd medi-mart-client
npm install
npm run dev

🔗 Live Site: https://medimart-nu.vercel.app


Server Setup

git clone https://github.com/Azhar730/medi-mart-server.git
cd medi-mart-server
npm install

Rename .env.example to .env and configure the following:

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



Start the Server

npm run dev

 Admin Access
Use the following credentials to log in as an Admin:

Email: azharmahmud730@gmail.com

Password: 12345678