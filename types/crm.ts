export type UserRole = 'admin' | 'manager' | 'staff';
export type CustomerTier = 'platinum' | 'gold' | 'silver' | 'prospect';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type InteractionType = 'call' | 'email' | 'note' | 'meeting' | 'sms';
export type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'completed' | 'paused';
export type AvailabilityStatus = 'available' | 'unavailable' | 'extended-shipping' | 'pre-order' | 'made-to-order';

export interface Customer {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  tier: CustomerTier;
  company?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  preferences?: {
    sizes: string[];
    colors: string[];
    styles: string[];
  };
  tags: string[];
  totalSpent: number;
  totalOrders: number;
  lastPurchaseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  assignedStaffId?: string;
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  staffId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  shippingAddress?: Customer['address'];
  billingAddress?: Customer['address'];
  createdAt: Date;
  updatedAt: Date;
  expectedDelivery?: Date;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  size?: string;
  color?: string;
}

export interface Interaction {
  id: string;
  customerId: string;
  staffId: string;
  type: InteractionType;
  subject?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  followUpDate?: Date;
  completed: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  targetTiers: CustomerTier[];
  targetTags?: string[];
  status: CampaignStatus;
  emailTemplate?: string;
  scheduledFor?: Date;
  sentAt?: Date;
  recipients: string[];
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    bounced: number;
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  assignedCustomers: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  collection: string;
  stock: number;
  images: string[];
  size?: string;
  color?: string;
  tierExclusive?: CustomerTier;
  featured?: boolean;
  availabilityStatus?: AvailabilityStatus;
  isVisible?: boolean;
  availabilityMessage?: string;
  orderThreshold?: number;
  autoThresholdEnabled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMetrics {
  totalRevenue: number;
  newCustomers: number;
  pendingOrders: number;
  activeConversations: number;
  topCustomers: Customer[];
  recentOrders: Order[];
}
