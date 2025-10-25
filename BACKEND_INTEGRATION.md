# Backend Integration Guide

## Overview

This Next.js application uses an **external backend API** hosted at `https://mumuni-backend.onrender.com`. All data persistence, authentication, and business logic is handled by the backend server.

## Architecture

```
┌─────────────────────────────┐
│   Next.js Frontend          │
│   (This Application)        │
│   - UI Components           │
│   - Form Handling           │
│   - Client-Side Routing     │
└──────────┬──────────────────┘
           │
           │ HTTPS Requests
           │
           ▼
┌─────────────────────────────┐
│   Express Backend           │
│   mumuni-backend.onrender   │
│   - Database (MongoDB/SQL)  │
│   - Authentication          │
│   - Email Notifications     │
│   - Business Logic          │
└─────────────────────────────┘
```

## Backend API URL

**Production:** `https://mumuni-backend.onrender.com`

Set in `.env`:
```bash
NEXT_PUBLIC_API_URL=https://mumuni-backend.onrender.com
```

## API Endpoints Used

### Public Endpoints

#### 1. **Appointments Booking**
```
POST /api/appointments
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+234 808 123 4567",
  "date": "2025-11-15",
  "time": "2:00 PM",
  "service": "Bridal Makeup",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "id": "...",
    "status": "pending",
    ...
  }
}
```

**Used in:** `src/app/appointments/page.tsx`

---

#### 2. **Class Enrollment**
```
POST /api/classes
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+234 808 123 4567",
  "classType": "Beginner Basics",
  "experience": "Complete Beginner",
  "schedule": "Weekends",
  "goals": "Learn professional makeup"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enrollment successful",
  "data": {
    "id": "...",
    "status": "pending",
    ...
  }
}
```

**Used in:** `src/app/classes/page.tsx`

---

### Admin Endpoints

#### 3. **Admin Login**
```
POST /api/admin/login
```

**Request Body:**
```json
{
  "email": "admin@maquillage.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "1",
    "name": "Admin User",
    "email": "admin@maquillage.com"
  }
}
```

**Used in:** `src/contexts/AuthContext.tsx`

---

#### 4. **Get All Appointments (Admin)**
```
GET /api/admin/appointments
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "appointments": [...],
  "count": 25
}
```

**To be used in:** `src/app/admin/appointments/page.tsx` (when implemented)

---

#### 5. **Update Appointment Status (Admin)**
```
PUT /api/admin/appointments/:id/status
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "status": "confirmed",
    "updated_at": "2025-10-25T19:00:00Z"
  }
}
```

---

#### 6. **Get All Class Enrollments (Admin)**
```
GET /api/admin/classes
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "classes": [...],
  "count": 15
}
```

---

#### 7. **Update Class Status (Admin)**
```
PUT /api/admin/classes/:id/status
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

## Environment Variables

### Required
```bash
NEXT_PUBLIC_API_URL=https://mumuni-backend.onrender.com
```

### Optional (for future features)
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://...
```

## How It Works

### 1. **Frontend Form Submission**
When a user submits a form (appointment/class):
1. Form data is validated client-side
2. POST request sent to backend API
3. Backend saves to database
4. Backend sends email notification (if configured)
5. Success/error response returned to frontend
6. Toast notification shown to user

### 2. **Admin Authentication**
1. Admin enters credentials in login form
2. POST to `/api/admin/login`
3. Backend validates credentials
4. JWT token returned and stored in sessionStorage
5. Token included in subsequent admin API requests

### 3. **Admin Data Management**
1. Admin views appointments/classes page
2. Frontend fetches data with Authorization header
3. Backend verifies token
4. Data returned from database
5. Admin can update status via PUT requests

## Error Handling

The frontend handles various error scenarios:

```typescript
try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/...`);
  
  if (!response.ok) {
    throw new Error('Request failed');
  }
  
  const data = await response.json();
  // Handle success
} catch (error) {
  toast.error('Failed to process request');
}
```

## CORS Configuration

The backend must allow requests from the frontend domain:

```javascript
// Backend CORS config
app.use(cors({
  origin: ['https://your-nextjs-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

## Backend Repository

The backend API is a separate codebase (likely Express.js + MongoDB/PostgreSQL).

**Backend features:**
- User data persistence
- Admin authentication with JWT
- Email notifications
- Status management
- Data validation
- Error handling

## Local Development

### Option 1: Use Production Backend (Recommended)
```bash
# .env
NEXT_PUBLIC_API_URL=https://mumuni-backend.onrender.com
```

### Option 2: Run Backend Locally
If you have access to the backend code:

```bash
# Terminal 1: Start backend
cd /path/to/backend
npm run dev  # Usually runs on port 5000

# Terminal 2: Configure Next.js
# .env
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start Next.js
npm run dev
```

## Testing API Endpoints

### Using cURL
```bash
# Test appointment booking
curl -X POST https://mumuni-backend.onrender.com/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+234 808 123 4567",
    "date": "2025-11-15",
    "time": "2:00 PM",
    "service": "Bridal Makeup"
  }'

# Test admin login
curl -X POST https://mumuni-backend.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@maquillage.com",
    "password": "admin123"
  }'
```

### Using Postman/Thunder Client
1. Import the endpoints above
2. Test each endpoint
3. Save responses for reference

## Troubleshooting

### Issue: API requests failing
**Check:**
- Is backend server running? (Check https://mumuni-backend.onrender.com)
- Is NEXT_PUBLIC_API_URL set correctly in .env?
- Are CORS headers configured on backend?
- Check browser console for errors

### Issue: Authentication not working
**Check:**
- Are credentials correct?
- Is token being stored in sessionStorage?
- Is Authorization header being sent with admin requests?
- Has token expired?

### Issue: Data not appearing in admin
**Check:**
- Is backend database populated?
- Are admin API endpoints working?
- Is token valid and included in requests?
- Check network tab for response data

## Security Considerations

1. **Never expose backend credentials** in frontend code
2. **Always use HTTPS** in production
3. **Token storage** - sessionStorage (cleared on tab close)
4. **Validate data** on backend (frontend validation is not secure)
5. **Rate limiting** should be implemented on backend
6. **CORS** should only allow trusted origins

## Deployment

### Frontend (Next.js)
Deploy to Vercel/Netlify/etc with environment variable:
```
NEXT_PUBLIC_API_URL=https://mumuni-backend.onrender.com
```

### Backend
Already deployed at: `https://mumuni-backend.onrender.com`

## Future Enhancements

- [ ] Implement WebSockets for real-time updates
- [ ] Add API response caching
- [ ] Implement retry logic for failed requests
- [ ] Add request timeout handling
- [ ] Implement optimistic UI updates

## Support

For backend-related issues, contact the backend maintainer.
For frontend integration issues, check this documentation first.

---

**Note:** This frontend application is completely decoupled from the backend. As long as the API contract (endpoints, request/response format) remains the same, both can be developed and deployed independently.
