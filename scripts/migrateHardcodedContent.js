#!/usr/bin/env node

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccountPath =
	process.env.GOOGLE_APPLICATION_CREDENTIALS ||
	'C:\\Users\\Casanova\\OneDrive\\Desktop\\lapiqure-29-firebase-adminsdk-fbsvc-5f196c1d13.json';

function initFirebaseAdmin() {
	if (getApps().length) return getFirestore('lapiqure');

	const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

	initializeApp({
		credential: cert(serviceAccount),
		projectId: serviceAccount.project_id,
	});

	return getFirestore('lapiqure');
}

async function migrate() {
  try {
    const db = initFirebaseAdmin();
    const batch = db.batch();
    const now = Timestamp.now();

    console.log('Migrating hardcoded content to Firestore...');

    // 1. Migrate Home Page Content
    const homeContentRef = db.collection('crm_content').doc('home');
    batch.set(homeContentRef, {
      id: 'home',
      title: 'Home',
      slug: 'home',
      heroTitle: 'AW 2024',
      heroDescription: 'Material. Craft. Time.',
      heroImage: '/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg',
      sections: [
        {
          title: 'Our Philosophy',
          content: 'We design with restraint. Each collection begins with material research—working directly with mills and artisans to understand the properties of fiber, weave, and finish.',
          image: ''
        }
      ],
      cta: {
        text: 'View Collection',
        href: '/pieces'
      },
      updatedAt: now.toDate().toISOString()
    });

    // 2. Migrate Hardcoded Images as Collections
    const editorialImages = [
      { src: '/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs3_opt.jpg', alt: 'Campaign Image 1', title: 'Sleeveless Studio' },
      { src: '/images/faux_leather_cropped_pants3_opt.jpeg', alt: 'Campaign Image 2', title: 'Leather Cropped' },
      { src: '/images/oversized_green_faux_leather_pants3_opt.jpg', alt: 'Campaign Image 3', title: 'Oversized Green' },
      { src: '/images/cutsew_distressed_knit_top3_opt.jpeg', alt: 'Campaign Image 4', title: 'Distressed Knit' },
    ];

    editorialImages.forEach((img, index) => {
      const collectionId = `migrated_col_${index + 1}`;
      const colRef = db.collection('crm_collections').doc(collectionId);
      batch.set(colRef, {
        name: `AW24 Editorial ${index + 1}`,
        description: img.title,
        season: 'AW24',
        heroImage: img.src,
        isActive: true,
        featured: true,
        createdAt: now,
        updatedAt: now
      });
    });

    await batch.commit();
    console.log('✅ Successfully migrated content and collections!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
