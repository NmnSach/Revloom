"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./carousel.module.css";

const CarouselContext = React.createContext(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export const Carousel = React.forwardRef(
  (
    {
      orientation = "horizontal",
      opts = { loop: true },
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState([]);

    const onSelect = React.useCallback((emblaApi) => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const scrollTo = React.useCallback(
      (index) => {
        api?.scrollTo(index);
      },
      [api]
    );

    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      const rafId = requestAnimationFrame(() => {
        onSelect(api);
      });

      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        cancelAnimationFrame(rafId);
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(styles.carousel, className)}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel();

    return (
      <div ref={carouselRef} className={styles.carouselViewport}>
        <div
          ref={ref}
          className={cn(styles.carouselContainer, className)}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(styles.carouselSlide, className)}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev, opts } = useCarousel();
    const isLooping = opts?.loop ?? false;
    const disabled = !isLooping && !canScrollPrev;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          styles.navBtn,
          styles.navBtnPrev,
          disabled && styles.navBtnDisabled,
          className
        )}
        disabled={disabled}
        onClick={scrollPrev}
        aria-label="Previous slide"
        {...props}
      >
        <ChevronLeft className={styles.navBtnIcon} />
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext, opts } = useCarousel();
    const isLooping = opts?.loop ?? false;
    const disabled = !isLooping && !canScrollNext;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          styles.navBtn,
          styles.navBtnNext,
          disabled && styles.navBtnDisabled,
          className
        )}
        disabled={disabled}
        onClick={scrollNext}
        aria-label="Next slide"
        {...props}
      >
        <ChevronRight className={styles.navBtnIcon} />
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export function CarouselDots({ className }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  if (!scrollSnaps || scrollSnaps.length <= 1) return null;

  return (
    <div className={cn(styles.paginationBar, className)} aria-label="Slide pagination">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(styles.dot, selectedIndex === index && styles.dotActive)}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={selectedIndex === index ? "true" : undefined}
        />
      ))}
    </div>
  );
}

export default Carousel;
