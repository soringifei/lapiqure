import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
      throw new Error(
        'Firebase Admin credentials are not configured. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY in your environment.',
      );
    }
  }
  return getFirestore();
}
