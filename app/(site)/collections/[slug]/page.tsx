'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Hero from '@/components/hero';
import SectionHeading from '@/components/section-heading';
import PieceCard from '@/components/piece-card';
import { useCRM } from '@/hooks/useCRM';
import { Collection } from '@/types/collection';
import { Product } from '@/types/crm';
import { where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCardSkeleton from '@/components/product-card-skeleton';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { service } = useCRM();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [collectionPieces, setCollectionPieces] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!service) return;
      try {
        setLoading(true);
        const data = await service.getCollection(params.slug);
        
        // Fallback: If getCollection(id) fails (returns null), try finding by slug field
        if (!data) {
          const allCollections = await service.getCollections();
          const found = allCollections.find(c => c.slug === params.slug);
          if (found) {
            setCollection(found);
          } else {
            notFound();
          }
        } else {
          setCollection(data);
        }
      } catch (error) {
        console.error('Error fetching collection:', error);
        notFound();
      }
    };
    fetchCollection();
  }, [service, params.slug]);

  useEffect(() => {
    const fetchPieces = async () => {
      if (!service || !collection) return;
      try {
        const pieces = await service.getProducts([where('collection', '==', collection.name)]);
        setCollectionPieces(pieces);
      } catch (error) {
        console.error('Error fetching collection pieces:', error);
      } finally {
        setLoading(false);
      }
    };

    if (collection) {
      fetchPieces();
    }
  }, [service, collection]);

  if (loading || !collection) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-[65vh] w-full" />
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-8" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </section>
        <section className="bg-sand/10 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Skeleton className="h-8 w-64 mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero
        imageSrc={collection.heroImage}
        imageAlt={collection.name}
        title={collection.name}
        subtitle={collection.season}
        height="large"
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading className="mb-6">Collection Story</SectionHeading>
          <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink mb-8">
            {collection.description}
          </h2>
          <p className="font-sans text-base leading-relaxed text-ink-700">
            {collection.story}
          </p>
        </div>
      </section>

      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 justify-center flex-wrap">
            {collection.images.map((image, index) => (
              <div 
                key={index} 
                className="relative w-[350px] h-[500px] bg-sand/20 overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${collection.name} detail ${index + 1}`}
                  fill
                  sizes="350px"
                  className="object-cover"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {collectionPieces.length > 0 && (
        <section className="bg-sand/10 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeading className="mb-12">Pieces in This Collection</SectionHeading>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {collectionPieces.map((piece) => (
                <PieceCard
                  key={piece.id}
                  name={piece.name}
                  slug={piece.id}
                  designer="LA PIQÛRE"
                  condition="New"
                  imageSrc={piece.images[0]}
                  price={piece.price}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
