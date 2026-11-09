import { useState } from 'react';

/**
 * ProjectImage
 *
 * Renders a project screenshot with an automatic fallback placeholder when the
 * source image fails to load (e.g. broken external URLs, opaque cross-origin
 * responses, missing local files). Prevents broken-image icons from appearing
 * in the UI.
 *
 * The error state is keyed to its `src`, so when the source changes the
 * fallback is automatically reset — a new image source gets a fresh chance
 * to load.
 */
interface ProjectImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}

export function ProjectImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
}: ProjectImageProps): React.JSX.Element {
  // Associate the error state with its image source. A different src
  // automatically resets the fallback — the new image gets a fresh chance
  // to load because `imageError.src === src` will be false.
  const [imageError, setImageError] = useState<{ src: string; broken: boolean } | null>(null);

  const broken = imageError?.src === src && imageError.broken;

  if (broken) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt ? `${alt} — image unavailable` : undefined}
        aria-hidden={alt ? undefined : true}
        className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-line/50 p-6 text-center text-muted ${className}`}
      >
        <svg
          className="h-12 w-12 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-medium">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => {
        setImageError({ src, broken: true });
      }}
      className={className}
    />
  );
}
