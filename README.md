# Backend Sporton

Backend API untuk aplikasi Sporton - platform manajemen produk, kategori, transaksi, dan autentikasi pengguna. Dibangun menggunakan Node.js, Express, TypeScript, dan MongoDB.

## 📋 Daftar Isi

- Teknologi yang Digunakan
- Fitur
- Struktur Proyek
- Instalasi
- Konfigurasi Environment
- Menjalankan Aplikasi
- API Dokumentasi
- Script Tersedia
- Kontribusi
- Lisensi

## 🛠️ Tech Stack

**Runtime**: Node.js

**Framework**: Express.js

**Bahasa**: TypeScript

**Database**: MongoDB dengan Mongoose ODM

**Autentikasi**: JWT (JSON Web Token) & bcrypt

**Validasi**: express-validator

**Keamanan**: helmet, cors, express-rate-limit, xss-clean

**Dokumentasi API**: Swagger UI

**Package Manager**: pnpm

**Deployment**: Vercel / Railway

## ✨ Features

- ✅ Autentikasi pengguna (Register, Login, Logout)
- ✅ Manajemen Kategori (CRUD)
- ✅ Manajemen Produk (CRUD)
- ✅ Manajemen Bank (CRUD)
- ✅ Manajemen Transaksi
- ✅ Rate limiting untuk keamanan
- ✅ Sanitasi input untuk mencegah XSS
- ✅ Dokumentasi API interaktif (Swagger)
- ✅ Error handling terpusat

## 📁 Struktur Proyek

```bash
BACKEND-SPORTON/
├── src/
│   ├── controllers/     # Logika bisnis untuk setiap entitas
│   ├── middlewares/     # Middleware (auth, error handler, dll)
│   ├── models/          # Model MongoDB (Mongoose)
│   ├── repositories/    # Pattern untuk akses data
│   ├── routes/          # Definisi route API
│   │   ├── auth.routes.ts
│   │   ├── bank.routes.ts
│   │   ├── category.routes.ts
│   │   ├── product.routes.ts
│   │   └── transaction.routes.ts
│   ├── services/        # Logika bisnis yang lebih kompleks
│   ├── types/           # Tipe TypeScript
│   ├── utils/           # Utility functions
│   │   ├── errorHandler.util.ts
│   │   ├── normalizePath.util.ts
│   │   ├── response.utils.ts
│   │   └── swagger.util.ts
│   └── validators/      # Validasi input
├── uploads/             # File upload (jika ada)
├── .env                 # Environment variables
├── .gitignore
├── app.ts               # Konfigurasi Express
├── package.json
├── pnpm-lock.yaml
├── server.ts            # Entry point
├── swagger.json         # Dokumentasi OpenAPI
└── tsconfig.json
```

## ⚙️ Installation

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal:

1. Clone Repository

```bash
  git clone https://github.com/username/backend-sporton.git
  cd backend-sporton
```

2. Install Dependencies

```bash
  pnpm install
  Jika belum memiliki pnpm, install dulu dengan npm install -g pnpm
```

3. Buat file environtment

```bash
  cp .env.example .env
```

4. Sesuaikan konfigurasi di file .env (lihat bagian Konfigurasi Environment)

## 🔐 Konfigurasi Environment

Buat file `.env` di root proyek dan isi dengan variabel berikut:

```bash
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sporton

# JWT
JWT_SECRET=your_super_secret_key_here

# Frontend URL (untuk CORS)
FRONTEND_URL=http://localhost:3000

# API URL (untuk dokumentasi)
API_URL=http://localhost:5001/api
```

## 🚀 Menjalankan Aplikasi

To run tests, run the following command

**Mode Pengembangan**

```bash
  pnpm run dev
```

Aplikasi akan berjalan di http://localhost:5001

**Mode Produksi**

```bash
  pnpm run build
  pnpm start
```

## 📚 API Dokumentasi

Dokumentasi API interaktif dapat diakses melalui Swagger UI:

Local: http://localhost:5001/api-docs

Production: https://backend-sporton.vercel.app/api-docs

| Method | Endpoint                           | Description                                        | Autentikasi |
| :----- | :--------------------------------- | :------------------------------------------------- | :---------- |
| POST   | `/api/auth/sign-up`                | Registrasi Admin                                   | ❌          |
| POST   | `/api/auth/sign-in`                | Login Admin                                        | ❌          |
| GET    | `/api/banks`                       | Mendapatkan semua bank                             | ❌          |
| POST   | `/api/banks`                       | Menambahkan bank baru                              | ✅ Admin    |
| GET    | `/api/banks/:bankId`               | Mendapatkan satu data bank / detail bank           | ❌          |
| PUT    | `/api/banks/:bankId`               | Memperbarui data bank                              | ✅ Admin    |
| DELETE | `/api/banks/:bankId`               | Menghapus data bank                                | ✅ Admin    |
| GET    | `/api/categories`                  | Mendapatkan semua kategori                         | ❌          |
| POST   | `/api/categories`                  | Menambahkan kategori baru                          | ✅ Admin    |
| GET    | `/api/categories/:categoryId`      | Mendapatkan satu data kategori / detail kategori   | ❌          |
| PUT    | `/api/categories/:categoryId`      | Memperbarui data kategori                          | ✅ Admin    |
| DELETE | `/api/categories/:categoryId`      | Menghapus data kategori                            | ✅ Admin    |
| GET    | `/api/products`                    | Mendapatkan semua produk                           | ❌          |
| POST   | `/api/products`                    | Menambahkan produk baru                            | ✅ Admin    |
| GET    | `/api/products/:productId`         | Mendapatkan satu data produk / detail produk       | ❌          |
| PUT    | `/api/products/:productId`         | Memperbarui data produk                            | ✅ Admin    |
| DELETE | `/api/products/:productId`         | Menghapus data produk                              | ✅ Admin    |
| GET    | `/api/transactions`                | Mendapatkan semua transaksi                        | ❌          |
| POST   | `/api/transactions`                | Menambahkan transaksi baru                         | ✅ Admin    |
| GET    | `/api/transactions/:transactionId` | Mendapatkan satu data transaksi / detail transaksi | ❌          |
| PUT    | `/api/transactions/:transactionId` | Memperbarui data transaksi                         | ✅ Admin    |
| DELETE | `/api/transactions/:transactionId` | Menghapus data transaksi                           | ✅ Admin    |

Untuk endpoint yang memerlukan autentikasi, sertakan header:

```bash
Authorization: Bearer <your_jwt_token>
```
