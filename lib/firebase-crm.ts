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
} from 'firebase/firestore';
import {
  Customer,
  Order,
  Interaction,
  Campaign,
  StaffMember,
  Product,
  DashboardMetrics,
} from '@/types/crm';

export class CRMService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async getCustomers(constraints: QueryConstraint[] = []): Promise<Customer[]> {
    const q = query(collection(this.db, 'crm_customers'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Customer));
  }

  async getCustomer(id: string): Promise<Customer | null> {
    const docRef = doc(this.db, 'crm_customers', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ ...docSnap.data(), id: docSnap.id } as Customer) : null;
  }

  async addCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_customers'));
    const now = Timestamp.now();
    await setDoc(docRef, {
      ...customer,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<void> {
    const docRef = doc(this.db, 'crm_customers', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  }

  async deleteCustomer(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'crm_customers', id));
  }

  async getOrders(constraints: QueryConstraint[] = []): Promise<Order[]> {
    const q = query(collection(this.db, 'crm_orders'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Order));
  }

  async getOrder(id: string): Promise<Order | null> {
    const docRef = doc(this.db, 'crm_orders', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ ...docSnap.data(), id: docSnap.id } as Order) : null;
  }

  async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_orders'));
    const now = Timestamp.now();
    await setDoc(docRef, {
      ...order,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<void> {
    const docRef = doc(this.db, 'crm_orders', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  }

  async getInteractions(constraints: QueryConstraint[] = []): Promise<Interaction[]> {
    const q = query(collection(this.db, 'crm_interactions'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Interaction));
  }

  async addInteraction(interaction: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_interactions'));
    const now = Timestamp.now();
    await setDoc(docRef, {
      ...interaction,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updateInteraction(id: string, updates: Partial<Interaction>): Promise<void> {
    const docRef = doc(this.db, 'crm_interactions', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  }

  async getCampaigns(constraints: QueryConstraint[] = []): Promise<Campaign[]> {
    const q = query(collection(this.db, 'crm_campaigns'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Campaign));
  }

  async addCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_campaigns'));
    const now = Timestamp.now();
    await setDoc(docRef, {
      ...campaign,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<void> {
    const docRef = doc(this.db, 'crm_campaigns', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  }

  async getStaff(constraints: QueryConstraint[] = []): Promise<StaffMember[]> {
    const q = query(collection(this.db, 'crm_staff'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as StaffMember));
  }

  async getStaffMember(id: string): Promise<StaffMember | null> {
    const docRef = doc(this.db, 'crm_staff', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ ...docSnap.data(), id: docSnap.id } as StaffMember) : null;
  }

  async addStaffMember(staff: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(this.db, 'crm_staff'));
    const now = Timestamp.now();
    await setDoc(docRef, {
      ...staff,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updateStaffMember(id: string, updates: Partial<StaffMember>): Promise<void> {
    const docRef = doc(this.db, 'crm_staff', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  }

  async getProducts(constraints: QueryConstraint[] = []): Promise<Product[]> {
    const q = query(collection(this.db, 'crm_products'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product));
  }

  async getCustomersByTier(tier: string): Promise<Customer[]> {
    return this.getCustomers([where('tier', '==', tier)]);
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return this.getOrders([where('status', '==', status)]);
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    return this.getOrders([where('customerId', '==', customerId), orderBy('createdAt', 'desc')]);
  }

  async getInteractionsByCustomer(customerId: string): Promise<Interaction[]> {
    return this.getInteractions([where('customerId', '==', customerId), orderBy('createdAt', 'desc')]);
  }

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    const customers = await this.getCustomers([where('email', '==', email), limit(1)]);
    return customers.length > 0 ? customers[0] : null;
  }

  async getRecentCustomers(count: number = 10): Promise<Customer[]> {
    return this.getCustomers([orderBy('createdAt', 'desc'), limit(count)]);
  }

  async getRecentOrders(count: number = 10): Promise<Order[]> {
    return this.getOrders([orderBy('createdAt', 'desc'), limit(count)]);
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const customers = await this.getCustomers();
    const orders = await this.getOrders();
    const interactions = await this.getInteractions([where('completed', '==', false)]);

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const newCustomersDate = new Date();
    newCustomersDate.setDate(newCustomersDate.getDate() - 30);
    const newCustomers = customers.filter((c) => c.createdAt > newCustomersDate).length;
    const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
    const topCustomers = customers.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
    const recentOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    return {
      totalRevenue,
      newCustomers,
      pendingOrders,
      activeConversations: interactions.length,
      topCustomers,
      recentOrders,
    };
  }
}
