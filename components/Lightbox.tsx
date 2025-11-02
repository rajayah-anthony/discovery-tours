// app/components/Lightbox.tsx
"use client";

import React from "react";
import Image from "next/image";

export default function Lightbox({
    images,
    startIndex,
    onClose,
}: {
    images: string[];
    startIndex: number;
    onClose: () => void;
}) {
    const [index, setIndex] = React.useState(startIndex);
    const [zoom, setZoom] = React.useState(1);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const draggingRef = React.useRef(false);
    const lastPosRef = React.useRef<{ x: number; y: number } | null>(null);

    React.useEffect(() => {
        const og = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = og;
        };
    }, []);

    const prev = () => {
        setIndex((i) => (i - 1 + images.length) % images.length);
        setZoom(1);
        setOffset({ x: 0, y: 0 });
    };
    const next = () => {
        setIndex((i) => (i + 1) % images.length);
        setZoom(1);
        setOffset({ x: 0, y: 0 });
    };

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        const z = Math.min(3, Math.max(1, zoom + (e.deltaY > 0 ? -0.15 : 0.15)));
        setZoom(z);
    };

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
        draggingRef.current = true;
        const p = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
        lastPosRef.current = { x: p.clientX, y: p.clientY };
    };
    const moveDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!draggingRef.current || zoom <= 1) return;
        const p = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
        if (lastPosRef.current) {
            setOffset((o) => ({
                x: o.x + (p.clientX - lastPosRef.current!.x),
                y: o.y + (p.clientY - lastPosRef.current!.y),
            }));
            lastPosRef.current = { x: p.clientX, y: p.clientY };
        }
    };
    const endDrag = () => {
        draggingRef.current = false;
        lastPosRef.current = null;
    };
    const doubleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        setZoom((z) => (z > 1 ? 1 : 2));
        if (zoom > 1) setOffset({ x: 0, y: 0 });
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            onWheel={onWheel}
            onMouseMove={moveDrag as any}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchMove={moveDrag as any}
            onTouchEnd={endDrag}
        >
            <button
                className="absolute inset-0 cursor-zoom-out"
                onClick={(e) => {
                    if ((e.target as HTMLElement).dataset?.role !== "prevent-close")
                        onClose();
                }}
            />

            <div
                className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3"
                data-role="prevent-close"
            >
                <button
                    onClick={prev}
                    className="rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                >
                    ←
                </button>
                <span className="text-white text-sm select-none">
                    {index + 1} / {images.length}
                </span>
                <button
                    onClick={next}
                    className="rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                >
                    →
                </button>
            </div>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                data-role="prevent-close"
            >
                ✕
            </button>

            <div
                className="relative max-h-[85vh] max-w-[95vw] select-none cursor-grab active:cursor-grabbing"
                onMouseDown={startDrag as any}
                onTouchStart={startDrag as any}
                onDoubleClick={doubleClick}
                data-role="prevent-close"
            >
                <Image
                    src={images[index]}
                    alt={`Gallery image ${index + 1}`}
                    width={1600}
                    height={1067}
                    priority
                    className="pointer-events-none"
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                        transformOrigin: "center center",
                        transition: draggingRef.current ? "none" : "transform 120ms ease",
                        maxHeight: "85vh",
                        maxWidth: "95vw",
                        objectFit: "contain",
                    }}
                />
            </div>
        </div>
    );
}
