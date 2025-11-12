'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface AppointmentFormProps {
  location?: string;
}

export default function AppointmentForm({ location }: AppointmentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: location || '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointment request');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: location || '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });

      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    } catch {
      setError('Failed to send request. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-6 py-3 border border-ink/20 text-ink font-display text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all group"
      >
        <span className="flex items-center justify-center gap-2">
          Book Appointment
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-paper shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-ink-700 hover:text-ink transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-sand/10 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="relative h-8 w-[140px] mb-12">
                    <Image 
                      src="/brand/logo.png" 
                      alt="LA PIQÛRE" 
                      fill 
                      sizes="140px" 
                      className="object-contain object-left"
                    />
                  </div>
                  
                  <h2 className="font-display text-3xl tracking-luxury text-ink mb-6">
                    Private Appointment
                  </h2>
                  <p className="font-sans text-base text-ink-700 leading-relaxed mb-8">
                    Schedule a private viewing to explore the full collection and receive personalized styling advice.
                  </p>
                </div>
                
                <div className="space-y-4 text-sm font-sans text-ink-700">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-ink mt-2 flex-shrink-0" />
                    <p>Private collection viewing</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-ink mt-2 flex-shrink-0" />
                    <p>Personalization consultations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-ink mt-2 flex-shrink-0" />
                    <p>Expert styling advisory</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-ink mt-2 flex-shrink-0" />
                    <p>Archive pieces access</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 lg:p-12">

                {success ? (
                  <div className="py-16 text-center">
                    <div className="w-20 h-20 bg-ink mx-auto mb-8 flex items-center justify-center">
                      <svg className="w-10 h-10 text-paper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl tracking-luxury text-ink mb-4">
                      Request Sent
                    </h3>
                    <p className="font-sans text-base text-ink-700 leading-relaxed">
                      We&apos;ll contact you within 24 hours to confirm your appointment.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                          Location *
                        </label>
                        <select
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                        >
                          <option value="">Select Location</option>
                          <option value="Paris">Paris</option>
                          <option value="New York">New York</option>
                          <option value="Tokyo">Tokyo</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          required
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          required
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                        >
                          <option value="">Select Time</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-display text-xs uppercase tracking-wide text-ink mb-3">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your styling needs or any specific pieces you're interested in..."
                        className="w-full px-4 py-3 border border-ink/20 bg-paper font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200">
                        <p className="font-sans text-sm text-red-800">{error}</p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-8 py-4 border border-ink/20 text-ink font-display text-xs uppercase tracking-wide hover:bg-sand/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-8 py-4 bg-ink text-paper font-display text-xs uppercase tracking-wide hover:bg-ink-800 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Send Request'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
