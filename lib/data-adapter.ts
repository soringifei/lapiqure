import { getFirebaseFirestore } from '@/lib/firebase'
import { OptimizedCRMService } from '@/lib/firebase-crm-optimized'
import { sampleCollections, samplePieces } from '@/lib/sample-data'
import type { Collection, Piece } from '@/lib/types'

let crmService: OptimizedCRMService | null = null

function getCRMService() {
  try {
    const db = getFirebaseFirestore()
    if (db && !crmService) {
      crmService = new OptimizedCRMService(db)
    }
    return crmService
  } catch (error) {
    console.error('Failed to initialize CRM service:', error)
    return null
  }
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  try {
    const service = getCRMService()
    if (!service) return sampleCollections.filter(c => c.published)

    const crmCollections = await service.getFeaturedCollections()
    return crmCollections.map(c => ({
      id: c.id,
      title: c.name,
      slug: c.slug,
      season: c.season || 'Current',
      description: c.description,
      story: c.description,
      heroImage: c.image,
      images: [],
      published: c.isActive,
      createdAt: c.createdAt?.toString() || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Failed to fetch featured collections from Firebase, using sample data:', error)
    return sampleCollections.filter(c => c.published)
  }
}

export async function getAllCollections(): Promise<Collection[]> {
  try {
    const service = getCRMService()
    if (!service) return sampleCollections

    const crmCollections = await service.getActiveCollections()
    return crmCollections.map(c => ({
      id: c.id,
      title: c.name,
      slug: c.slug,
      season: c.season || 'Current',
      description: c.description,
      story: c.description,
      heroImage: c.image,
      images: [],
      published: c.isActive,
      createdAt: c.createdAt?.toString() || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Failed to fetch collections from Firebase, using sample data:', error)
    return sampleCollections
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const service = getCRMService()
    if (!service) {
      return sampleCollections.find(c => c.slug === slug) || null
    }

    const crmCollections = await service.getActiveCollections()
    const collection = crmCollections.find(c => c.slug === slug)
    if (!collection) return null

    return {
      id: collection.id,
      title: collection.name,
      slug: collection.slug,
      season: collection.season || 'Current',
      description: collection.description,
      story: collection.description,
      heroImage: collection.image,
      images: [],
      published: collection.isActive,
      createdAt: collection.createdAt?.toString() || new Date().toISOString(),
    }
  } catch (error) {
    console.error('Failed to fetch collection from Firebase, using sample data:', error)
    return sampleCollections.find(c => c.slug === slug) || null
  }
}

export async function getProductsByCollection(collectionId: string): Promise<Piece[]> {
  try {
    const service = getCRMService()
    if (!service) {
      return samplePieces.filter(p => p.collectionId === collectionId)
    }

    const products = await service.getProducts()
    return products
      .filter(p => p.collection === collectionId)
      .map(p => ({
        id: p.id,
        name: p.name,
        slug: p.name.toLowerCase().replace(/\s+/g, '-'),
        designer: 'LA PIQÛRE',
        collectionId: p.collection,
        collectionName: p.collection,
        price: p.price,
        rentalPrice: Math.round(p.price * 0.25),
        condition: 'new',
        images: p.images,
        sizes: p.size ? [p.size] : [],
        story: p.description,
        category: 'outerwear',
        available: p.stock > 0,
        material: p.color || 'Premium Material',
        care: 'See care instructions',
        badges: p.stock > 0 ? ['new'] : ['low-stock'] as ('new' | 'exclusive' | 'low-stock')[],
        colors: p.color ? [{ name: p.color, hex: '#1F1A17' }] : [],
        batchNumber: p.id.substring(0, 8),
        productionDate: new Date().toLocaleDateString(),
      } as Piece))
  } catch (error) {
    console.error('Failed to fetch products from Firebase, using sample data:', error)
    return samplePieces.filter(p => p.collectionId === collectionId)
  }
}

export async function getProductBySlug(slug: string): Promise<Piece | null> {
  try {
    const service = getCRMService()
    if (!service) {
      return samplePieces.find(p => p.slug === slug) || null
    }

    const products = await service.getProducts()
    const product = products.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === slug)
    if (!product) return null

    return {
      id: product.id,
      name: product.name,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      designer: 'LA PIQÛRE',
      collectionId: product.collection,
      collectionName: product.collection,
      price: product.price,
      rentalPrice: Math.round(product.price * 0.25),
      condition: 'new',
      images: product.images,
      sizes: product.size ? [product.size] : [],
      story: product.description,
      category: 'outerwear',
      available: product.stock > 0,
        material: product.color || 'Premium Material',
        care: 'See care instructions',
        badges: product.stock > 0 ? ['new'] : ['low-stock'] as ('new' | 'exclusive' | 'low-stock')[],
      colors: product.color ? [{ name: product.color, hex: '#1F1A17' }] : [],
      batchNumber: product.id.substring(0, 8),
      productionDate: new Date().toLocaleDateString(),
    } as Piece
  } catch (error) {
    console.error('Failed to fetch product from Firebase, using sample data:', error)
    return samplePieces.find(p => p.slug === slug) || null
  }
}

export async function getAllPieces(): Promise<Piece[]> {
  try {
    const service = getCRMService()
    if (!service) return samplePieces

    const products = await service.getProducts()
    return products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.name.toLowerCase().replace(/\s+/g, '-'),
      designer: 'LA PIQÛRE',
      collectionId: p.collection,
      collectionName: p.collection,
      price: p.price,
      rentalPrice: Math.round(p.price * 0.25),
      condition: 'new',
      images: p.images,
      sizes: p.size ? [p.size] : [],
      story: p.description,
      category: 'outerwear',
      available: p.stock > 0,
      material: p.color || 'Premium Material',
      care: 'See care instructions',
      badges: p.stock > 0 ? ['new'] : ['low-stock'] as ('new' | 'exclusive' | 'low-stock')[],
      colors: p.color ? [{ name: p.color, hex: '#1F1A17' }] : [],
      batchNumber: p.id.substring(0, 8),
      productionDate: new Date().toLocaleDateString(),
    } as Piece))
  } catch (error) {
    console.error('Failed to fetch pieces from Firebase, using sample data:', error)
    return samplePieces
  }
}
