import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let analytics: Analytics | null = null;
let db: Firestore;
let storage: FirebaseStorage;

export function initFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app, 'lapiqure');
    storage = getStorage(app);

    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    }
  }
  return { app, auth, analytics, db, storage };
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    initFirebase();
  }
  return auth;
}

export function getFirebaseAnalytics(): Analytics | null {
  if (!analytics && typeof window !== 'undefined') {
    initFirebase();
  }
  return analytics;
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    initFirebase();
  }
  return app;
}

export function getFirebaseFirestore(): Firestore {
  if (!db) {
    initFirebase();
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    initFirebase();
  }
  return storage;
}
