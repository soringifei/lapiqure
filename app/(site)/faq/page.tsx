'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    name: "RETURNS & EXCHANGES",
    items: [
      {
        question: "HOW DO I RETURN AN ITEM?",
        answer: "To initiate a return, contact us at alin@lapiqure.com within 14 days of receiving your order. Include your order number and reason for return. We'll provide a prepaid return label. Items must be unworn, with all tags attached, in original packaging."
      },
      {
        question: "HOW MANY DAYS DO I HAVE TO EXCHANGE OR RETURN AN ITEM?",
        answer: "You have 14 days from the date of delivery to request a return or exchange. Items must be in original condition. Personalized pieces are final sale and cannot be returned or exchanged."
      },
      {
        question: "WHAT IS YOUR RETURN AND EXCHANGE POLICY?",
        answer: "We accept returns and exchanges within 14 days of delivery for items in unworn, original condition with tags attached. Return shipping is covered by LA PIQÛRE for defective items. Customer-initiated returns incur a restocking fee of 10%. Personalized items, final sale pieces, and items marked as such cannot be returned."
      },
      {
        question: "HOW LONG DOES IT TAKE FOR A REFUND TO BE ISSUED?",
        answer: "Once we receive and inspect your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method. Please allow additional time for your bank to process the transaction."
      }
    ]
  },
  {
    name: "PRODUCT INFORMATION",
    items: [
      {
        question: "WHAT MATERIALS DO YOU USE?",
        answer: "We specialize in premium faux leathers, embossed textures, distressed knits, and innovative synthetic materials. All materials are selected for durability, texture, and aging characteristics. Each product page includes detailed material composition and care instructions."
      },
      {
        question: "HOW DO I CARE FOR MY PIECE?",
        answer: "Care varies by material. Faux leather items should be spot-cleaned with a damp cloth and stored away from direct sunlight. Knits should be hand-washed or dry-cleaned. Detailed care labels are included with each garment. For specific questions, email alin@lapiqure.com."
      },
      {
        question: "ARE YOUR PIECES TRUE TO SIZE?",
        answer: "Our pieces are designed with a contemporary, relaxed fit. We recommend consulting the size guide on each product page. If between sizes, we suggest sizing up. Measurements are provided in centimeters. Contact us for personalized fit advice."
      },
      {
        question: "CAN I REQUEST PERSONALIZATION?",
        answer: "Select pieces offer custom embroidery or text personalization for an additional €50. Personalized items are final sale and require 2-3 additional weeks for production. Contact us to confirm availability before ordering."
      }
    ]
  },
  {
    name: "ORDERS & PAYMENT",
    items: [
      {
        question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
        answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are processed securely through Stripe. We do not store credit card information."
      },
      {
        question: "CAN I MODIFY MY ORDER AFTER PLACING IT?",
        answer: "Orders are processed immediately. If you need to modify or cancel an order, contact us at alin@lapiqure.com within 2 hours of placing it. We cannot guarantee changes after this window."
      },
      {
        question: "DO YOU OFFER GIFT WRAPPING?",
        answer: "Complimentary luxury packaging is included with every order. For special occasions, we offer premium gift wrapping with handwritten cards for €15. Select this option at checkout."
      },
      {
        question: "CAN I USE MULTIPLE DISCOUNT CODES?",
        answer: "Only one discount code can be applied per order. Codes cannot be combined with sale items or other promotions unless explicitly stated."
      }
    ]
  },
  {
    name: "SHIPPING & DELIVERY",
    items: [
      {
        question: "HOW LONG DOES SHIPPING TAKE?",
        answer: "Orders within France: 2-4 business days. European Union: 4-7 business days. International: 7-14 business days. Processing time is 1-2 business days. Personalized items require an additional 2-3 weeks."
      },
      {
        question: "DO YOU SHIP INTERNATIONALLY?",
        answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by destination. International customers are responsible for customs duties and taxes. These fees are not included in our pricing."
      },
      {
        question: "HOW CAN I TRACK MY ORDER?",
        answer: "Once your order ships, you'll receive a tracking number via email. Track your shipment through the carrier's website. For assistance, contact alin@lapiqure.com with your order number."
      },
      {
        question: "WHAT IF MY PACKAGE IS LOST OR DAMAGED?",
        answer: "All shipments are insured. If your package is lost or arrives damaged, contact us immediately at alin@lapiqure.com with photos (if damaged). We'll file a claim and arrange a replacement or refund."
      }
    ]
  },
  {
    name: "MY ACCOUNT",
    items: [
      {
        question: "HOW DO I CREATE AN ACCOUNT?",
        answer: "Click 'Account' in the navigation and select 'Create Account'. You'll need an email address and password. An account allows faster checkout, order tracking, and access to your wishlist."
      },
      {
        question: "I FORGOT MY PASSWORD",
        answer: "Click 'Account', then 'Forgot Password'. Enter your email address and we'll send password reset instructions. Check your spam folder if you don't receive the email within 10 minutes."
      },
      {
        question: "CAN I CHANGE MY ACCOUNT EMAIL?",
        answer: "Yes. Log into your account, navigate to settings, and update your email address. You'll receive a confirmation email to verify the change."
      },
      {
        question: "HOW DO I DELETE MY ACCOUNT?",
        answer: "To delete your account, email alin@lapiqure.com with your request. All personal data will be permanently removed within 30 days in accordance with GDPR."
      }
    ]
  },
  {
    name: "SUSTAINABILITY",
    items: [
      {
        question: "WHAT IS LA PIQÛRE'S APPROACH TO SUSTAINABILITY?",
        answer: "We design for longevity over trends. Small-batch production, durable materials, and timeless design mean our pieces are built to last years, not seasons. We reject fast fashion's cycle of overproduction and disposability. Our sustainability is embedded in our business model: we produce only what we can sell, we use alternatives to animal leather, and we build garments engineered to age with character rather than deteriorate."
      },
      {
        question: "WHY DO YOU USE FAUX LEATHER INSTEAD OF REAL LEATHER?",
        answer: "Premium faux leather offers the textures and finishes our designs demand without the environmental cost of animal agriculture and tanning. Modern synthetic leathers are incredibly durable, age beautifully, and allow us to achieve embossed patterns and treatments not possible with traditional leather. We source materials from specialized suppliers focused on innovation and quality, not volume."
      },
      {
        question: "HOW DOES LIMITED PRODUCTION BENEFIT THE ENVIRONMENT?",
        answer: "Limited production means zero overstock and minimal waste. We produce small runs per design—typically 20-50 pieces depending on complexity. This model eliminates the need for markdowns, outlet channels, and eventual disposal of unsold inventory. Every piece we create has a customer waiting for it. No excess. No landfill."
      },
      {
        question: "WHAT HAPPENS TO FABRIC WASTE FROM PRODUCTION?",
        answer: "Our atelier-scale operations generate minimal waste compared to mass production. Leather remnants are repurposed for accessories, patches, and experimental pieces. Knit and textile scraps are collected and donated to local art programs in Paris. We design patterns to maximize material usage and minimize cutting waste."
      },
      {
        question: "DO YOU USE RECYCLED OR DEADSTOCK MATERIALS?",
        answer: "Selectively. When we find deadstock materials that meet our quality standards, we incorporate them into limited capsules. However, our primary focus is on durability and aging characteristics, which sometimes requires sourcing new materials from specialized suppliers. We prioritize material longevity over material origin—a piece worn for 10 years has far less impact than one discarded after one season."
      },
      {
        question: "WHAT IS YOUR PACKAGING APPROACH?",
        answer: "All pieces ship in minimal, recyclable packaging. Boxes are uncoated cardboard from FSC-certified sources. Dust bags are organic cotton, reusable for storage or travel. We eliminated plastic mailers in 2021. Tissue paper is acid-free and biodegradable. Gift packaging uses the same materials with cotton ribbon—no synthetic bows or foam inserts."
      },
      {
        question: "DO YOU OFFER REPAIR SERVICES?",
        answer: "Yes. We offer repair and restoration services for LA PIQÛRE pieces to extend their lifespan indefinitely. This includes zipper replacement, leather conditioning, seam reinforcement, and hardware repair. Contact us at alin@lapiqure.com with details and photos. Repair costs vary by service required. We believe in building relationships with our pieces, not replacing them."
      },
      {
        question: "CAN I RETURN MY USED PIECE TO BE RESOLD?",
        answer: "Not currently, but we're exploring a take-back program for archive pieces in good condition. In the meantime, we encourage resale through platforms like Vestiaire Collective or Grailed. LA PIQÛRE pieces hold value because of limited production and durability. Resale is sustainability in action."
      },
      {
        question: "DO YOU WORK WITH ETHICAL MANUFACTURERS?",
        answer: "All production happens within our network of small-scale manufacturers in France and Italy. We maintain direct relationships with every supplier and visit production facilities regularly. Workers receive fair wages, safe conditions, and reasonable hours. No middlemen, no outsourcing, no opacity. Studio-scale means accountability."
      },
      {
        question: "WHAT ABOUT CARBON OFFSETTING OR CLIMATE COMMITMENTS?",
        answer: "We don't purchase carbon offsets. Instead, we focus on reducing emissions at the source: local production reduces shipping, small batches reduce waste, durable design reduces replacement cycles. Our impact is measured in pieces-per-year, not units-per-quarter. We're skeptical of offset schemes that allow business-as-usual with a green veneer. Real sustainability means producing less, better."
      },
      {
        question: "HOW TRANSPARENT IS YOUR SUPPLY CHAIN?",
        answer: "Completely transparent within our network. We work with 4 primary material suppliers (all European) and 2 manufacturing partners (France and Northern Italy). We can trace every piece to its origin. For specific product inquiries, email us—we'll tell you exactly where it was made and by whom. Small scale enables total visibility."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    const allIndices = new Set(faqData[activeCategory].items.map((_, i) => i));
    setExpandedItems(allIndices);
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="min-h-screen"><section className="bg-ink text-paper py-32 relative">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl tracking-[0.3em] uppercase">
            Frequently Asked Questions
          </h1>
        </div><div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-12 h-12 bg-ink border-2 border-paper rotate-45 flex items-center justify-center">
            <span className="font-display text-xs text-paper -rotate-45">?</span>
          </div>
        </div>
      </section><section className="bg-paper border-b border-ink/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {faqData.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setExpandedItems(new Set());
                }}
                className={`font-display text-xs uppercase tracking-wide px-4 py-2 transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-ink text-paper'
                    : 'border border-ink/20 text-ink hover:border-ink'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section><section className="max-w-4xl mx-auto px-8 lg:px-12 py-24">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl tracking-luxury uppercase text-ink">
              {faqData[activeCategory].name}
            </h2>
          </div>
          
          <button
            onClick={expandedItems.size === faqData[activeCategory].items.length ? collapseAll : expandAll}
            className="font-display text-xs uppercase tracking-wide text-ink-700 hover:text-ink transition-colors"
          >
            {expandedItems.size === faqData[activeCategory].items.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="space-y-4">
          {faqData[activeCategory].items.map((item, index) => (
            <div key={index} className="border border-ink/20 bg-paper">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-sand/5 transition-colors"
              >
                <span className="font-display text-sm uppercase tracking-wide text-ink pr-8">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-ink flex-shrink-0 transition-transform duration-300 ${
                    expandedItems.has(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6">
                  <p className="font-sans text-sm leading-relaxed text-ink-700">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div><div className="mt-16 p-12 border border-ink/20 bg-sand/10 text-center">
          <h3 className="font-display text-xl tracking-luxury uppercase text-ink mb-4">
            Still Have Questions?
          </h3>
          <p className="font-sans text-sm text-ink-700 mb-6 leading-relaxed">
            Our team is here to assist you with any inquiries about products, orders, or services.
          </p>
          <a
            href="mailto:alin@lapiqure.com"
            className="inline-block px-8 py-3 bg-ink text-paper font-display text-xs uppercase tracking-wide hover:bg-ink-800 transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
