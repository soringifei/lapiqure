'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { ImageUploader } from '@/components/crm/ImageUploader'
import { Collection } from '@/types/collection'
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react'

export default function CollectionsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()

  const [collections, setCollections] = useState<Collection[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    season: '',
    featured: false,
    isActive: true,
    productCount: 0,
  })

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchCollections = async () => {
      if (!service) return
      try {
        const data = await service.getCollections()
        setCollections(data)
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [service])

  useEffect(() => {
    let filtered = collections
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.season?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredCollections(filtered)
  }, [collections, searchTerm])

  const handleAddCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!service) return

    try {
      await service.addCollection({
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        image: formData.image,
        season: formData.season || undefined,
        featured: formData.featured,
        isActive: formData.isActive,
        productCount: 0,
      })

      setFormData({
        name: '',
        slug: '',
        description: '',
        image: '',
        season: '',
        featured: false,
        isActive: true,
        productCount: 0,
      })
      setShowForm(false)

      const updatedCollections = await service.getCollections()
      setCollections(updatedCollections)
    } catch (error) {
      console.error('Error adding collection:', error)
    }
  }

  if (authLoading || loading) {
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
            <h1 className="font-display text-4xl tracking-luxury mb-2">Collections</h1>
            <p className="text-muted-foreground">{filteredCollections.length} collections</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            New Collection
          </button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded p-6">
            <h2 className="font-display tracking-luxury mb-4">New Collection</h2>
            <form onSubmit={handleAddCollection} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Collection name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
                required
              />
              <input
                type="text"
                placeholder="Slug (auto-generated)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background col-span-2"
                rows={3}
                required
              />
              <input
                type="text"
                placeholder="Season (Spring, Summer, Fall, Winter)"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
              />
              <div className="flex gap-2">
                <label className="flex items-center gap-2 px-4 py-2 border border-border rounded bg-background cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border border-border rounded bg-background cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Collection Image</label>
                <ImageUploader
                  onImagesChange={(urls) => setFormData({ ...formData, image: urls[0] || '' })}
                  maxImages={1}
                />
              </div>

              <div className="flex gap-2 col-span-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  Create Collection
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-secondary/20 rounded hover:bg-secondary/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {filteredCollections.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-card border border-border rounded">
            <p className="text-muted-foreground">No collections found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCollections.map((col) => (
              <div key={col.id} className="bg-card border border-border rounded overflow-hidden hover:shadow-lg transition-shadow">
                {col.image && (
                  <img src={col.image} alt={col.name} className="w-full h-40 object-cover" />
                )}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display tracking-luxury">{col.name}</h3>
                      {col.season && <p className="text-xs text-muted-foreground">{col.season}</p>}
                    </div>
                    {col.featured && (
                      <Star size={16} className="text-accent-orange fill-accent-orange" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{col.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {col.isActive ? '✓ Active' : 'Inactive'}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-secondary/10 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
