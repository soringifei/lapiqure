import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// Import only the types to avoid issues if firebase-functions is not used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as _functions from 'firebase-functions';

// Helper to try and get config from firebase-functions if available
const getFirebaseConfig = (key: string): string | undefined => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const functions = require('firebase-functions');
    // Map keys like 'FIREBASE_CLIENT_EMAIL' -> 'service.client_email'
    const [service, param] = key.toLowerCase().replace('firebase_', 'service.').split('_');
    const config = functions.config();
    if (config[service] && config[service][param]) {
      return config[service][param];
    }
    // Handle stripe separately
    if (key === 'STRIPE_SECRET_KEY') {
        return config.stripe?.secret;
    }
  } catch {
    // ignore
  }
  return undefined;
};

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || getFirebaseConfig('FIREBASE_CLIENT_EMAIL'),
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || getFirebaseConfig('FIREBASE_PRIVATE_KEY'))?.replace(/\\n/g, '\n'),
};

export function initFirebaseAdmin() {
  if (!getApps().length) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      initializeApp();
    } else if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      initializeApp({
        credential: cert({
          projectId: serviceAccount.projectId,
          clientEmail: serviceAccount.clientEmail,
          privateKey: serviceAccount.privateKey,
        }),
      });
    } else {
      // In Cloud Functions environment (Firebase Gen 1/2), default credentials might work automatically
      // without explicit cert() if the environment is set up correctly.
      try {
         initializeApp();
      } catch {
         throw new Error(
            'Firebase Admin credentials are not configured. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY in your environment.',
         );
      }
    }
  }
  return getFirestore();
}
