'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EMAIL_TEMPLATES, EmailTemplateType, EmailTemplateData, renderEmailTemplate } from '@/lib/email-templates'
import { ImageUploader } from './ImageUploader'
import { Product } from '@/types/crm'
import { Eye, Mail, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface EmailEditorProps {
  initialData?: Partial<EmailTemplateData>
  initialTemplate?: EmailTemplateType
  onSave?: (template: EmailTemplateType, data: EmailTemplateData) => void
  products?: Product[]
  loadingProducts?: boolean
}

export function EmailEditor({ 
  initialData, 
  initialTemplate = 'newsletter',
  onSave,
  products = [],
  loadingProducts = false
}: EmailEditorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateType>(initialTemplate)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [emailData, setEmailData] = useState<EmailTemplateData>({
    headline: initialData?.headline || '',
    subheadline: initialData?.subheadline || '',
    bodyText: initialData?.bodyText || '',
    ctaText: initialData?.ctaText || 'Shop Now',
    ctaUrl: initialData?.ctaUrl || '',
    heroImage: initialData?.heroImage || '',
    productImage: initialData?.productImage || '',
    productName: initialData?.productName || '',
    productPrice: initialData?.productPrice || '',
    productUrl: initialData?.productUrl || '',
    secondaryImage: initialData?.secondaryImage || '',
    personalization: {
      firstName: initialData?.personalization?.firstName || '',
    },
  })

  const selectedProduct = products.find(p => p.id === emailData.productUrl?.split('/').pop())

  useEffect(() => {
    if (selectedProduct) {
      setEmailData(prev => ({
        ...prev,
        productName: selectedProduct.name,
        productPrice: `$${selectedProduct.price.toLocaleString()}`,
        productImage: selectedProduct.images[0] || prev.productImage,
        productUrl: `https://lapiqure.vercel.app/pieces/${selectedProduct.id}`,
      }))
    }
  }, [selectedProduct, products])

  useEffect(() => {
    if (onSave) {
      onSave(selectedTemplate, emailData)
    }
  }, [selectedTemplate, emailData, onSave])

  const previewHtml = renderEmailTemplate(selectedTemplate, emailData)

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div>
        <label className="block text-sm font-medium mb-3">Email Template</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {EMAIL_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedTemplate === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium text-sm mb-1">{template.name}</div>
              <div className="text-xs text-muted-foreground">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Basic Fields */}
          <div>
            <label className="block text-sm font-medium mb-2">Headline *</label>
            <input
              type="text"
              value={emailData.headline}
              onChange={(e) => setEmailData({ ...emailData, headline: e.target.value })}
              placeholder="Enter headline"
              className="w-full px-4 py-2 border border-border rounded bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subheadline</label>
            <input
              type="text"
              value={emailData.subheadline || ''}
              onChange={(e) => setEmailData({ ...emailData, subheadline: e.target.value })}
              placeholder="Optional subheadline"
              className="w-full px-4 py-2 border border-border rounded bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Body Text *</label>
            <textarea
              value={emailData.bodyText}
              onChange={(e) => setEmailData({ ...emailData, bodyText: e.target.value })}
              placeholder="Enter your message"
              rows={6}
              className="w-full px-4 py-2 border border-border rounded bg-background resize-none"
              required
            />
          </div>

          {/* Hero Image */}
          {(selectedTemplate === 'collection-launch' || 
            selectedTemplate === 'lookbook' || 
            selectedTemplate === 'seasonal-campaign') && (
            <div>
              <label className="block text-sm font-medium mb-2">Hero Image</label>
              <ImageUploader
                maxImages={1}
                initialImages={emailData.heroImage ? [emailData.heroImage] : []}
                onImagesChange={(urls) => setEmailData({ ...emailData, heroImage: urls[0] || '' })}
              />
            </div>
          )}

          {/* Product Selector */}
          {selectedTemplate === 'product-spotlight' && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Product</label>
              {loadingProducts ? (
                <div className="p-4 border border-border rounded flex items-center justify-center">
                  <Loader2 className="animate-spin text-muted-foreground" />
                </div>
              ) : (
                <select
                  value={emailData.productUrl?.split('/').pop() || ''}
                  onChange={(e) => {
                    const productId = e.target.value
                    const product = products.find(p => p.id === productId)
                    if (product) {
                      setEmailData({
                        ...emailData,
                        productName: product.name,
                        productPrice: `$${product.price.toLocaleString()}`,
                        productImage: product.images[0] || '',
                        productUrl: `https://lapiqure.vercel.app/pieces/${product.id}`,
                      })
                    }
                  }}
                  className="w-full px-4 py-2 border border-border rounded bg-background"
                >
                  <option value="">Select a product...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              )}
              {emailData.productImage && (
                <div className="mt-3 relative w-full max-w-xs aspect-square">
                  <Image
                    src={emailData.productImage}
                    alt={emailData.productName || 'Product'}
                    fill
                    className="object-cover rounded border border-border"
                  />
                </div>
              )}
            </div>
          )}

          {/* Secondary Image */}
          {(selectedTemplate === 'newsletter' || selectedTemplate === 'lookbook') && (
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Image</label>
              <ImageUploader
                maxImages={1}
                initialImages={emailData.secondaryImage ? [emailData.secondaryImage] : []}
                onImagesChange={(urls) => setEmailData({ ...emailData, secondaryImage: urls[0] || '' })}
              />
            </div>
          )}

          {/* CTA */}
          <div>
            <label className="block text-sm font-medium mb-2">Call-to-Action</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={emailData.ctaText || ''}
                onChange={(e) => setEmailData({ ...emailData, ctaText: e.target.value })}
                placeholder="Button text"
                className="px-4 py-2 border border-border rounded bg-background"
              />
              <input
                type="text"
                value={emailData.ctaUrl || ''}
                onChange={(e) => setEmailData({ ...emailData, ctaUrl: e.target.value })}
                placeholder="Button URL"
                className="px-4 py-2 border border-border rounded bg-background"
              />
            </div>
          </div>

          {/* Personalization */}
          <div>
            <label className="block text-sm font-medium mb-2">Personalization</label>
            <input
              type="text"
              value={emailData.personalization?.firstName || ''}
              onChange={(e) => setEmailData({ 
                ...emailData, 
                personalization: { ...emailData.personalization, firstName: e.target.value }
              })}
              placeholder="First name (use {firstName} in body text for dynamic replacement)"
              className="w-full px-4 py-2 border border-border rounded bg-background"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use {'{firstName}'} anywhere in your content for personalization
            </p>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Preview</label>
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-secondary/10 transition-colors"
            >
              <Eye size={16} />
              Full Preview
            </button>
          </div>
          
          <div className="border border-border rounded-lg bg-background overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/10">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail size={14} />
                Email Preview
              </div>
            </div>
            <div className="p-4">
              <div className="aspect-[4/5] bg-paper border border-border rounded overflow-auto">
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-full border-0"
                  title="Email preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl mb-2">Email Preview</h3>
              <p className="text-sm text-muted-foreground">
                This is how your email will appear to recipients
              </p>
            </div>
            <div className="border border-border rounded-lg overflow-hidden bg-paper">
              <div 
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                style={{ maxWidth: '600px', margin: '0 auto' }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

