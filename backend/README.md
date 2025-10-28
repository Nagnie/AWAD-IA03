# User Auth Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

3. Configure environment variables in `.env`

4. Run development server:
```bash
npm run dev
```

## API Endpoints

### POST /user/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /user/all
Get all users (for testing only)

## Database

PostgreSQL running on Docker
- Host: localhost
- Port: 5432
- Database: user_auth_db
- User: postgres
- Password: postgres123

Access Adminer: http://localhost:8080