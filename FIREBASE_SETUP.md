# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Follow the setup wizard

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in provider
   - Add your support email
   - Save

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ (Project Settings)
2. Scroll down to "Your apps"
3. Click the web icon `</>` to add a web app
4. Register app with nickname (e.g., "LA PIQÛRE Web")
5. Copy the `firebaseConfig` object values

## Step 4: Configure Environment Variables

1. Open `.env.local` file in the project root
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 5: Restart Dev Server

After adding credentials:

```powershell
# Stop the current dev server (Ctrl+C)
npm run dev
```

## Optional: Set up Firestore Database

1. Go to **Build > Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" (we'll add rules later)
4. Select a location (choose closest to your users)

### Firestore Rules (for development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write
    match /collections/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /pieces/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Error: auth/invalid-api-key
- Check that `.env.local` exists
- Verify all values are correct (no quotes, no spaces)
- Restart dev server after changes

### Error: auth/unauthorized-domain
- In Firebase Console > Authentication > Settings > Authorized domains
- Add `localhost` and your production domain

### Google Sign-In Not Working
- Make sure Google provider is enabled in Firebase Console
- Check that you've added a support email in the Google provider settings
