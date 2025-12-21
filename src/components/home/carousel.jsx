// src/components/Hero/EcommerceHero.jsx
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getApi } from '../../api.jsx';

export default function EcommerceHero() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['carousel-slides'],
    queryFn: () => getApi('/banner'),
    staleTime: 5 * 60 * 1000,
  });

  const slides = data?.data ?? [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  if (isLoading || error || !slides.length) return null;

  const showControls = slides.length > 1;

  return (
    <section className="w-full py-2 bg-[#F0FFFF]">
      <div className="relative group maxw pxc">
        {/* Slides */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex -ml-4">
            {slides.map((slide) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 pl-4">
                <div className="w-full aspect-[16/9] max-h-[540px] rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={slide.image}
                    alt={`Banner ${slide.id}`}
                    className="w-full h-full object-center transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {showControls && (
          <>
            <NavButton direction="left" onClick={scrollPrev} />
            <NavButton direction="right" onClick={scrollNext} />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? 'bg-white w-8 h-2.5 shadow-lg'
                      : 'bg-white/60 hover:bg-white/90 w-2.5 h-2.5'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function NavButton({ direction, onClick }) {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${isLeft ? 'Previous' : 'Next'} slide`}
      className={`absolute ${isLeft ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 z-10
        bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 p-3 rounded-full shadow-lg
        opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110`}
    >
      <Icon className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
}