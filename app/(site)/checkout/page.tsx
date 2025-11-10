'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Lock, CreditCard, Package, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = totalPrice >= 500 ? 0 : 35;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const [shippingForm, setShippingForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveCard: false,
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 border-2 border-ink/20 flex items-center justify-center mx-auto mb-8">
            <Package className="h-12 w-12 text-ink/20" strokeWidth={1} />
          </div>
          <h1 className="font-display text-3xl tracking-[0.1em] uppercase text-ink mb-4">
            Your Cart is Empty
          </h1>
          <p className="font-sans text-sm text-ink-700 mb-8 leading-relaxed">
            Add pieces to your cart before proceeding to checkout
          </p>
          <Link href="/pieces">
            <button className="bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all">
              Browse Collection
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      router.push('/order-confirmation');
    }, 2000);
  };

  useEffect(() => {
    return () => {
      setIsProcessing(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-ink/10 bg-paper sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link href="/pieces" className="group flex items-center gap-2 text-ink-700 hover:text-ink transition-colors">
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-wide">Back to Shop</span>
            </Link>
            <h1 className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase text-ink">
              Checkout
            </h1>
            <div className="flex items-center gap-2 text-ink-700">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="font-mono text-[9px] uppercase tracking-wide hidden sm:inline">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,480px] gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-3 ${step === 'shipping' ? 'text-ink' : 'text-ink-700'}`}>
                <div className={`w-8 h-8 border flex items-center justify-center font-mono text-xs transition-all ${
                  step === 'shipping' ? 'border-ink bg-ink text-paper' : 'border-ink/20'
                }`}>
                  1
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wide hidden sm:inline">Shipping</span>
              </div>
              <div className="h-px flex-1 bg-ink/10" />
              <div className={`flex items-center gap-3 ${step === 'payment' ? 'text-ink' : 'text-ink-700'}`}>
                <div className={`w-8 h-8 border flex items-center justify-center font-mono text-xs transition-all ${
                  step === 'payment' ? 'border-ink bg-ink text-paper' : 'border-ink/20'
                }`}>
                  2
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wide hidden sm:inline">Payment</span>
              </div>
            </div>

            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-6">
                    Shipping Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Apartment, Suite, etc.
                      </label>
                      <input
                        type="text"
                        value={shippingForm.apartment}
                        onChange={(e) => setShippingForm({ ...shippingForm, apartment: e.target.value })}
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        placeholder="Optional"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          Country
                        </label>
                        <select
                          required
                          value={shippingForm.country}
                          onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors bg-paper"
                        >
                          <option value="">Select</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="FR">France</option>
                          <option value="IT">Italy</option>
                          <option value="JP">Japan</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          State / Province
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingForm.zip}
                          onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        placeholder="For delivery updates"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-8">
                <div className="p-6 bg-sand/5 border border-ink/10">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-ink-700 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="flex-1">
                      <h3 className="font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Shipping To
                      </h3>
                      <p className="font-sans text-sm text-ink">
                        {shippingForm.firstName} {shippingForm.lastName}
                      </p>
                      <p className="font-sans text-sm text-ink-700 mt-1">
                        {shippingForm.address}
                        {shippingForm.apartment && `, ${shippingForm.apartment}`}
                        <br />
                        {shippingForm.city}, {shippingForm.state} {shippingForm.zip}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="font-mono text-[9px] uppercase tracking-wide text-ink-700 hover:text-ink transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-6">
                    Payment Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 pr-12 font-mono text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/30" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentForm.cardName}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                        className="w-full border border-ink/20 px-4 py-3 font-sans text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                        placeholder="Name on card"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentForm.expiry}
                          onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-mono text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          placeholder="MM / YY"
                          maxLength={7}
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentForm.cvv}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                          className="w-full border border-ink/20 px-4 py-3 font-mono text-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 pt-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={paymentForm.saveCard}
                        onChange={(e) => setPaymentForm({ ...paymentForm, saveCard: e.target.checked })}
                        className="w-4 h-4 border border-ink/20 text-ink focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="font-sans text-sm text-ink-700 group-hover:text-ink transition-colors">
                        Save card for future purchases
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('shipping');
                      setIsProcessing(false);
                    }}
                    className="flex-1 border border-ink/20 text-ink px-8 py-4 font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Complete Order
                      </>
                    )}
                  </button>
                </div>

                <p className="font-sans text-xs text-ink-700 text-center leading-relaxed">
                  Your payment information is encrypted and secure. By completing this purchase, you agree to our terms and conditions.
                </p>
              </form>
            )}
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <div className="border border-ink/10 bg-sand/5 p-8">
              <h2 className="font-display text-xl tracking-[0.15em] uppercase text-ink mb-6">
                Order Summary
              </h2>

              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-sand/20 flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        quality={80}
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-ink text-paper rounded-full flex items-center justify-center font-mono text-[10px]">
                          {item.quantity}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-sm text-ink line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <p className="font-mono text-[9px] uppercase tracking-wide text-ink-700">
                        Size {item.selectedSize}
                      </p>
                      <p className="font-display text-base text-ink mt-2">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-ink/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-700">
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-sans text-sm text-ink">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-700">
                    Shipping
                  </span>
                  <span className="font-sans text-sm text-ink">
                    {shipping === 0 ? (
                      <span className="text-green-700">Free</span>
                    ) : (
                      `$${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-700">
                    Tax (estimated)
                  </span>
                  <span className="font-sans text-sm text-ink">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-ink/10">
                <span className="font-display text-base tracking-[0.1em] uppercase text-ink">
                  Total
                </span>
                <span className="font-display text-2xl text-ink">
                  ${total.toFixed(2)}
                </span>
              </div>

              {shipping === 0 && (
                <div className="mt-6 p-3 bg-green-50 border border-green-200">
                  <p className="font-mono text-[9px] uppercase tracking-wide text-green-800 text-center">
                    ✓ Free Shipping Applied
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
