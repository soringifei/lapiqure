export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  heroImage: string
  story: string
  images: string[]
  season?: string
  startDate?: Date
  endDate?: Date
  featured: boolean
  isActive: boolean
  productCount: number
  createdAt: Date
  updatedAt: Date
}
