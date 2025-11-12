import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

const ZOHO_API_KEY = process.env.ZOHO_API_KEY
const ZOHO_API_BASE = 'https://www.zohoapis.com/mail/api/v1.0'

export const sendCampaignEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const { campaignId, recipients, subject, htmlBody } = data

  try {
    for (const recipientId of recipients) {
      const customer = await db.collection('crm_customers').doc(recipientId).get()
      if (!customer.exists) continue

      const { email, firstName } = customer.data() as any

      const response = await fetch(`${ZOHO_API_BASE}/accounts/1234567890/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ZOHO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: email,
          subject: subject,
          htmlBody: htmlBody.replace('{firstName}', firstName)
        })
      })

      if (!response.ok) {
        console.error(`Failed to send email to ${email}`)
      }
    }

    await db.collection('crm_campaigns').doc(campaignId).update({
      status: 'running',
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      'metrics.sent': recipients.length
    })

    return { success: true, count: recipients.length }
  } catch (error) {
    console.error('Campaign send error:', error)
    throw new functions.https.HttpsError('internal', 'Failed to send campaign')
  }
})

export const calculateCustomerMetrics = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const customers = await db.collection('crm_customers').get()

    for (const doc of customers.docs) {
      const customerId = doc.id
      const orders = await db.collection('crm_orders').where('customerId', '==', customerId).get()

      let totalSpent = 0
      let totalOrders = 0
      let lastPurchaseDate = null

      orders.forEach(order => {
        const orderData = order.data() as any
        if (orderData.status === 'delivered' || orderData.paymentStatus === 'paid') {
          totalSpent += orderData.totalAmount
          totalOrders += 1
          if (!lastPurchaseDate || orderData.createdAt > lastPurchaseDate) {
            lastPurchaseDate = orderData.createdAt
          }
        }
      })

      let tier = 'prospect'
      if (totalSpent > 50000) tier = 'platinum'
      else if (totalSpent > 25000) tier = 'gold'
      else if (totalSpent > 5000) tier = 'silver'

      await db.collection('crm_customers').doc(customerId).update({
        totalSpent,
        totalOrders,
        lastPurchaseDate,
        tier,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
    }

    return null
  })

export const sendFollowUpReminders = functions.pubsub
  .schedule('every 8 hours')
  .onRun(async (context) => {
    const now = new Date()
    const interactions = await db.collection('crm_interactions')
      .where('completed', '==', false)
      .where('followUpDate', '<=', now)
      .get()

    for (const doc of interactions.docs) {
      const interaction = doc.data() as any
      const staff = await db.collection('crm_staff').doc(interaction.staffId).get()
      const customer = await db.collection('crm_customers').doc(interaction.customerId).get()

      if (staff.exists && customer.exists) {
        console.log(`Reminder: Follow up with ${customer.data()?.firstName} for ${interaction.subject}`)
      }
    }

    return null
  })

export const scheduleEmailCampaigns = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    const now = new Date()
    const campaigns = await db.collection('crm_campaigns')
      .where('status', '==', 'scheduled')
      .where('scheduledFor', '<=', now)
      .get()

    for (const doc of campaigns.docs) {
      const campaign = doc.data() as any
      await db.collection('crm_campaigns').doc(doc.id).update({
        status: 'running',
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      })
    }

    return null
  })
