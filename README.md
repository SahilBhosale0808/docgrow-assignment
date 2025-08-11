# DocGrow - Doctor Appointment Management App

A comprehensive React Native application designed for healthcare professionals to efficiently manage patient appointments, featuring an intuitive interface, real-time calendar integration, and robust data management capabilities.

## 🏥 App Overview

DocGrow is a professional-grade appointment management system built specifically for medical practices. The app provides a complete solution for tracking patient appointments, managing schedules, and maintaining organized patient records with a clean, medical-focused interface.

## ✨ Core Features

### 📊 **Dashboard & Analytics**

- **Real-time Metrics** - Today's appointment count and total patient statistics
- **Next Appointment Preview** - Quick overview of upcoming consultations
- **Animated Interface** - Smooth entrance animations with staggered metric cards
- **Professional Greeting** - Personalized welcome with doctor's name

### 📅 **Advanced Calendar System**

- **Monthly Calendar View** - Color-coded appointment density visualization
- **Smart Color Coding**:
  - Green (0-2 appointments): Available slots
  - Amber (3-5 appointments): Partially booked
  - Red (6+ appointments): Fully booked
- **Date Selection** - Tap any date to view specific day's appointments
- **Dynamic Range** - Automatic past/future month calculations
- **Appointment Indicators** - Visual markers for scheduled consultations

### 📋 **Appointment Management**

- **Comprehensive Forms** - Patient name, phone, symptoms, and appointment time
- **Status Tracking** - Confirmed, Pending, Cancelled status management
- **Quick Actions** - Add appointments via floating action button
- **Search & Filter** - Filter by Today/Upcoming/Past with search functionality
- **Notes System** - Add and edit patient consultation notes
- **Real-time Updates** - Instant UI updates with toast notifications

### 👥 **Patient Records**

- **Patient Database** - Centralized patient information storage
- **Appointment History** - Track all past and future appointments per patient
- **Contact Management** - Phone numbers and communication details
- **Medical Notes** - Consultation notes and treatment tracking

### 🎨 **Professional UI/UX**

- **Medical Design Language** - Clean, professional healthcare aesthetic
- **Accessibility First** - Safe area support for all device types
- **Responsive Layout** - Optimized for tablets and phones
- **Gesture Navigation** - Intuitive swipe and tap interactions
- **Loading States** - Smooth transitions and feedback systems

## 🏗️ Technical Architecture

### **Component Structure**

```
src/
├── components/              # Reusable UI Components
│   ├── AppHeader.tsx       # App header with medical branding
│   ├── AppointmentCard.tsx # Individual appointment display
│   ├── Button.tsx          # Primary and ghost button variants
│   ├── Card.tsx           # Base card container with shadows
│   ├── MetricCard.tsx     # Dashboard statistics display
│   ├── StatusPill.tsx     # Appointment status indicators
│   └── TextField.tsx      # Form input with validation styling
├── screens/                # Main Application Screens
│   ├── SplashScreen.tsx   # Animated startup screen
│   ├── OnboardingName.tsx # First-time user setup
│   ├── Dashboard.tsx      # Main overview screen
│   ├── Calendar.tsx       # Calendar view with appointments
│   ├── Appointments.tsx   # Appointment list and search
│   ├── AddAppointment.tsx # New appointment creation
│   ├── AppointmentDetails.tsx # Edit appointment and notes
│   └── Settings.tsx       # User profile management
├── navigation/             # Navigation Configuration
│   ├── RootNav.tsx        # Stack navigator setup
│   └── Tabs.tsx          # Bottom tab bar navigation
├── data/                   # Data Layer
│   └── mockAppointments.ts # Sample appointment data
├── storage/                # Data Persistence
│   └── user.ts           # User preferences and settings
├── utils/                  # Helper Functions
│   └── calendar.ts        # Calendar calculations and color logic
├── theme.ts               # Design system tokens
└── types.ts              # TypeScript definitions
```

### **Design System**

```typescript
// Professional Medical Color Palette
colors = {
  primary: '#0EA5E9', // Medical blue
  bg: '#FFFFFF', // Clean white
  text: '#0A0A0A', // High contrast black
  muted: '#6B7280', // Professional gray
  card: '#F8FAFC', // Subtle card background
  primarySoft: '#E0F2FE', // Light blue accent
};

// Consistent Spacing System
spacing = { xs: 6, sm: 10, md: 16, lg: 20 };

// Typography Hierarchy
typography = { h1: 24, h2: 22, body: 16, caption: 13 };
```

## � Download APK

Download the latest Android APK build here: [DocGrow APK](https://drive.google.com/file/d/1_UHX9CWGRVZLoUvkKyZlx2W0awkKbJ4o/view?usp=sharing)

## �🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native development environment
- Android Studio (Android development)
- Xcode (iOS development - macOS only)

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/SahilBhosale0808/docgrow-assignment.git
   cd DocGrow
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Development Server**

   ```bash
   npm start
   ```

5. **Run Application**

   ```bash
   # Android
   npm run android

   # iOS (macOS only)
   npm run ios
   ```

## 📱 App Flow & User Experience

### **First Launch Experience**

1. **Splash Screen** → Animated medical logo (2.5 seconds)
2. **Onboarding** → Doctor name input for personalization
3. **Dashboard** → Welcome with today's appointments overview

### **Daily Workflow**

1. **Morning Check** → Review dashboard metrics and next appointment
2. **Schedule Management** → Use calendar to view weekly/monthly overview
3. **Add Appointments** → Quick form for new patient bookings
4. **During Consultations** → Update appointment status and add notes
5. **End of Day** → Review completed appointments and plan ahead

### **Key Navigation**

- **Bottom Tabs**: Dashboard | Calendar | Appointments | Settings
- **Modal Screens**: Add Appointment | Appointment Details
- **Quick Actions**: FAB for instant appointment creation

## 🔧 Technical Stack

| Category          | Technology             | Version  | Purpose                              |
| ----------------- | ---------------------- | -------- | ------------------------------------ |
| **Framework**     | React Native           | 0.80.2   | Cross-platform mobile development    |
| **Language**      | TypeScript             | 5.0.4    | Type safety and developer experience |
| **UI Library**    | React                  | 19.1.0   | Component architecture               |
| **Navigation**    | React Navigation       | 7.x      | Screen routing and navigation        |
| **Calendar**      | React Native Calendars | 1.1313.0 | Calendar interface                   |
| **Icons**         | FontAwesome5           | 12.2.0   | Professional iconography             |
| **Storage**       | AsyncStorage           | 2.2.0    | Local data persistence               |
| **Date Handling** | Day.js                 | 1.11.13  | Date manipulation and formatting     |
| **Notifications** | Toast Message          | 2.3.3    | User feedback system                 |

## 🎯 Sample Data

The app includes comprehensive sample data for August 11th, 2025:

- **9 Sample Appointments** across different times
- **Variety of Medical Cases** - Check-ups, follow-ups, consultations
- **Different Patient Profiles** - Diverse names and contact information
- **Realistic Symptoms** - Common medical complaints and conditions
- **Mixed Status Types** - Confirmed, pending, and cancelled appointments

## 📈 Development Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Build and run Android app
npm run ios        # Build and run iOS app (macOS only)
npm run lint       # Run ESLint code quality checks
npm test          # Execute test suite
```

## 🔒 Professional Standards

- **Type Safety** - Full TypeScript implementation
- **Code Quality** - ESLint with React Native specific rules
- **Performance** - Optimized animations with native driver
- **Accessibility** - Safe area handling and proper contrast ratios
- **Scalability** - Modular component architecture
- **Data Integrity** - Proper form validation and error handling

---

**Built for Healthcare Professionals** | **React Native + TypeScript** | **Production Ready**
