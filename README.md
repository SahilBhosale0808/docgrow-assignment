# DocGrow - Doctor Appointment Management App

A modern React Native application for managing doctor appointments with an intuitive interface and smooth animations.

## 🚀 Features Implemented

### 📱 **Core Functionality**

- **Custom Splash Screen** - Animated doctor stethoscope logo with fade-in effect
- **User Onboarding** - First-time user name collection with persistent storage
- **Dashboard Overview** - Today's appointments count, total patients, and next appointment preview
- **Appointment Management** - Add, view, edit, and manage appointments
- **Calendar Integration** - Monthly calendar view with appointment indicators
- **Appointment Details** - Detailed view with status and notes editing
- **Settings Screen** - User profile management with professional UI

### 🎨 **UI/UX Features**

- **Clean Modern Design** - Professional medical app aesthetic
- **Smooth Animations** - Subtle entrance animations and transitions
- **Safe Area Support** - Proper handling of device notches and status bars
- **Toast Notifications** - Success/error feedback for user actions
- **Responsive Design** - Optimized for various screen sizes
- **Color-coded Calendar** - Visual indicators for appointment density
- **Floating Action Button** - Quick access to add appointments
- **Status Management** - Visual pills for appointment status

### 🔧 **Technical Features**

- **TypeScript Support** - Full type safety throughout the application
- **Navigation Stack** - React Navigation with tab and stack navigators
- **State Management** - Local state with React hooks
- **Data Persistence** - AsyncStorage for user preferences
- **Component Architecture** - Reusable UI components
- **Theme System** - Centralized colors, spacing, and typography
- **Mock Data System** - Realistic appointment data for testing

### 📅 **Appointment Features**

- **Add Appointments** - Form with validation for patient details
- **View Appointments** - List view with search and filter capabilities
- **Edit Status & Notes** - Update appointment information
- **Calendar View** - Monthly overview with appointment counts
- **Next Appointment Preview** - Quick access from dashboard
- **Status Indicators** - Confirmed, pending, canceled states

## 📋 Setup Instructions

### Prerequisites

- Node.js (>= 18)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd DocGrow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**

   ```bash
   npm start
   ```

5. **Run on Android**

   ```bash
   npm run android
   ```

6. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

````sh
   ```bash
   npm run ios
````

### Environment Setup

Follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide for detailed setup instructions.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppHeader.tsx   # App header with logo
│   ├── Button.tsx      # Custom button component
│   ├── Card.tsx        # Card container component
│   ├── TextField.tsx   # Input field component
│   ├── MetricCard.tsx  # Dashboard metrics display
│   ├── StatusPill.tsx  # Status indicator component
│   └── AppointmentCard.tsx # Appointment list item
├── screens/            # Screen components
│   ├── SplashScreen.tsx     # Custom splash screen
│   ├── OnboardingName.tsx   # User name onboarding
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Calendar.tsx         # Calendar view
│   ├── Appointments.tsx     # Appointments list
│   ├── AddAppointment.tsx   # Add new appointment
│   ├── AppointmentDetails.tsx # Appointment details
│   └── Settings.tsx         # User settings
├── navigation/         # Navigation configuration
│   ├── RootNav.tsx    # Root navigator
│   └── Tabs.tsx       # Bottom tab navigator
├── data/              # Mock data
│   └── mockAppointments.ts
├── storage/           # Data persistence
│   └── user.ts       # User data storage
├── utils/             # Utility functions
│   ├── calendar.ts   # Calendar helper functions
│   └── selectors.ts  # Data selectors
├── theme.ts          # Design system tokens
└── types.ts          # TypeScript type definitions
```

## 🎯 Key Technologies

- **React Native 0.80.2** - Cross-platform mobile framework
- **React 19.1.0** - UI library
- **React Navigation** - Navigation library
- **TypeScript** - Type safety
- **React Native Calendars** - Calendar component
- **React Native Vector Icons** - Icon library
- **React Native Toast Message** - Notification system
- **AsyncStorage** - Data persistence
- **Day.js** - Date manipulation

## 🔧 Development Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run Android app
npm run ios        # Run iOS app
npm run lint       # Run ESLint
npm test          # Run tests
```

## 📱 Screen Flow

1. **Splash Screen** → Animated logo (2.5s)
2. **Onboarding** → Name input (first-time users only)
3. **Dashboard** → Main overview with metrics and next appointment
4. **Bottom Tabs** → Dashboard | Calendar | Appointments | Settings
5. **Modal Screens** → Add Appointment | Appointment Details

## 🎨 Design System

### Colors

- **Primary**: `#0EA5E9` (Sky Blue)
- **Background**: `#FFFFFF` (White)
- **Text**: `#0A0A0A` (Near Black)
- **Muted**: `#6B7280` (Gray)
- **Card**: `#F8FAFC` (Light Gray)

### Spacing

- **xs**: 6px, **sm**: 10px, **md**: 16px, **lg**: 20px

### Typography

- **H1**: 24px, **H2**: 22px, **Body**: 16px, **Caption**: 13px

## 🚀 Getting Started Guide

1. **First Launch** - See animated splash screen
2. **Set Your Name** - Enter your name for personalization
3. **Explore Dashboard** - View today's appointments and metrics
4. **Add Appointment** - Tap + button to create new appointments
5. **View Calendar** - Check monthly appointment overview
6. **Manage Appointments** - Edit status and add notes
7. **Customize Settings** - Update your profile information

---

**Built with ❤️ using React Native**

```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
```
