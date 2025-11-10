'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ruler } from 'lucide-react';

export default function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-xs font-sans tracking-editorial uppercase text-ink-700 hover:text-ink transition-colors">
          <Ruler className="h-3 w-3" />
          Size Guide
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-paper">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-luxury text-ink">
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Size Chart */}
          <div>
            <h3 className="font-display text-sm tracking-luxury uppercase text-ink mb-4">
              Clothing Measurements
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-display tracking-luxury uppercase text-xs text-ink">Size</th>
                    <th className="text-left py-3 font-display tracking-luxury uppercase text-xs text-ink">Chest (cm)</th>
                    <th className="text-left py-3 font-display tracking-luxury uppercase text-xs text-ink">Waist (cm)</th>
                    <th className="text-left py-3 font-display tracking-luxury uppercase text-xs text-ink">Hips (cm)</th>
                    <th className="text-left py-3 font-display tracking-luxury uppercase text-xs text-ink">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 text-ink-700">XS</td>
                    <td className="py-3 text-ink-700">80-84</td>
                    <td className="py-3 text-ink-700">60-64</td>
                    <td className="py-3 text-ink-700">86-90</td>
                    <td className="py-3 text-ink-700">64-66</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-ink-700">S</td>
                    <td className="py-3 text-ink-700">84-88</td>
                    <td className="py-3 text-ink-700">64-68</td>
                    <td className="py-3 text-ink-700">90-94</td>
                    <td className="py-3 text-ink-700">66-68</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-ink-700">M</td>
                    <td className="py-3 text-ink-700">88-92</td>
                    <td className="py-3 text-ink-700">68-72</td>
                    <td className="py-3 text-ink-700">94-98</td>
                    <td className="py-3 text-ink-700">68-70</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-ink-700">L</td>
                    <td className="py-3 text-ink-700">92-96</td>
                    <td className="py-3 text-ink-700">72-76</td>
                    <td className="py-3 text-ink-700">98-102</td>
                    <td className="py-3 text-ink-700">70-72</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-ink-700">XL</td>
                    <td className="py-3 text-ink-700">96-100</td>
                    <td className="py-3 text-ink-700">76-80</td>
                    <td className="py-3 text-ink-700">102-106</td>
                    <td className="py-3 text-ink-700">72-74</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="pt-6 border-t border-border">
            <h3 className="font-display text-sm tracking-luxury uppercase text-ink mb-4">
              How to Measure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-display text-xs tracking-luxury uppercase text-ink mb-2">Chest</p>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Measure around the fullest part of your chest, keeping the tape parallel to the floor.
                </p>
              </div>
              <div>
                <p className="font-display text-xs tracking-luxury uppercase text-ink mb-2">Waist</p>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Measure around your natural waistline, keeping the tape comfortably loose.
                </p>
              </div>
              <div>
                <p className="font-display text-xs tracking-luxury uppercase text-ink mb-2">Hips</p>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Measure around the fullest part of your hips, approximately 20cm below your waist.
                </p>
              </div>
              <div>
                <p className="font-display text-xs tracking-luxury uppercase text-ink mb-2">Length</p>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Measure from the highest point of your shoulder down to where you want the garment to end.
                </p>
              </div>
            </div>
          </div>

          {/* Fit Notes */}
          <div className="pt-6 border-t border-border">
            <h3 className="font-display text-sm tracking-luxury uppercase text-ink mb-4">
              Fit Notes
            </h3>
            <ul className="space-y-2 font-sans text-sm text-ink-700">
              <li>• All measurements are approximate and may vary by ±1-2cm</li>
              <li>• Our pieces are designed with a contemporary, relaxed fit</li>
              <li>• Faux leather items may require a size up for comfort</li>
              <li>• For between sizes, we recommend sizing up</li>
              <li>• Contact us at contact@lapiqure.com for personalized fit advice</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
