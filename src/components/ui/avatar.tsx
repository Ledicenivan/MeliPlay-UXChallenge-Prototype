import { cn } from "@/lib/utils";

const avatarSizes = {
  small: "size-6",
  large: "size-12",
} as const;

export interface AvatarProps {
  className?: string;
  size?: keyof typeof avatarSizes;
  src?: string | null;
  alt?: string;
}

export function Avatar({
  className,
  size = "large",
  src,
  alt = "",
}: AvatarProps) {
  const sizeClass = avatarSizes[size];
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full bg-background-muted shrink-0",
        sizeClass,
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      ) : (
        <div
          className={cn(
            "size-full flex items-center justify-center bg-background-muted",
            sizeClass
          )}
          aria-hidden
        >
          <svg
            className="size-[60%] text-text-subtle"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}
    </div>
  );
}
