'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { ImageUploader } from '@/components/crm/ImageUploader'
import { Save, FileText } from 'lucide-react'

interface PageContent {
  id: string
  title: string
  slug: string
  heroTitle: string
  heroDescription: string
  heroImage: string
  sections: {
    title: string
    content: string
    image?: string
  }[]
  cta: {
    text: string
    href: string
  }
}

const PAGES = [
  { id: 'home', title: 'Home', slug: 'home' },
  { id: 'about', title: 'About', slug: 'about' },
  { id: 'collections', title: 'Collections', slug: 'collections' },
  { id: 'contact', title: 'Contact', slug: 'contact' },
]

export default function ContentPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [selectedPage, setSelectedPage] = useState('home')
  const [content, setContent] = useState<PageContent>({
    id: 'home',
    title: 'Home',
    slug: 'home',
    heroTitle: '',
    heroDescription: '',
    heroImage: '',
    sections: [],
    cta: { text: '', href: '' },
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/crm/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })

      if (!response.ok) throw new Error('Failed to save')

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">Content Manager</h1>
            <p className="text-muted-foreground">Edit all website pages and content</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-accent-olive/10 text-accent-olive rounded">
            Content saved successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded p-4 h-fit">
            <p className="text-sm font-medium mb-3 text-muted-foreground">Pages</p>
            <div className="space-y-2">
              {PAGES.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors ${
                    selectedPage === page.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    {page.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Main heading"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hero Description</label>
              <textarea
                value={content.heroDescription}
                onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Subtitle or description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hero Image</label>
              <ImageUploader
                onImagesChange={(urls) => setContent({ ...content, heroImage: urls[0] || '' })}
                maxImages={1}
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-display tracking-luxury mb-4">Call to Action</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={content.cta.text}
                  onChange={(e) => setContent({ ...content, cta: { ...content.cta, text: e.target.value } })}
                  className="px-4 py-2 border border-border rounded bg-background"
                  placeholder="Button text"
                />
                <input
                  type="text"
                  value={content.cta.href}
                  onChange={(e) => setContent({ ...content, cta: { ...content.cta, href: e.target.value } })}
                  className="px-4 py-2 border border-border rounded bg-background"
                  placeholder="Link URL"
                />
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-display tracking-luxury mb-4">Sections</h3>
              <p className="text-sm text-muted-foreground mb-4">Add up to 3 sections with title, content, and image</p>

              {content.sections.map((section, idx) => (
                <div key={idx} className="mb-6 p-4 bg-secondary/5 rounded space-y-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const newSections = [...content.sections]
                      newSections[idx].title = e.target.value
                      setContent({ ...content, sections: newSections })
                    }}
                    className="w-full px-4 py-2 border border-border rounded bg-background"
                    placeholder="Section title"
                  />
                  <textarea
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...content.sections]
                      newSections[idx].content = e.target.value
                      setContent({ ...content, sections: newSections })
                    }}
                    className="w-full px-4 py-2 border border-border rounded bg-background"
                    placeholder="Section content"
                    rows={4}
                  />
                </div>
              ))}

              {content.sections.length < 3 && (
                <button
                  onClick={() =>
                    setContent({
                      ...content,
                      sections: [...content.sections, { title: '', content: '', image: '' }],
                    })
                  }
                  className="w-full px-4 py-2 border border-dashed border-border rounded text-muted-foreground hover:bg-secondary/5 transition-colors"
                >
                  + Add Section
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
