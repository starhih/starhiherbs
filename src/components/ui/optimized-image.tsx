import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  fallback?: string;
  blur?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  sizes = "100vw",
  className,
  fallback = "/images/placeholder.jpg",
  blur = true,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(blur ? fallback : src);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
      setCurrentSrc(src);
    };

    img.onerror = () => {
      setIsLoading(false);
      setError(true);
      setCurrentSrc(fallback);
    };
  }, [src, fallback]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      sizes={sizes}
      className={cn(
        "transition-all duration-300",
        isLoading && blur && "blur-sm scale-105",
        className
      )}
      loading="lazy"
      onError={() => {
        setError(true);
        setCurrentSrc(fallback);
      }}
      {...props}
    />
  );
};

export default OptimizedImage; 