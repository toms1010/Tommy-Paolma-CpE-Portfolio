import { useState } from 'react';

/**
 * ProjectImage
 *
 * Renders a project screenshot with an automatic fallback placeholder when the
 * source image fails to load (e.g. broken external URLs, opaque cross-origin
 * responses, missing local files). Prevents broken-image icons from appearing
 * in the UI.
 */
interface ProjectImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ProjectImage({
  src,
  alt,
  width,
  height,
  className = '',
}: ProjectImageProps): React.JSX.Element {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className={`flex items-center justify-center bg-line/50 text-muted border border-dashed border-line rounded-lg ${className}`}
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
        <p className="mt-2 text-xs text-muted">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={() => {
        setBroken(true);
      }}
      className={className}
    />
  );
}
