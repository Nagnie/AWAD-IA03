# User Auth Register

## Live Demo

- **Frontend (Vercel)**: [https://awad-ia-03.vercel.app/](https://awad-ia-03.vercel.app/)
- **Backend (Render)**: [https://awad-ia03-8sq7.onrender.com](https://awad-ia03-8sq7.onrender.com)


## Setup instruction

### 1. Clone the repository

```
git clone https://github.com/Nagnie/AWAD-IA03.git
cd AWAD-IA03
```

### 2. Start PostgreSQL with Docker:
PostgreSQL running on Docker
- Host: localhost
- Port: 5432
- Database: user_auth_db
- User: postgres
- Password: postgres123

```bash
docker-compose up -d
```

### 3. Backend setup
```
cd backend
cp .env.sample .env
# Fill in your environment variables

npm install
npm run dev
```

### 4. Frontend setup
```
cd ../frontend
cp .env.sample .env
# VITE_API_URL should point to your backend, e.g., http://localhost:5000

npm install
npm run dev
```