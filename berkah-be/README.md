# Berkah Backend


## Overview
Berkah Backend is a RESTful API built using **Express**, **TypeScript**, and **Prisma** as the ORM. It provides a robust backend for managing application data and includes Swagger documentation for API reference.

## Features
- Built with **TypeScript** for type safety.
- **Prisma** ORM for database management.
- **Swagger** documentation available at `/api-docs` (development mode only).

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or any database supported by Prisma)

### Steps
1. Clone Repository
    ```bash
    git clone https://github.com/hafiprojects/berkah-be
    ```
2. Install Dependencies
    ```bash
    npm install
    ```
3. Setup .env
    ```bash
    DATABASE_URL="mysql://root:@127.0.0.1/berkah_db"
    JWT_SECRET="your-secret"
    PORT=5000
    UPLOAD_DIR="./uploads"
    MAX_FILE_SIZE=5242880 # 5MB
    JWT_EXPIRES_IN=3600 # 1h in seconds
    HASHID_SALT="your-salt" # Hashid salt
    FE_URL_HOST="http://localhost:5173" # FE URL host
    BE_URL_HOST="http://localhost:5000" # BE URL host
    NODE_ENV="development"

    # Mail Configuration
    MAIL_USER="your-email"
    MAIL_PASS="your-password"
    MAIL_HOST="smtp.your-email.com"
    MAIL_PORT=587

    ```
4. Run Prisma Command : 
    ```bash
    npx prisma migrate dev
    ```

## Usage
API Endpoints
Once the server is running, you can access the API at http://localhost:5000.

## Swagger Documentation
Swagger documentation is available at http://localhost:5000/api-docs but only in development mode.

## Scripts
Start Development Server:
``` bash
npm run dev
```
Start Worker on Development Server:
```bash
npm run dev:worker-email
```
Build for Production:
``` bash
npm run build
```
Run for Production:
``` bash
npm run start
```
Run worker for Production:
``` bash
npm run start:worker-email
```
Run Prisma Studio (Database GUI):
``` bash
npx prisma studio
```

## Tech Stack
- Express: Web framework for building APIs.
- TypeScript: Type-safe JavaScript.
- Prisma: ORM for database management.
- Swagger: API documentation.
- Multer: Image Upload Library
