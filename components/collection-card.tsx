import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CollectionCard({
  title,
  slug,
  season,
  description,
  heroImage,
}: {
  title: string
  slug: string
  season: string
  description: string
  heroImage: string
}) {
  return (
    <Link href={`/collections/${slug}`} className="group block hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
      <div className="relative aspect-[4/5] bg-sand/20 overflow-hidden mb-6">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-all duration-1000"
          quality={85}
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl tracking-luxury text-ink group-hover:text-ink-700 transition-colors">
            {title}
          </h3>
          <span className="text-xs font-sans tracking-editorial uppercase text-ink-700">
            {season}
          </span>
        </div>
        <p className="font-sans text-sm leading-relaxed text-ink-700">
          {description}
        </p>
      </div>
    </Link>
  )
}
