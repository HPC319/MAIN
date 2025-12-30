import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}

export const HeroHeading = ({ 
  children, 
  className,
  as: Component = "h1" 
}: HeroHeadingProps) => {
  return (
    <Component
      className={cn(
        "mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]",
        className
      )}
    >
      {children}
    </Component>
  );
};
