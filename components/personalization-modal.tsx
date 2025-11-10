'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

interface PersonalizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (text: string) => void;
  productName: string;
}

export default function PersonalizationModal({
  open,
  onOpenChange,
  onSave,
  productName
}: PersonalizationModalProps) {
  const [customText, setCustomText] = useState('');
  const { user } = useAuth();
  const maxLength = 20;

  const handleSave = () => {
    if (customText.trim()) {
      onSave(customText.trim().toUpperCase());
      onOpenChange(false);
      setCustomText('');
    }
  };

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg bg-paper border border-ink">
          <DialogHeader>
            <DialogTitle className="font-mono text-lg uppercase tracking-wide text-ink">
              Members Only
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-ink/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-ink/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="font-mono text-sm uppercase text-ink mb-2">
                  Customization is exclusive to members
                </p>
                <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-sm mx-auto">
                  Sign in to access personalized embroidery, monogramming, and bespoke customization services.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Link
                  href="/auth?redirect=/pieces"
                  className="px-8 py-3 bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink-800 transition-all text-center"
                  onClick={() => onOpenChange(false)}
                >
                  Sign In
                </Link>
                <button
                  onClick={() => onOpenChange(false)}
                  className="px-8 py-3 border border-ink/20 text-ink font-mono text-xs uppercase tracking-wide hover:border-ink transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-paper border border-ink">
        <DialogHeader>
          <DialogTitle className="font-mono text-lg uppercase tracking-wide text-ink">
            Personalize Your Piece
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div>
            <p className="font-mono text-xs uppercase text-ink-700 mb-4">
              Add custom text or initials to your {productName}
            </p>
            
            <div className="border border-ink p-6 bg-background">
              <label className="block font-mono text-[10px] uppercase text-ink-700 mb-2">
                Custom Text (Max {maxLength} characters)
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value.slice(0, maxLength))}
                className="w-full px-4 py-3 border border-border bg-paper font-mono text-sm uppercase text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="YOUR TEXT HERE"
                maxLength={maxLength}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="font-mono text-[10px] text-ink-700">
                  {customText.length}/{maxLength}
                </p>
                <p className="font-mono text-[10px] text-ink-700">
                  +$50.00
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 border border-ink/20 bg-sand/10">
              <p className="font-mono text-[10px] uppercase text-ink mb-2">Preview:</p>
              <div className="font-mono text-sm uppercase text-ink tracking-widest">
                {customText || 'YOUR TEXT HERE'}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 px-6 py-3 border border-ink text-ink font-mono text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!customText.trim()}
              className="flex-1 px-6 py-3 bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Add Personalization
            </button>
          </div>

          <p className="font-mono text-[10px] text-ink-700 text-center leading-relaxed">
            PERSONALIZED ITEMS ARE FINAL SALE AND CANNOT BE RETURNED OR EXCHANGED
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
