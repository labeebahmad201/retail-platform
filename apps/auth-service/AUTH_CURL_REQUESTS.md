# Auth Service API Curl Requests

Use these curl commands to interact with the Auth Service. Replace `<token>` with the JWT received after a successful login.

## 1. Register User
Creates a new user account with the 'USER' role and 'ACTIVE' status.

```bash
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "StrongPassword123!",
       "firstName": "John",
       "lastName": "Doe"
     }'
```

---

## 2. Login User
Authenticates the user and returns a JWT access token.

```bash
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "StrongPassword123!"
     }'
```

---

## 3. Verify Token (Stateless)
Performs a fast, stateless check of the JWT. It does not hit the database.

```bash
curl -X POST http://localhost:3000/auth/verify \
     -H "Authorization: Bearer <token>"
```

---

## 4. Get User Profile (Stateful /auth/me)
Performs a full, stateful check. It validates the JWT and then lookups the user in the database to ensure their status is `ACTIVE`.

```bash
curl -X GET http://localhost:3000/auth/me \
     -H "Authorization: Bearer <token>"
```

### Expected Response (Success):
```json
{
  "id": "cl...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "status": "ACTIVE",
  "createdAt": "2026-01-05T...",
  "updatedAt": "2026-01-05T..."
}
```

### Expected Response (Banned User):
```json
{
  "status": "BANNED",
  "message": "Account is banned",
  "authenticated": false
}
```
