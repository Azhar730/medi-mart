# Medi Mart

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