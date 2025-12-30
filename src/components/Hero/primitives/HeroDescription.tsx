import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroDescriptionProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export const HeroDescription = ({ 
  children, 
  className,
  maxWidth = "max-w-[600px]"
}: HeroDescriptionProps) => {
  return (
    <p
      className={cn(
        "mx-auto mb-9 text-base font-medium text-white sm:text-lg sm:leading-[1.44]",
        maxWidth,
        className
      )}
    >
      {children}
    </p>
  );
};
