'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Search } from 'lucide-react';
import { samplePieces, sampleCollections } from '@/lib/sample-data';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 text-xs font-display font-normal uppercase tracking-wide text-ink-700 hover:text-ink border border-ink/20 hover:border-ink hover:bg-sand/5 transition-all duration-300 group"
      >
        <Search className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
        <span>Search</span>
        <kbd className="pointer-events-none flex items-center justify-center gap-0.5 border border-ink/20 bg-sand/10 px-1.5 py-0.5 font-mono text-[9px] font-medium min-w-[28px]">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>

      {/* Mobile Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-ink-700 hover:text-ink transition-colors"
        title="Search"
      >
        <Search className="h-4 w-4" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="border-b border-ink/10">
          <CommandInput 
            placeholder="Search pieces, collections, or navigate..." 
            className="font-mono text-sm"
          />
        </div>
        <CommandList className="max-h-[500px] p-4">
          <CommandEmpty>
            <div className="py-12 text-center">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-700 mb-2">
                No results found
              </p>
              <p className="font-sans text-xs text-ink-700">
                Try a different search term
              </p>
            </div>
          </CommandEmpty>
          
          <CommandGroup heading="COLLECTIONS" className="mb-4">
            {sampleCollections.map((collection) => (
              <CommandItem
                key={collection.id}
                onSelect={() => handleSelect(`/collections/${collection.slug}`)}
                className="cursor-pointer rounded-none border border-transparent hover:border-ink/20 hover:bg-sand/5 transition-all duration-200 mb-2 p-3"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="relative w-16 h-20 bg-sand/20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={collection.heroImage}
                      alt={collection.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm tracking-luxury uppercase text-ink mb-1">
                      {collection.title}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700">
                      {collection.season}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-ink-700">→</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <div className="h-px bg-ink/10 my-4" />

          <CommandGroup heading="PIECES" className="mb-4">
            {samplePieces.slice(0, 8).map((piece) => (
              <CommandItem
                key={piece.id}
                onSelect={() => handleSelect(`/pieces/${piece.slug}`)}
                className="cursor-pointer rounded-none border border-transparent hover:border-ink/20 hover:bg-sand/5 transition-all duration-200 mb-2 p-3"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="relative w-16 h-20 bg-sand/20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={piece.images[0]}
                      alt={piece.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-ink truncate mb-1">
                      {piece.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700">
                        {piece.designer}
                      </p>
                      <span className="text-ink-700 text-xs">•</span>
                      <p className="font-mono text-xs text-ink">
                        ${piece.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <div className="h-px bg-ink/10 my-4" />

          <CommandGroup heading="NAVIGATE" className="mb-2">
            <CommandItem 
              onSelect={() => handleSelect('/pieces')} 
              className="cursor-pointer rounded-none hover:bg-sand/5 transition-colors p-3 mb-1"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink">Shop All Pieces</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSelect('/collections')} 
              className="cursor-pointer rounded-none hover:bg-sand/5 transition-colors p-3 mb-1"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink">View All Collections</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSelect('/about')} 
              className="cursor-pointer rounded-none hover:bg-sand/5 transition-colors p-3 mb-1"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink">About LA PIQÛRE</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSelect('/faq')} 
              className="cursor-pointer rounded-none hover:bg-sand/5 transition-colors p-3"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink">FAQ</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        
        {/* Footer with keyboard shortcuts */}
        <div className="border-t border-ink/10 px-4 py-3 bg-sand/5">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wide text-ink-700">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 border border-ink/20 bg-paper">↑</kbd>
                <kbd className="px-1.5 py-0.5 border border-ink/20 bg-paper">↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-0.5 border border-ink/20 bg-paper">↵</kbd>
                Select
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-ink/20 bg-paper">ESC</kbd>
              Close
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
