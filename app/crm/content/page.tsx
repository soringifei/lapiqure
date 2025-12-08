'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { ImageUploader } from '@/components/crm/ImageUploader'
import { Save, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProcessStepContent {
  number: string
  title: string
  description: string
  image?: string
}

interface ProcessHighlightContent {
  label: string
  value: string
  sublabel: string
}

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
  processSteps?: ProcessStepContent[]
  processHighlight?: ProcessHighlightContent
}

const DEFAULT_HOME_PROCESS_STEPS: ProcessStepContent[] = [
  {
    number: '01',
    title: 'Material Selection',
    description:
      'We begin by sourcing the finest materials from certified mills in Italy, Portugal, and Japan. Each fabric is hand-selected for its quality, texture, and sustainability credentials.',
    image: '/images/faux_leather_cropped_pants2_opt.jpeg',
  },
  {
    number: '02',
    title: 'Pattern Development',
    description:
      'Our atelier team creates unique patterns through traditional draping techniques. Each piece is developed with precision, considering both form and function.',
    image: '/images/turtleneck_sweater_with_intarsia_pattern3_opt.jpg',
  },
  {
    number: '03',
    title: 'Hand Finishing',
    description:
      'Skilled artisans in our Paris atelier complete each garment by hand. From button attachment to final pressing, every detail receives individual attention.',
    image: '/images/cutsew_distressed_knit_top2_opt.jpeg',
  },
  {
    number: '04',
    title: 'Quality Control',
    description:
      'Before leaving the atelier, each piece undergoes rigorous inspection. We ensure every stitch, seam, and finish meets our exacting standards.',
    image: '/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs4_opt.jpg',
  },
]

const DEFAULT_HOME_PROCESS_HIGHLIGHT: ProcessHighlightContent = {
  label: 'Production Time',
  value: '14-21 Days',
  sublabel: 'From Cut to Completion',
}

export default function ContentPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [pages, setPages] = useState<{ id: string; title: string; slug: string }[]>([
    { id: 'home', title: 'Home', slug: 'home' },
    { id: 'about', title: 'About', slug: 'about' },
    { id: 'collections', title: 'Collections', slug: 'collections' },
    { id: 'contact', title: 'Contact', slug: 'contact' },
    { id: 'pieces', title: 'Pieces', slug: 'pieces' },
  ])
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
    processSteps: DEFAULT_HOME_PROCESS_STEPS,
    processHighlight: DEFAULT_HOME_PROCESS_HIGHLIGHT,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/crm/content')
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            // Merge with default pages to ensure they exist, but prefer DB data
            const defaultIds = ['home', 'about', 'collections', 'contact', 'pieces']
            const merged = [...data]
            defaultIds.forEach(id => {
              if (!merged.find(p => p.id === id)) {
                merged.push({ id, title: id.charAt(0).toUpperCase() + id.slice(1), slug: id })
              }
            })
            setPages(merged)
          }
        }
      } catch (error) {
        console.error('Error fetching pages:', error)
      }
    }
    fetchPages()
  }, [])

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/crm/content?id=${selectedPage}`)
        if (!response.ok) return
        const data = await response.json()

        if (data.id === 'home') {
          const withDefaults: PageContent = {
            ...data,
            processSteps:
              data.processSteps && Array.isArray(data.processSteps) && data.processSteps.length > 0
                ? data.processSteps
                : DEFAULT_HOME_PROCESS_STEPS,
            processHighlight: data.processHighlight || DEFAULT_HOME_PROCESS_HIGHLIGHT,
          }
          setContent(withDefaults)
        } else {
          setContent(data)
        }
      } catch (error) {
        console.error('Error loading content:', error)
      }
    }

    loadContent()
  }, [selectedPage])

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

  const handleAddPage = () => {
    const title = prompt('Enter page title:')
    if (!title) return
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const newPage = { id: slug, title, slug }
    setPages([...pages, newPage])
    setSelectedPage(slug)
    setContent({
      id: slug,
      title,
      slug,
      heroTitle: title,
      heroDescription: '',
      heroImage: '',
      sections: [],
      cta: { text: '', href: '' },
    })
  }

  if (authLoading) {
    return (
      <DashboardLayout>
        <SkeletonLoader variant="form" rows={5} />
      </DashboardLayout>
    )
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Content Manager"
          description="Edit all website pages and content"
          actions={
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          }
        />

        {saved && (
          <div className="p-3 bg-accent-olive/10 text-accent-olive rounded">
            Content saved successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded p-4 h-fit">
            <p className="text-sm font-medium mb-3 text-muted-foreground flex justify-between items-center">
              Pages
              <button onClick={handleAddPage} className="text-primary hover:text-primary/80 text-xs">
                + Add
              </button>
            </p>
            <div className="space-y-2">
              {pages.map((page) => (
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
                initialImages={content.heroImage ? [content.heroImage] : []}
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

            {selectedPage === 'home' && (
              <div className="border-t border-border pt-6">
                <h3 className="font-display tracking-luxury mb-4">Our Process (Home)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Control the steps and highlight shown in the Our Process section on the home page.
                </p>

                {(content.processSteps || []).map((step, idx) => (
                  <div key={idx} className="mb-6 p-4 bg-secondary/5 rounded space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        value={step.number}
                        onChange={(e) => {
                          const steps = [...(content.processSteps || [])]
                          steps[idx] = { ...steps[idx], number: e.target.value }
                          setContent({ ...content, processSteps: steps })
                        }}
                        className="px-4 py-2 border border-border rounded bg-background"
                        placeholder="01"
                      />
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const steps = [...(content.processSteps || [])]
                          steps[idx] = { ...steps[idx], title: e.target.value }
                          setContent({ ...content, processSteps: steps })
                        }}
                        className="md:col-span-3 px-4 py-2 border border-border rounded bg-background"
                        placeholder="Step title"
                      />
                    </div>

                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const steps = [...(content.processSteps || [])]
                        steps[idx] = { ...steps[idx], description: e.target.value }
                        setContent({ ...content, processSteps: steps })
                      }}
                      className="w-full px-4 py-2 border border-border rounded bg-background"
                      placeholder="Step description"
                      rows={3}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2">Step Image</label>
                      <ImageUploader
                        onImagesChange={(urls) => {
                          const steps = [...(content.processSteps || [])]
                          steps[idx] = { ...steps[idx], image: urls[0] || '' }
                          setContent({ ...content, processSteps: steps })
                        }}
                        maxImages={1}
                        initialImages={step.image ? [step.image] : []}
                      />
                    </div>
                  </div>
                ))}

                {(content.processSteps || []).length < 4 && (
                  <button
                    onClick={() => {
                      const steps = content.processSteps && content.processSteps.length > 0
                        ? [...content.processSteps]
                        : [...DEFAULT_HOME_PROCESS_STEPS]
                      steps.push({ number: '0' + (steps.length + 1), title: '', description: '', image: '' })
                      setContent({ ...content, processSteps: steps })
                    }}
                    className="w-full px-4 py-2 border border-dashed border-border rounded text-muted-foreground hover:bg-secondary/5 transition-colors mb-6"
                  >
                    + Add Process Step
                  </button>
                )}

                <div className="mt-8 space-y-3">
                  <h4 className="font-display text-sm tracking-luxury">Process Highlight</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={content.processHighlight?.label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          processHighlight: {
                            ...(content.processHighlight || DEFAULT_HOME_PROCESS_HIGHLIGHT),
                            label: e.target.value,
                          },
                        })
                      }
                      className="px-4 py-2 border border-border rounded bg-background"
                      placeholder="Production Time"
                    />
                    <input
                      type="text"
                      value={content.processHighlight?.value || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          processHighlight: {
                            ...(content.processHighlight || DEFAULT_HOME_PROCESS_HIGHLIGHT),
                            value: e.target.value,
                          },
                        })
                      }
                      className="px-4 py-2 border border-border rounded bg-background"
                      placeholder="14-21 Days"
                    />
                    <input
                      type="text"
                      value={content.processHighlight?.sublabel || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          processHighlight: {
                            ...(content.processHighlight || DEFAULT_HOME_PROCESS_HIGHLIGHT),
                            sublabel: e.target.value,
                          },
                        })
                      }
                      className="px-4 py-2 border border-border rounded bg-background"
                      placeholder="From Cut to Completion"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
