'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Package, MapPin, Heart, Bell, CreditCard, Lock, ChevronRight, Mail, Phone, Calendar } from 'lucide-react';

type TabType = 'orders' | 'profile' | 'addresses' | 'payment' | 'preferences';

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  if (!user) {
    router.push('/auth');
    return null;
  }

  const sampleOrders = [
    {
      id: 'LP12345678',
      date: '2025-01-05',
      status: 'Delivered',
      total: 1250,
      items: [
        {
          name: 'Vintage Leather Jacket',
          image: '/images/pieces/vintage_black_leather_jacket1_opt.jpg',
          price: 1250,
          size: 'M'
        }
      ]
    },
    {
      id: 'LP12345679',
      date: '2024-12-20',
      status: 'In Transit',
      total: 890,
      items: [
        {
          name: 'Wool Turtleneck Sweater',
          image: '/images/pieces/turtleneck_sweater_with_intarsia_pattern1_opt.jpg',
          price: 890,
          size: 'L'
        }
      ]
    }
  ];

  const tabs = [
    { id: 'orders' as TabType, label: 'Order History', icon: Package },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'addresses' as TabType, label: 'Addresses', icon: MapPin },
    { id: 'payment' as TabType, label: 'Payment Methods', icon: CreditCard },
    { id: 'preferences' as TabType, label: 'Preferences', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-paper pt-20 sm:pt-24"><div className="border-b border-ink/10 bg-sand/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl tracking-[0.15em] uppercase text-ink mb-3">
                My Account
              </h1>
              <p className="font-sans text-sm text-ink-700">
                Welcome back, {user.email?.split('@')[0]}
              </p>
            </div>
            <Link href="/wishlist" className="group flex items-center gap-2 px-4 py-2 border border-ink/20 hover:border-ink transition-colors">
              <Heart className="h-4 w-4 text-ink-700" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-700 group-hover:text-ink">
                Wishlist
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-12"><aside>
            <nav className="space-y-2 lg:sticky lg:top-32">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 border transition-all ${
                      activeTab === tab.id
                        ? 'border-ink bg-ink text-paper'
                        : 'border-ink/10 hover:border-ink/30 hover:bg-sand/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                      <span className="font-mono text-[10px] uppercase tracking-wide">
                        {tab.label}
                      </span>
                    </div>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform ${
                      activeTab === tab.id ? 'translate-x-0' : '-translate-x-1 opacity-0'
                    }`} strokeWidth={1.5} />
                  </button>
                );
              })}
            </nav>
          </aside><main>{activeTab === 'orders' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-2">
                    Order History
                  </h2>
                  <p className="font-sans text-sm text-ink-700">
                    View and track your orders
                  </p>
                </div>

                <div className="space-y-6">
                  {sampleOrders.map((order) => (
                    <div key={order.id} className="border border-ink/10 p-6 hover:border-ink/30 transition-colors">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700 mb-1">
                            Order Number
                          </p>
                          <p className="font-display text-lg tracking-[0.1em] text-ink">
                            {order.id}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700 mb-1">
                            Status
                          </p>
                          <span className={`inline-block px-3 py-1 font-mono text-[9px] uppercase tracking-wide border ${
                            order.status === 'Delivered' 
                              ? 'border-green-600 text-green-700 bg-green-50'
                              : 'border-ink/20 text-ink-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="relative w-20 h-24 bg-sand/20 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                                quality={80}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-sans text-sm text-ink mb-1">{item.name}</h3>
                              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700 mb-2">
                                Size {item.size}
                              </p>
                              <p className="font-display text-base text-ink">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-ink/10">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700 mb-1">
                            Order Date
                          </p>
                          <p className="font-sans text-sm text-ink">
                            {new Date(order.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <button className="px-6 py-3 border border-ink/20 font-mono text-xs uppercase tracking-wide text-ink hover:border-ink hover:bg-sand/5 transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {sampleOrders.length === 0 && (
                  <div className="text-center py-20 border border-ink/10">
                    <Package className="h-12 w-12 text-ink/20 mx-auto mb-4" strokeWidth={1} />
                    <h3 className="font-display text-lg tracking-[0.1em] uppercase text-ink mb-2">
                      No Orders Yet
                    </h3>
                    <p className="font-sans text-sm text-ink-700 mb-6">
                      Start building your collection
                    </p>
                    <Link href="/pieces">
                      <button className="bg-ink text-paper px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all">
                        Browse Pieces
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}{activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-2">
                    Profile Information
                  </h2>
                  <p className="font-sans text-sm text-ink-700">
                    Manage your personal details
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                      <Mail className="inline h-3 w-3 mr-1" strokeWidth={1.5} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email || ''}
                      className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                      <Phone className="inline h-3 w-3 mr-1" strokeWidth={1.5} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                      <Calendar className="inline h-3 w-3 mr-1" strokeWidth={1.5} />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-ink text-paper px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="border border-ink/20 text-ink px-8 py-3 font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form><div className="pt-8 border-t border-ink/10">
                  <h3 className="font-display text-lg tracking-[0.1em] uppercase text-ink mb-4">
                    <Lock className="inline h-4 w-4 mr-2" strokeWidth={1.5} />
                    Password & Security
                  </h3>
                  <button className="border border-ink/20 text-ink px-6 py-3 font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all">
                    Change Password
                  </button>
                </div>
              </div>
            )}{activeTab === 'addresses' && (
              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-2">
                      Saved Addresses
                    </h2>
                    <p className="font-sans text-sm text-ink-700">
                      Manage your shipping addresses
                    </p>
                  </div>
                  <button className="bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all">
                    Add New
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-ink/10 p-6 hover:border-ink/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-ink text-paper font-mono text-[9px] uppercase tracking-wide">
                        Default
                      </span>
                      <button className="text-ink-700 hover:text-ink font-mono text-[10px] uppercase tracking-wide">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p className="font-sans text-sm text-ink font-medium">John Doe</p>
                      <p className="font-sans text-sm text-ink-700">
                        123 Fashion Street, Apt 4B<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                      <p className="font-sans text-sm text-ink-700 pt-2">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}{activeTab === 'payment' && (
              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-2">
                      Payment Methods
                    </h2>
                    <p className="font-sans text-sm text-ink-700">
                      Manage your saved payment methods
                    </p>
                  </div>
                  <button className="bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all">
                    Add Card
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border border-ink/10 p-6 hover:border-ink/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 border border-ink/20 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-ink" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-mono text-sm text-ink mb-1">•••• •••• •••• 4242</p>
                          <p className="font-sans text-xs text-ink-700">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-ink-700 hover:text-ink font-mono text-[10px] uppercase tracking-wide">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-sand/5 border border-ink/10">
                  <p className="font-sans text-xs text-ink-700 leading-relaxed">
                    <Lock className="inline h-3 w-3 mr-1" strokeWidth={1.5} />
                    Your payment information is encrypted and stored securely. We never share your financial details.
                  </p>
                </div>
              </div>
            )}{activeTab === 'preferences' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-2">
                    Preferences
                  </h2>
                  <p className="font-sans text-sm text-ink-700">
                    Customize your experience
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="pb-6 border-b border-ink/10">
                    <h3 className="font-mono text-[10px] uppercase tracking-wide text-ink mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="font-sans text-sm text-ink-700 group-hover:text-ink transition-colors">
                          New arrivals and collection launches
                        </span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="font-sans text-sm text-ink-700 group-hover:text-ink transition-colors">
                          Order updates and shipping notifications
                        </span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="font-sans text-sm text-ink-700 group-hover:text-ink transition-colors">
                          Exclusive offers and promotions
                        </span>
                        <input type="checkbox" className="w-4 h-4" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="font-sans text-sm text-ink-700 group-hover:text-ink transition-colors">
                          Styling tips and editorial content
                        </span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </label>
                    </div>
                  </div>

                  <div className="pb-6 border-b border-ink/10">
                    <h3 className="font-mono text-[10px] uppercase tracking-wide text-ink mb-4">
                      Currency & Language
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          Currency
                        </label>
                        <select className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors bg-paper">
                          <option>USD - US Dollar</option>
                          <option>EUR - Euro</option>
                          <option>GBP - British Pound</option>
                          <option>JPY - Japanese Yen</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          Language
                        </label>
                        <select className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors bg-paper">
                          <option>English</option>
                          <option>Français</option>
                          <option>Italiano</option>
                          <option>日本語</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button className="bg-ink text-paper px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
