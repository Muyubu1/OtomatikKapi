import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { X } from 'lucide-react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
    common: string;
    binomial: string;
    photo: {
        url: string;
        text: string;
        pos?: string;
        by: string;
    };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    /** Controls how far the items are from the center. */
    radius?: number;
    /** Controls the speed of auto-rotation when not scrolling. */
    autoRotateSpeed?: number;
}

// Detail Card Modal Component
const DetailCard = ({
    item,
    onClose
}: {
    item: GalleryItem;
    onClose: () => void;
}) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Card */}
            <div
                className="relative max-w-2xl w-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-all duration-200"
                    aria-label="Kapat"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                        src={item.photo.url}
                        alt={item.photo.text}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: item.photo.pos || 'center' }}
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Title Section */}
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold text-white">{item.common}</h2>
                        <p className="text-lg text-orange-400 italic">{item.binomial}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Description */}
                    <p className="text-white/70 leading-relaxed">
                        {item.photo.text}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                                {item.photo.by.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white/50 text-xs">Fotoğraf</p>
                                <p className="text-white text-sm font-medium">{item.photo.by}</p>
                            </div>
                        </div>

                        {/* View Full Button */}
                        <a
                            href={item.photo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 hover:text-orange-300 text-sm font-medium transition-all duration-200 border border-orange-500/30"
                        >
                            Tam Boyut Görüntüle
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
    ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
        const [rotation, setRotation] = useState(0);
        const [isScrolling, setIsScrolling] = useState(false);
        const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const animationFrameRef = useRef<number | null>(null);

        // Effect to handle scroll-based rotation
        useEffect(() => {
            const handleScroll = () => {
                setIsScrolling(true);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
                const scrollRotation = scrollProgress * 360;
                setRotation(scrollRotation);

                scrollTimeoutRef.current = setTimeout(() => {
                    setIsScrolling(false);
                }, 150);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => {
                window.removeEventListener('scroll', handleScroll);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
            };
        }, []);

        // Effect for auto-rotation when not scrolling
        useEffect(() => {
            // Pause auto-rotation when detail card is open
            if (selectedItem) return;

            const autoRotate = () => {
                if (!isScrolling) {
                    setRotation(prev => prev + autoRotateSpeed);
                }
                animationFrameRef.current = requestAnimationFrame(autoRotate);
            };

            animationFrameRef.current = requestAnimationFrame(autoRotate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [isScrolling, autoRotateSpeed, selectedItem]);

        const anglePerItem = 360 / items.length;

        return (
            <>
                <div
                    ref={ref}
                    role="region"
                    aria-label="Circular 3D Gallery"
                    className={cn("relative w-full h-full flex items-center justify-center", className)}
                    style={{ perspective: '2000px' }}
                    {...props}
                >
                    <div
                        className="relative w-full h-full"
                        style={{
                            transform: `rotateY(${rotation}deg)`,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {items.map((item, i) => {
                            const itemAngle = i * anglePerItem;
                            const totalRotation = rotation % 360;
                            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
                            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

                            return (
                                <div
                                    key={item.photo.url}
                                    role="group"
                                    aria-label={item.common}
                                    className="absolute w-[300px] h-[400px] cursor-pointer"
                                    style={{
                                        transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                        left: '50%',
                                        top: '50%',
                                        marginLeft: '-150px',
                                        marginTop: '-200px',
                                        opacity: opacity,
                                        transition: 'opacity 0.3s linear'
                                    }}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg hover:scale-105 hover:shadow-orange-500/20 transition-all duration-300">
                                        <img
                                            src={item.photo.url}
                                            alt={item.photo.text}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{ objectPosition: item.photo.pos || 'center' }}
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-white/0 group-hover:text-white text-sm font-medium transition-all duration-300">
                                                Detayları Gör
                                            </span>
                                        </div>
                                        {/* Text overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                            <h2 className="text-xl font-bold">{item.common}</h2>
                                            <em className="text-sm italic opacity-80">{item.binomial}</em>
                                            <p className="text-xs mt-2 opacity-70">Photo by: {item.photo.by}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Card Modal */}
                {selectedItem && (
                    <DetailCard
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </>
        );
    }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
