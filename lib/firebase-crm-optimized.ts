import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Firestore,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore'
import {
  Customer,
  Order,
  Interaction,
  Campaign,
  StaffMember,
  Product,
  DashboardMetrics,
} from '@/types/crm'
import { Collection } from '@/types/collection'

interface CacheEntry {
  data: unknown
  timestamp: number
}

const CACHE_DURATION = 10 * 60 * 1000

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class OptimizedCRMService {
  private db: Firestore
  private cache: Map<string, CacheEntry> = new Map()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pendingRequests: Map<string, Promise<any>> = new Map()

  constructor(db: Firestore) {
    this.db = db
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async deduplicateRequest<T>(key: string, fn: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)! as T
    }

    const promise = fn().finally(() => {
      this.pendingRequests.delete(key)
    })

    this.pendingRequests.set(key, promise)
    return promise
  }

  private getCacheKey(collection: string, constraint?: string): string {
    return `${collection}:${constraint || 'all'}`
  }

  private isValidCache(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    return Date.now() - entry.timestamp < CACHE_DURATION
  }

  private setCache<T>(key: string, data: T): T {
    this.cache.set(key, { data, timestamp: Date.now() })
    return data
  }

  private convertCollectionData(data: any): Collection {
    return {
      ...data,
      id: data.id,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt || new Date()),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : (data.updatedAt || new Date()),
      startDate: data.startDate?.toDate ? data.startDate.toDate() : data.startDate,
      endDate: data.endDate?.toDate ? data.endDate.toDate() : data.endDate,
      heroImage: data.heroImage || '',
      image: data.image || '',
      images: Array.isArray(data.images) ? data.images : [],
      story: data.story || '',
      description: data.description || '',
    } as Collection
  }

  private convertProductData(data: any): Product {
    return {
      ...data,
      id: data.id,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt || new Date()),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : (data.updatedAt || new Date()),
      images: Array.isArray(data.images) ? data.images : [],
      availabilityStatus: data.availabilityStatus || 'available',
      isVisible: data.isVisible !== undefined ? data.isVisible : true,
      availabilityMessage: data.availabilityMessage || '',
      orderThreshold: data.orderThreshold,
      autoThresholdEnabled: data.autoThresholdEnabled || false,
    } as Product
  }

  private async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (this.isValidCache(key)) {
      return this.cache.get(key)!.data as T
    }
    const data = await fetcher()
    return this.setCache(key, data)
  }

  clearCache(): void {
    this.cache.clear()
  }

  async getCustomers(constraints: QueryConstraint[] = []): Promise<Customer[]> {
    const key = this.getCacheKey('customers', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_customers'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as Customer))
    })
  }

  async getCustomer(id: string): Promise<Customer | null> {
    const key = this.getCacheKey('customer', id)
    return this.getCached(key, async () => {
      const docRef = doc(this.db, 'crm_customers', id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? ({ ...docSnap.data(), id: docSnap.id } as Customer) : null
    })
  }

  async addCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_customers'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...customer,
      createdAt: now,
      updatedAt: now,
    })
    this.clearCache()
    return docRef.id
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<void> {
    const docRef = doc(this.db, 'crm_customers', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    this.cache.delete(this.getCacheKey('customer', id))
    this.cache.delete(this.getCacheKey('customers', ''))
  }

  async deleteCustomer(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'crm_customers', id))
    this.clearCache()
  }

  async getOrders(constraints: QueryConstraint[] = []): Promise<Order[]> {
    const key = this.getCacheKey('orders', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_orders'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as Order))
    })
  }

  async getOrder(id: string): Promise<Order | null> {
    const key = this.getCacheKey('order', id)
    return this.getCached(key, async () => {
      const docRef = doc(this.db, 'crm_orders', id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? ({ ...docSnap.data(), id: docSnap.id } as Order) : null
    })
  }

  async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_orders'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...order,
      createdAt: now,
      updatedAt: now,
    })
    this.clearCache()
    return docRef.id
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<void> {
    const docRef = doc(this.db, 'crm_orders', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    this.cache.delete(this.getCacheKey('order', id))
  }

  async getInteractions(constraints: QueryConstraint[] = []): Promise<Interaction[]> {
    const key = this.getCacheKey('interactions', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_interactions'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as Interaction))
    })
  }

  async addInteraction(interaction: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_interactions'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...interaction,
      createdAt: now,
      updatedAt: now,
    })
    this.clearCache()
    return docRef.id
  }

  async getCampaigns(constraints: QueryConstraint[] = []): Promise<Campaign[]> {
    const key = this.getCacheKey('campaigns', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_campaigns'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as Campaign))
    })
  }

  async addCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_campaigns'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...campaign,
      createdAt: now,
      updatedAt: now,
    })
    this.clearCache()
    return docRef.id
  }

  async getStaff(constraints: QueryConstraint[] = []): Promise<StaffMember[]> {
    const key = this.getCacheKey('staff', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_staff'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as StaffMember))
    })
  }

  async addStaff(member: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_staff'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...member,
      createdAt: now,
      updatedAt: now,
    })
    this.cache.delete(this.getCacheKey('staff', ''))
    return docRef.id
  }

  async updateStaff(id: string, updates: Partial<StaffMember>): Promise<void> {
    const docRef = doc(this.db, 'crm_staff', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    this.cache.delete(this.getCacheKey('staff', ''))
  }

  async deleteStaff(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'crm_staff', id))
    this.cache.delete(this.getCacheKey('staff', ''))
  }

  async getProducts(constraints: QueryConstraint[] = []): Promise<Product[]> {
    const key = this.getCacheKey('products', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_products'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => 
        this.convertProductData({ ...doc.data(), id: doc.id })
      )
    })
  }

  async getProduct(id: string): Promise<Product | null> {
    const key = this.getCacheKey('product', id)
    return this.getCached(key, async () => {
      const docRef = doc(this.db, 'crm_products', id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? this.convertProductData({ ...docSnap.data(), id: docSnap.id }) : null
    })
  }

  async getPendingOrdersCount(): Promise<number> {
    const key = this.getCacheKey('pending_orders_count', '')
    return this.getCached(key, async () => {
      const orders = await this.getOrders()
      return orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
    })
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_products'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...product,
      createdAt: now,
      updatedAt: now,
    })
    this.cache.delete(this.getCacheKey('products', ''))
    return docRef.id
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const docRef = doc(this.db, 'crm_products', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    this.cache.delete(this.getCacheKey('products', ''))
  }

  async deleteProduct(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'crm_products', id))
    this.cache.delete(this.getCacheKey('products', ''))
  }

  async getCollections(constraints: QueryConstraint[] = []): Promise<Collection[]> {
    const key = this.getCacheKey('collections', JSON.stringify(constraints))
    return this.getCached(key, async () => {
      const q = query(collection(this.db, 'crm_collections'), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => 
        this.convertCollectionData({ ...doc.data(), id: doc.id })
      )
    })
  }

  async getCollection(id: string): Promise<Collection | null> {
    const key = this.getCacheKey('collection', id)
    return this.getCached(key, async () => {
      const docRef = doc(this.db, 'crm_collections', id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? this.convertCollectionData({ ...docSnap.data(), id: docSnap.id }) : null
    })
  }

  async addCollection(collectionData: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_collections'))
    const now = Timestamp.now()
    await setDoc(docRef, {
      ...collectionData,
      createdAt: now,
      updatedAt: now,
    })
    this.cache.delete(this.getCacheKey('collections', ''))
    return docRef.id
  }

  async updateCollection(id: string, updates: Partial<Collection>): Promise<void> {
    const docRef = doc(this.db, 'crm_collections', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    this.cache.delete(this.getCacheKey('collection', id))
    this.cache.delete(this.getCacheKey('collections', ''))
  }

  async deleteCollection(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'crm_collections', id))
    this.clearCache()
  }

  async getActiveCollections(): Promise<Collection[]> {
    return this.getCollections([where('isActive', '==', true), orderBy('name')])
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    return this.getCollections([where('featured', '==', true), limit(5)])
  }

  async getCustomersByTier(tier: string): Promise<Customer[]> {
    return this.getCustomers([where('tier', '==', tier)])
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return this.getOrders([where('status', '==', status)])
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    return this.getOrders([where('customerId', '==', customerId), orderBy('createdAt', 'desc'), limit(50)])
  }

  async getInteractionsByCustomer(customerId: string): Promise<Interaction[]> {
    return this.getInteractions([where('customerId', '==', customerId), orderBy('createdAt', 'desc'), limit(50)])
  }

  async getRecentCustomers(count: number = 10): Promise<Customer[]> {
    return this.getCustomers([orderBy('createdAt', 'desc'), limit(count)])
  }

  async getRecentOrders(count: number = 10): Promise<Order[]> {
    return this.getOrders([orderBy('createdAt', 'desc'), limit(count)])
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const key = 'dashboard_metrics'
    return this.getCached(key, async () => {
      const [customers, orders, interactions] = await Promise.all([
        this.getCustomers(),
        this.getOrders(),
        this.getInteractions([where('completed', '==', false)]),
      ])

      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
      const newCustomersDate = new Date()
      newCustomersDate.setDate(newCustomersDate.getDate() - 30)
      const newCustomers = customers.filter((c) => c.createdAt > newCustomersDate).length
      const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
      const topCustomers = customers.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5)
      const recentOrders = orders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

      return {
        totalRevenue,
        newCustomers,
        pendingOrders,
        activeConversations: interactions.length,
        topCustomers,
        recentOrders,
      }
    })
  }

  async getContent(id: string): Promise<any> {
    const key = this.getCacheKey('content', id)
    return this.getCached(key, async () => {
      const docRef = doc(this.db, 'crm_content', id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : null
    })
  }

  async updateContent(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, 'crm_content', id)
    await setDoc(docRef, { ...data, updatedAt: Timestamp.now() }, { merge: true })
    this.cache.delete(this.getCacheKey('content', id))
  }
}
