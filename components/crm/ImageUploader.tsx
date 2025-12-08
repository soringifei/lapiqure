'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirebaseStorage } from '@/lib/firebase'
import { optimizeImage, getImageSize } from '@/lib/image-optimization'

interface ImageUploaderProps {
  onImagesChange: (urls: string[]) => void
  maxImages?: number
  initialImages?: string[]
}

export function ImageUploader({ onImagesChange, maxImages = 5, initialImages = [] }: ImageUploaderProps) {
  const [images, setImages] = useState<{ url: string; size: number }[]>(
    initialImages.map(url => ({ url, size: 0 }))
  )
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const storage = getFirebaseStorage()
      const newImages = [...images]

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed')
          continue
        }

        if (file.size > 10 * 1024 * 1024) {
          setError('Image must be smaller than 10MB')
          continue
        }

        const { blob } = await optimizeImage(file)

        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`
        const objectPath = `products/${fileName}`
        const storageRef = ref(storage, objectPath)

        const snapshot = await uploadBytes(storageRef, blob, {
          contentType: 'image/webp',
        })

        const downloadUrl = await getDownloadURL(snapshot.ref)

        newImages.push({ url: downloadUrl, size: blob.size })
      }

      setImages(newImages)
      onImagesChange(newImages.map((img) => img.url))
      if (newImages.length > images.length) {
        setSuccess('Images uploaded successfully')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading image')
    } finally {
      setUploading(false)
      if (e.currentTarget) {
        e.currentTarget.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onImagesChange(newImages.map((img) => img.url))
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
        <label htmlFor="image-upload" className="cursor-pointer block">
          <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
          <p className="font-medium">Drop images or click to upload</p>
          <p className="text-sm text-muted-foreground">WebP optimized • Max {maxImages} images • 10MB each</p>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading || images.length >= maxImages}
            className="hidden"
          />
        </label>
      </div>

      {uploading && (
        <div className="p-3 bg-secondary/10 text-sm rounded">Uploading images, please wait…</div>
      )}

      {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded">{error}</div>}

      {success && !uploading && !error && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-sm rounded">{success}</div>
      )}

      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            {images.length}/{maxImages} images
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full h-32">
                  <Image
                    src={image.url}
                    alt={`Upload ${index}`}
                    fill
                    sizes="150px"
                    className="object-cover rounded border border-border"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                  <button
                    onClick={() => removeImage(index)}
                    className="p-2 bg-destructive text-white rounded hover:bg-destructive/90"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {image.size > 0 ? getImageSize(image.size) : 'Existing image'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
