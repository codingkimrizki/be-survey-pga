# 🚀 be-survey-pga

> Backend service for Survey PGA application built with Express.js, Dockerized, and deployed via Jenkins CI/CD.

---

## 📌 Overview

**be-survey-pga** is a backend service for handling survey data, authentication, and business logic for the PGA Survey system.

This project is designed with:

* Clean REST API using Express.js
* Scalable architecture with Sequelize ORM
* Containerized environment using Docker
* Automated build & deployment using Jenkins CI/CD

---

## 🧱 Tech Stack

**Backend**

* Node.js
* Express.js
* Sequelize ORM

**Database**

* MySQL / MariaDB

**DevOps / Tools**

* Docker
* Docker Compose
* Jenkins (CI/CD)
* GitHub
* Nginx (Reverse Proxy)

---

## 📂 Project Structure

```bash
project-root/
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── (frontend handled separately)
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=your_db_name

PORT=3000
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## 🐳 Docker Setup

### Build & Run

```bash
docker compose up -d --build
```

### Stop Containers

```bash
docker compose down
```

### Remove Volume (Reset DB)

```bash
docker compose down -v
```

---

## 🗃️ Database Migration & Seeder

Run migration:

```bash
npx sequelize db:migrate
```

Run seeder:

```bash
npx sequelize db:seed:all
```

Undo seeder:

```bash
npx sequelize db:seed:undo:all
```

---

## 🔐 Authentication Flow

1. User login
2. Backend validates credentials
3. JWT generated
4. Token used for protected routes

---

## 🌐 API Endpoints (Example)

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| POST   | /api/auth/login | Login user     |
| GET    | /api/questions  | Get questions  |
| POST   | /api/answers    | Submit answers |

---

## 🧪 Development Mode

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🚀 Deployment Notes

* Use HTTPS (recommended)
* Configure Nginx as reverse proxy
* Ensure `.env` is not committed
* Use CI/CD (Jenkins) for automated deploy

---

## 📸 Screenshots

> (Optional) Add screenshots or diagrams here

---

## 👤 Author

**Your Name**
Role / Title

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Notes

* Feel free to fork or improve this project
* Contributions are welcome
