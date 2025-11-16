#!/usr/bin/env node

/**
 * One-time script to make alin@lapiqure.com a CRM admin.
 *
 * Usage:
 *   1. Install firebase-admin in your project root:
 *        npm install firebase-admin
 *   2. Create a Firebase service account key in the console and set:
 *        set GOOGLE_APPLICATION_CREDENTIALS=C:\\path\\to\\serviceAccountKey.json   (Windows)
 *   3. Run this script from the project root:
 *        node scripts/setAdminUser.js
 */

// CommonJS version so it runs with plain `node` without enabling ES modules
const { initializeApp, cert, getApps } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const { getFirestore } = require('firebase-admin/firestore')
const fs = require('fs')

const ADMIN_EMAIL = 'alin@lapiqure.com'
const ADMIN_PASSWORD = 'P@$$w0rd11Kbn90!'

function initFirebaseAdmin() {
  if (getApps().length) return

  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 'C:\\Users\\Casanova\\OneDrive\\Desktop\\Alin Website\\lapiqure-29-firebase-adminsdk-fbsvc-a79ce83f55.json'
  console.log('Using service account:', serviceAccountPath)

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

  initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  })
}

async function main() {
  try {
    initFirebaseAdmin()

    const auth = getAuth()
    const db = getFirestore()

    console.log(`Looking up user: ${ADMIN_EMAIL}`)
    let userRecord
    try {
      userRecord = await auth.getUserByEmail(ADMIN_EMAIL)
      console.log('Found existing user UID:', userRecord.uid)
    } catch (err) {
      if (err && err.code === 'auth/user-not-found') {
        console.log('User not found, creating new admin user...')
        userRecord = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          emailVerified: true,
        })
        console.log('Created user UID:', userRecord.uid)
      } else {
        throw err
      }
    }

    const staffRef = db.collection('crm_staff').doc(userRecord.uid)

    const staffDoc = {
      email: ADMIN_EMAIL,
      firstName: userRecord.displayName?.split(' ')[0] || 'Admin',
      lastName: userRecord.displayName?.split(' ').slice(1).join(' ') || 'User',
      role: 'admin',
      isActive: true,
      assignedCustomers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await staffRef.set(staffDoc, { merge: true })

    console.log('✅ Successfully set admin role for', ADMIN_EMAIL)
    process.exit(0)
  } catch (err) {
    console.error('❌ Failed to set admin user:', err)
    process.exit(1)
  }
}

main()
