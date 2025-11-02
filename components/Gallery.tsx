// app/components/Gallery.tsx
"use client";

import React from "react";
import Image from "next/image";

export default function Gallery({
    images,
    active,
    setActive,
    onOpenLightbox,
}: {
    images: string[];
    active: number;
    setActive: (i: number) => void;
    onOpenLightbox: (i: number) => void;
}) {
    const stripRef = React.useRef<HTMLDivElement>(null);

    const scrollBy = (dir: "left" | "right") => {
        const el = stripRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.85;
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    return (
        <div className="space-y-4 mb-8">
            {/* Main image */}
            <button
                className="relative h-[280px] md:h-[420px] w-full overflow-hidden rounded-lg group"
                onClick={() => onOpenLightbox(active)}
                aria-label="Open image viewer"
            >
                <Image
                    src={images[active]}
                    alt={`Gallery image ${active + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                />
                <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                    Tap to view photos
                </div>
            </button>

            {/* Thumbnail carousel (arrows live inside this box) */}
            {images.length > 1 && (
                <div className="relative mt-1">
                    {/* left mask + button */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent rounded-l-lg" />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-1">
                        <button
                            type="button"
                            aria-label="Scroll thumbnails left"
                            onClick={() => scrollBy("left")}
                            className="pointer-events-auto rounded-full bg-white/90 border shadow px-2 py-1 hover:bg-white"
                        >
                            ←
                        </button>
                    </div>

                    {/* right mask + button */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent rounded-r-lg" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                        <button
                            type="button"
                            aria-label="Scroll thumbnails right"
                            onClick={() => scrollBy("right")}
                            className="pointer-events-auto rounded-full bg-white/90 border shadow px-2 py-1 hover:bg-white"
                        >
                            →
                        </button>
                    </div>

                    {/* the strip */}
                    <div
                        ref={stripRef}
                        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10 py-1"
                    >
                        {images.map((src, i) => (
                            <button
                                key={src + i}
                                onClick={() => setActive(i)}
                                className={`relative h-20 w-32 md:h-24 md:w-36 flex-none overflow-hidden rounded-lg snap-start border transition
                  ${i === active ? "ring-2 ring-sky-500 border-transparent" : "border-slate-200 hover:border-slate-400"}`}
                                aria-label={`Show image ${i + 1}`}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
