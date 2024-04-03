import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageCarousel({ urls }: { urls: string[] }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {urls.map((u, index) => (
          <CarouselItem className="h-48" key={index}>
            <img
              className="w-full h-full object-cover rounded-2xl object-center z-0"
              src={u as string}
              alt=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
