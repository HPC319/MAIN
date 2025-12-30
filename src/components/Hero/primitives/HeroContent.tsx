import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroContentProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export const HeroContent = ({ 
  children, 
  className,
  centered = true 
}: HeroContentProps) => {
  return (
    <div
      className={cn(
        "hero-content mx-auto max-w-[780px]",
        centered && "text-center",
        className
      )}
    >
      {children}
    </div>
  );
};
