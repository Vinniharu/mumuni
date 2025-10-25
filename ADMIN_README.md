# Admin Section - Implementation Guide

## Overview

The admin section provides a complete dashboard for managing appointments and class enrollments. The foundation is implemented with auth, layout, and routing.

**⚠️ IMPORTANT:** This application uses an **external backend API** at `https://mumuni-backend.onrender.com`. All data operations are handled by the backend server. See `BACKEND_INTEGRATION.md` for complete API documentation.

This guide explains how to complete the admin pages to display and manage data from the backend.

## What's Already Implemented ✅

### 1. **Authentication System**
- `src/contexts/AuthContext.tsx` - Complete auth context with login/logout
- Session management using sessionStorage
- Token-based authentication

### 2. **Admin Components**
- `src/components/admin/ProtectedRoute.tsx` - Route protection
- `src/components/admin/AdminLayout.tsx` - Admin layout with sidebar

### 3. **Pages**
- `/admin/login` - Login page ✅
- `/admin/dashboard` - Dashboard with stats placeholders ✅

### 4. **API Routes**
- `/api/admin/login` - Authentication endpoint ✅

## Demo Credentials

```
Email: admin@maquillage.com
Password: admin123
```

## Pages to Implement

### 1. Appointments Management (`/admin/appointments`)

**Location:** `src/app/admin/appointments/page.tsx`

**Features:**
- List all appointments with filtering (all, pending, confirmed, cancelled)
- Display appointment details (name, email, phone, date, time, service)
- Status update modal
- Real-time refresh every 3 seconds
- Stats cards (total, pending, confirmed)

**Data Structure:**
```typescript
interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}
```

**API Endpoints Needed:**
```
GET  /api/admin/appointments        - Fetch all appointments
PUT  /api/admin/appointments/[id]/status - Update status
```

### 2. Classes Management (`/admin/classes`)

**Location:** `src/app/admin/classes/page.tsx`

**Features:**
- List all class enrollments with filtering
- Display student details (name, email, phone, class type, experience level)
- Status update modal
- Stats breakdown by class type
- Experience level badges

**Data Structure:**
```typescript
interface ClassEnrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  class_type: string;
  experience_level: 'Complete Beginner' | 'Some Experience' | 'Intermediate' | 'Advanced';
  preferred_schedule: string;
  goals?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}
```

**API Endpoints Needed:**
```
GET  /api/admin/classes            - Fetch all enrollments
PUT  /api/admin/classes/[id]/status - Update status
```

## Implementation Steps

### Step 1: Backend is Already Set Up! ✅

The backend API at `https://mumuni-backend.onrender.com` is already configured with:
- Database (MongoDB/PostgreSQL)
- Authentication (JWT)
- All required endpoints
- Email notifications

**You don't need to set up a database!** Just connect to the existing backend.

### Step 2: Configure Environment Variable

The `.env` file should already contain:
```bash
NEXT_PUBLIC_API_URL=https://mumuni-backend.onrender.com
```

This is all you need for the frontend to communicate with the backend.

**Schema Example:**
```prisma
model Appointment {
  id                String   @id @default(cuid())
  name              String
  email             String
  phone             String
  service           String
  appointment_date  String
  appointment_time  String
  message           String?
  status            String   @default("pending")
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
}

model ClassEnrollment {
  id                  String   @id @default(cuid())
  name                String
  email               String
  phone               String
  class_type          String
  experience_level    String
  preferred_schedule  String
  goals               String?
  status              String   @default("pending")
  created_at          DateTime @default(now())
  updated_at          DateTime @updatedAt
}

model Admin {
  id         String   @id @default(cuid())
  email      String   @unique
  password   String
  name       String
  created_at DateTime @default(now())
}
```

#### Option B: MongoDB with Mongoose
```bash
npm install mongodb mongoose
```

### Step 2: Update API Routes to Store Data

**Update `/api/appointments/route.ts`:**
```typescript
import { prisma } from '@/lib/prisma'; // or your DB client

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Save to database
  const appointment = await prisma.appointment.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      appointment_date: data.date,
      appointment_time: data.time,
      message: data.message,
      status: 'pending',
    },
  });

  // Send email notification (optional)
  await sendEmail({
    to: 'admin@maquillage.com',
    subject: 'New Appointment',
    body: `New appointment from ${data.name}`,
  });

  return NextResponse.json({ success: true, data: appointment });
}
```

### Step 3: Implement Admin API Endpoints

**Create `/api/admin/appointments/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Verify admin token (implement your auth check)
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({
      success: true,
      appointments,
      count: appointments.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

**Create `/api/admin/appointments/[id]/status/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: { status, updated_at: new Date() },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
```

### Step 4: Implement Appointments Page

**Key Features to Add:**
1. **Data Fetching with `useEffect`**
2. **Status Filter Tabs**
3. **Status Update Modal**
4. **Auto-refresh every 3 seconds**
5. **Stats calculation**

**Reference the original implementation:** `C:\Users\fagbe\Documents\web\src\app\admin\appointments\page.jsx`

### Step 5: Implement Classes Page

Similar to appointments page but with:
- Class type breakdown
- Experience level badges
- Different data fields

**Reference:** `C:\Users\fagbe\Documents\web\src\app\admin\classes\page.jsx`

## Styling Guidelines

The admin section uses a minimal, professional design:

- **Colors:**
  - Primary: `#722F37` (brand-primary)
  - Backgrounds: White cards on gray-50
  - Borders: Gray-200 with hover to gray-400
  
- **Typography:**
  - Headers: Light font weight
  - Uppercase tracking for labels
  - Small text for metadata

- **Status Colors:**
  - Pending: Amber (border-amber-300, text-amber-700)
  - Confirmed: Green (border-green-300, text-green-700)
  - Cancelled: Red (border-red-300, text-red-700)
  - Completed: Gray (border-gray-300, text-gray-700)

## Testing the Admin Section

1. **Login:**
   ```
   Navigate to: http://localhost:3000/admin/login
   Email: admin@maquillage.com
   Password: admin123
   ```

2. **Dashboard:**
   ```
   Should redirect to: /admin/dashboard
   View stats and navigation
   ```

3. **Test Without Database:**
   - Mock data can be returned from API routes
   - Use static arrays for initial testing

## Email Notifications (Optional)

To send email notifications on new bookings:

```bash
npm install resend
# or
npm install nodemailer
```

**Example with Resend:**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@maquillage.com',
  to: 'admin@maquillage.com',
  subject: 'New Appointment Booking',
  html: '<p>New appointment from ${data.name}</p>',
});
```

## Security Considerations

1. **Replace Demo Auth:**
   - Use proper JWT tokens
   - Hash passwords with bcrypt
   - Add role-based access control

2. **API Protection:**
   - Verify tokens on all admin endpoints
   - Add rate limiting
   - Implement CORS properly

3. **Input Validation:**
   - Use Zod or Yup for schema validation
   - Sanitize user inputs
   - Validate email formats

## Production Checklist

- [ ] Replace demo admin credentials
- [ ] Implement proper JWT auth
- [ ] Add database integration
- [ ] Set up email notifications
- [ ] Add error logging (Sentry)
- [ ] Implement data backup
- [ ] Add audit logs
- [ ] Set up monitoring
- [ ] Test on mobile devices
- [ ] Security audit

## Folder Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          ✅ Complete
│   │   ├── dashboard/
│   │   │   └── page.tsx          ✅ Complete (needs data)
│   │   ├── appointments/
│   │   │   └── page.tsx          ⚠️  To implement
│   │   └── classes/
│   │       └── page.tsx          ⚠️  To implement
│   └── api/
│       └── admin/
│           ├── login/
│           │   └── route.ts      ✅ Complete
│           ├── appointments/
│           │   ├── route.ts      ⚠️  To implement
│           │   └── [id]/
│           │       └── status/
│           │           └── route.ts  ⚠️  To implement
│           └── classes/
│               ├── route.ts      ⚠️  To implement
│               └── [id]/
│                   └── status/
│                       └── route.ts  ⚠️  To implement
├── components/
│   └── admin/
│       ├── AdminLayout.tsx       ✅ Complete
│       └── ProtectedRoute.tsx    ✅ Complete
└── contexts/
    └── AuthContext.tsx           ✅ Complete
```

## Support

For questions or issues with the admin implementation:
1. Check the original React Router implementation in `C:\Users\fagbe\Documents\web\src\app\admin\`
2. Review Next.js App Router documentation
3. Test API endpoints with Postman/Thunder Client

## Next Steps

1. Choose and set up your database
2. Implement the GET/PUT endpoints for appointments and classes
3. Copy and adapt the appointments/classes pages from the original project
4. Test the complete flow: Login → Dashboard → Manage → Update Status
5. Add email notifications
6. Deploy to production

The foundation is solid - you're ready to build the complete admin system! 🚀
