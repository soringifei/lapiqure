#!/usr/bin/env node

const { initializeApp, cert, getApps } = require('firebase-admin/app')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')
const fs = require('fs')

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 'C\\Users\\Casanova\\OneDrive\\Desktop\\Alin Website\\lapiqure-29-firebase-adminsdk-fbsvc-a79ce83f55.json'

function initFirebaseAdmin() {
  if (getApps().length) return getFirestore()

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

  initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  })

  return getFirestore()
}

function createDemoData() {
  const now = new Date()

  const customers = [
    {
      id: 'demo_cust_amelia',
      firstName: 'Amelia',
      lastName: 'Voronoi',
      email: 'amelia@example.com',
      tier: 'platinum',
      totalSpent: 12750,
      totalOrders: 9,
      lastPurchaseDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
      createdAt: new Date(now.getFullYear() - 1, 10, 1),
    },
    {
      id: 'demo_cust_kai',
      firstName: 'Kai',
      lastName: 'Mizuno',
      email: 'kai@example.com',
      tier: 'gold',
      totalSpent: 6850,
      totalOrders: 6,
      lastPurchaseDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
      createdAt: new Date(now.getFullYear() - 1, 5, 12),
    },
    {
      id: 'demo_cust_lina',
      firstName: 'Lina',
      lastName: 'Roux',
      email: 'lina@example.com',
      tier: 'silver',
      totalSpent: 2450,
      totalOrders: 3,
      lastPurchaseDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 25),
      createdAt: new Date(now.getFullYear() - 1, 8, 3),
    },
    {
      id: 'demo_cust_mateo',
      firstName: 'Mateo',
      lastName: 'Serra',
      email: 'mateo@example.com',
      tier: 'prospect',
      totalSpent: 850,
      totalOrders: 1,
      lastPurchaseDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 40),
      createdAt: new Date(now.getFullYear(), now.getMonth() - 2, 14),
    },
  ]

  const products = [
    {
      id: 'demo_prod_jacket_zebra',
      name: 'Zebra Embossed Leather Jacket',
      description: 'Hand-finished Italian leather, limited run of 25.',
      price: 1850,
      collection: 'AW25 Nocturne',
      stock: 7,
      size: 'M',
      color: 'Black / Bone',
      tierExclusive: 'gold',
      images: ['/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg'],
    },
    {
      id: 'demo_prod_dress_silk',
      name: 'Bias-cut Silk Column Dress',
      description: 'Double-layered silk with hand-rolled hems.',
      price: 1450,
      collection: 'Resort 25 Atelier',
      stock: 12,
      size: 'S',
      color: 'Ivory',
      tierExclusive: 'platinum',
      images: ['/images/demo/dress1.jpg'],
    },
    {
      id: 'demo_prod_trousers_wool',
      name: 'Tailored Wool Trousers',
      description: 'Super 120s wool with extended tab closure.',
      price: 780,
      collection: 'AW25 Nocturne',
      stock: 18,
      size: 'M',
      color: 'Charcoal',
      tierExclusive: 'silver',
      images: ['/images/demo/trousers1.jpg'],
    },
  ]

  const orders = [
    {
      id: 'demo_order_1001',
      customerId: 'demo_cust_amelia',
      totalAmount: 1850,
      status: 'processing',
      paymentStatus: 'paid',
      items: [
        { productId: 'demo_prod_jacket_zebra', quantity: 1, price: 1850 },
      ],
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
    },
    {
      id: 'demo_order_1002',
      customerId: 'demo_cust_kai',
      totalAmount: 2230,
      status: 'pending',
      paymentStatus: 'awaiting',
      items: [
        { productId: 'demo_prod_trousers_wool', quantity: 2, price: 780 },
        { productId: 'demo_prod_jacket_zebra', quantity: 1, price: 670 },
      ],
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
    },
    {
      id: 'demo_order_1003',
      customerId: 'demo_cust_lina',
      totalAmount: 1450,
      status: 'confirmed',
      paymentStatus: 'paid',
      items: [
        { productId: 'demo_prod_dress_silk', quantity: 1, price: 1450 },
      ],
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
    },
    {
      id: 'demo_order_1004',
      customerId: 'demo_cust_amelia',
      totalAmount: 2630,
      status: 'shipped',
      paymentStatus: 'paid',
      items: [
        { productId: 'demo_prod_dress_silk', quantity: 1, price: 1450 },
        { productId: 'demo_prod_trousers_wool', quantity: 1, price: 780 },
        { productId: 'demo_prod_jacket_zebra', quantity: 1, price: 400 },
      ],
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12),
    },
    {
      id: 'demo_order_1005',
      customerId: 'demo_cust_mateo',
      totalAmount: 850,
      status: 'delivered',
      paymentStatus: 'paid',
      items: [
        { productId: 'demo_prod_trousers_wool', quantity: 1, price: 850 },
      ],
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30),
    },
    {
      id: 'demo_order_1006',
      customerId: 'demo_cust_kai',
      totalAmount: 780,
      status: 'cancelled',
      paymentStatus: 'refunded',
      items: [
        { productId: 'demo_prod_trousers_wool', quantity: 1, price: 780 },
      ],
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15),
    },
  ]

  const staff = [
    {
      id: 'demo_staff_elena',
      firstName: 'Elena',
      lastName: 'Boutique',
      email: 'elena@lapiqure.com',
      role: 'manager',
      isActive: true,
      assignedCustomers: ['demo_cust_amelia', 'demo_cust_kai'],
    },
    {
      id: 'demo_staff_isaac',
      firstName: 'Isaac',
      lastName: 'Studio',
      email: 'isaac@lapiqure.com',
      role: 'staff',
      isActive: true,
      assignedCustomers: ['demo_cust_lina', 'demo_cust_mateo'],
    },
  ]

  return { customers, products, orders, staff }
}

async function seed() {
  try {
    const db = initFirebaseAdmin()
    const { customers, products, orders, staff } = createDemoData()

    const batch = db.batch()

    customers.forEach((c) => {
      const ref = db.collection('crm_customers').doc(c.id)
      batch.set(ref, {
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        tier: c.tier,
        totalSpent: c.totalSpent,
        totalOrders: c.totalOrders,
        lastPurchaseDate: Timestamp.fromDate(c.lastPurchaseDate),
        createdAt: Timestamp.fromDate(c.createdAt),
        updatedAt: Timestamp.now(),
      })
    })

    products.forEach((p) => {
      const ref = db.collection('crm_products').doc(p.id)
      batch.set(ref, {
        name: p.name,
        description: p.description,
        price: p.price,
        collection: p.collection,
        stock: p.stock,
        size: p.size,
        color: p.color,
        tierExclusive: p.tierExclusive,
        images: p.images,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    })

    orders.forEach((o) => {
      const ref = db.collection('crm_orders').doc(o.id)
      batch.set(ref, {
        customerId: o.customerId,
        totalAmount: o.totalAmount,
        status: o.status,
        paymentStatus: o.paymentStatus,
        items: o.items,
        createdAt: Timestamp.fromDate(o.createdAt),
        updatedAt: Timestamp.now(),
      })
    })

    staff.forEach((s) => {
      const ref = db.collection('crm_staff').doc(s.id)
      batch.set(ref, {
        firstName: s.firstName,
        lastName: s.lastName,
        email: s.email,
        role: s.role,
        isActive: s.isActive,
        assignedCustomers: s.assignedCustomers,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    })

    await batch.commit()

    console.log('Seeded demo CRM data successfully')
    process.exit(0)
  } catch (err) {
    console.error('Failed to seed demo CRM data:', err)
    process.exit(1)
  }
}

seed()
