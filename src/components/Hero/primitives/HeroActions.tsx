import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroActionsProps {
  children: ReactNode;
  className?: string;
}

export const HeroActions = ({ children, className }: HeroActionsProps) => {
  return (
    <ul className={cn(
      "mb-10 flex flex-wrap items-center justify-center gap-5",
      className
    )}>
      {children}
    </ul>
  );
};

interface HeroActionItemProps {
  children: ReactNode;
  className?: string;
}

export const HeroActionItem = ({ children, className }: HeroActionItemProps) => {
  return (
    <li className={className}>
      {children}
    </li>
  );
};
