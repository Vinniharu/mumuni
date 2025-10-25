# MaquillagebyMaryam - Next.js Application

A lean, modern Next.js implementation of the MaquillagebyMaryam makeup artistry website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✨ **Homepage** with hero section, services overview, about, testimonials, and call-to-action
- 💄 **Appointments Page** with service selection and booking form
- 🎓 **Classes Page** with course selection and enrollment form
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Tailwind CSS** - Modern utility-first styling
- ⚡ **Next.js 14 App Router** - Latest Next.js features
- 🔥 **TypeScript** - Type-safe code
- 📡 **API Routes** - Backend endpoints for form submissions

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Lucide React icons
- **Notifications:** React Hot Toast
- **Images:** Next.js Image optimization
- **Backend API:** External REST API (https://mumuni-backend.onrender.com)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the project directory:
```bash
cd nextjs-makeup
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextjs-makeup/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── appointments/
│   │   │   │   └── route.ts          # Appointments API endpoint
│   │   │   └── classes/
│   │   │       └── route.ts          # Classes API endpoint
│   │   ├── appointments/
│   │   │   └── page.tsx              # Appointments booking page
│   │   ├── classes/
│   │   │   └── page.tsx              # Classes enrollment page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   └── components/
│       ├── home/
│       │   ├── HeroSection.tsx       # Hero section component
│       │   └── HomeSections.tsx      # Other homepage sections
│       ├── Header.tsx                # Navigation header
│       └── Footer.tsx                # Footer with social links
├── public/                           # Static assets
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies
```

## Key Pages

### Homepage (/)
- Hero section with brand introduction
- Services overview (Appointments & Classes)
- About Maryam section
- Customer testimonials
- Call-to-action section

### Appointments (/appointments)
- Service cards with images, pricing, and details
- Interactive service selection
- Booking form with validation
- Toast notifications for success/error

### Classes (/classes)
- Course cards with curriculum details
- "Why Choose Our Classes" benefits section
- Enrollment form with experience level selection
- Toast notifications for confirmation

## Backend Integration 🔌

This application uses an **external backend API** for all data operations.

**Backend URL:** `https://mumuni-backend.onrender.com`

### Key Features:
- ✅ Fully decoupled frontend/backend architecture
- ✅ RESTful API communication
- ✅ JWT authentication for admin
- ✅ Database persistence (MongoDB/PostgreSQL)
- ✅ Email notifications on bookings
- ✅ CORS configured for production

### API Endpoints

**Public Endpoints:**
- `POST /api/appointments` - Book appointment
- `POST /api/classes` - Enroll in class

**Admin Endpoints:**
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/appointments` - Fetch all appointments
- `PUT /api/admin/appointments/:id/status` - Update appointment status
- `GET /api/admin/classes` - Fetch all enrollments
- `PUT /api/admin/classes/:id/status` - Update enrollment status

**Full API documentation:** See `BACKEND_INTEGRATION.md`

## Customization

### Colors
Brand colors are defined in `tailwind.config.ts`:
- **Primary:** #722F37 (Burgundy)
- **Gold Accent:** #D4A574

### Fonts
- **Sans:** System font stack
- **Serif:** Georgia, Times New Roman

### Images
Replace placeholder images with actual images:
- Add images to `/public` directory
- Update image URLs in components
- Use Next.js `<Image>` component for optimization

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Deploy with one click

### Other Platforms
Build the production bundle:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Admin Section 🔐

A complete admin dashboard is included for managing appointments and class enrollments.

**Access:**
- URL: `http://localhost:3000/admin/login`
- Demo Credentials:
  - Email: `admin@maquillage.com`
  - Password: `admin123`

**Features:**
- ✅ Secure authentication with session management
- ✅ Protected admin routes
- ✅ Dashboard with stats overview
- ✅ Responsive sidebar navigation
- ⚠️ Appointments management (to implement with database)
- ⚠️ Classes enrollment management (to implement with database)

**Implementation:**
The admin foundation is complete. See `ADMIN_README.md` for detailed implementation guide including:
- Database setup (Prisma/MongoDB)
- API endpoint implementation
- Complete appointments/classes pages
- Email notifications
- Security best practices

## TODO / Future Enhancements

- [ ] Add database integration (Prisma + PostgreSQL)
- [ ] Complete admin appointments/classes pages
- [ ] Implement email notifications (Resend/SendGrid)
- [ ] Integrate payment processing (Paystack/Flutterwave)
- [ ] Add image gallery page
- [ ] Implement blog/portfolio section
- [ ] Add WhatsApp click-to-chat integration
- [ ] SEO optimization with metadata
- [ ] Analytics integration (Google Analytics/Plausible)

## License

Private - All rights reserved

## Contact

For questions or support, contact via:
- Instagram: [@maquillagebymaryam](https://www.instagram.com/maquillagebymaryam)
- WhatsApp: +234 808 035 4096
