'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { EmptyState } from '@/components/crm/EmptyState'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { ImageUploader } from '@/components/crm/ImageUploader'
import { Product, CustomerTier } from '@/types/crm'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    collection: '',
    stock: 0,
    size: '',
    color: '',
    tierExclusive: 'prospect' as CustomerTier,
    images: [] as string[],
  })

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchProducts = async () => {
      if (!service) return
      try {
        const data = await service.getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [service])

  useEffect(() => {
    let filtered = products
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.collection.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      collection: product.collection,
      stock: product.stock,
      size: product.size || '',
      color: product.color || '',
      tierExclusive: product.tierExclusive || 'prospect',
      images: product.images,
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!service) return

    try {
      if (editingId) {
        await service.updateProduct(editingId, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          collection: formData.collection,
          stock: formData.stock,
          images: formData.images,
          size: formData.size || undefined,
          color: formData.color || undefined,
          tierExclusive: formData.tierExclusive,
        })
      } else {
        await service.addProduct({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          collection: formData.collection,
          stock: formData.stock,
          images: formData.images,
          size: formData.size || undefined,
          color: formData.color || undefined,
          tierExclusive: formData.tierExclusive,
        })
      }

      setFormData({
        name: '',
        description: '',
        price: 0,
        collection: '',
        stock: 0,
        size: '',
        color: '',
        tierExclusive: 'prospect',
        images: [],
      })
      setEditingId(null)
      setShowForm(false)

      const updatedProducts = await service.getProducts()
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    if (!service) return
    try {
      await service.deleteProduct(id)
      const updatedProducts = await service.getProducts()
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
 
  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-24 bg-secondary/5 rounded animate-shimmer" />
          <SkeletonLoader variant="form" rows={3} />
          <SkeletonLoader variant="table" rows={5} columns={6} />
        </div>
      </DashboardLayout>
    )
  }
 
  if (!user) return null
 
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Products"
          description="Inventory and tier-exclusive pieces."
          subtitle={filteredProducts.length > 0 ? `Showing ${filteredProducts.length} products` : undefined}
          actions={
            <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Plus size={20} />
              Add Product
            </Button>
          }
        />

        {showForm && (
          <div className="bg-card border border-border rounded p-6">
            <h2 className="font-display tracking-luxury mb-4">{editingId ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
                required
              />
              <input
                type="text"
                placeholder="Collection"
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background col-span-2"
                rows={3}
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="px-4 py-2 border border-border rounded bg-background"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="px-4 py-2 border border-border rounded bg-background"
                required
              />
              <input
                type="text"
                placeholder="Size (S, M, L, etc)"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
              />
              <input
                type="text"
                placeholder="Color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="px-4 py-2 border border-border rounded bg-background"
              />
              <select
                value={formData.tierExclusive}
                onChange={(e) => setFormData({ ...formData, tierExclusive: e.target.value as CustomerTier })}
                className="px-4 py-2 border border-border rounded bg-background"
              >
                <option value="prospect">Prospect (Everyone)</option>
                <option value="silver">Silver Only</option>
                <option value="gold">Gold Only</option>
                <option value="platinum">Platinum Only</option>
              </select>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Product Images</label>
                <ImageUploader onImagesChange={(urls) => setFormData({ ...formData, images: urls })} maxImages={5} />
              </div>

              <div className="flex gap-2 col-span-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({
                      name: '',
                      description: '',
                      price: 0,
                      collection: '',
                      stock: 0,
                      size: '',
                      color: '',
                      tierExclusive: 'prospect',
                      images: [],
                    })
                  }}
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-card border border-border rounded">
            <EmptyState
              icon="📦"
              title="No products yet"
              description="Add your first product with images, stock, and tier exclusivity."
              primaryAction={{
                label: 'Add Product',
                onClick: () => setShowForm(true),
              }}
            />
          </div>
        ) : (
          <div className="bg-card border border-border rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/5">
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Collection</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Price</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Stock</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Tier</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/5">
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{product.collection}</td>
                    <td className="px-6 py-3">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded text-xs ${
                        product.stock > 0 ? 'bg-accent-olive/10 text-accent-olive' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs capitalize">{product.tierExclusive || 'All'}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditProduct(product)} className="p-2 hover:bg-secondary/10 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
