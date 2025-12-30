import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroBadgesProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

export const HeroBadges = ({ children, label, className }: HeroBadgesProps) => {
  return (
    <div className={className}>
      {label && (
        <p className="mb-4 text-center text-base font-medium text-white/60">
          {label}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 text-center">
        {children}
      </div>
    </div>
  );
};

interface HeroBadgeItemProps {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
}

export const HeroBadgeItem = ({ 
  children, 
  href, 
  className,
  target = "_blank" 
}: HeroBadgeItemProps) => {
  return (
    <a
      href={href}
      target={target}
      className={cn(
        "text-white/60 duration-300 ease-in-out hover:text-white",
        className
      )}
    >
      {children}
    </a>
  );
};
