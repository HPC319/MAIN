import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FooterContainerProps {
  children: ReactNode;
  className?: string;
}

export const FooterContainer = ({ children, className }: FooterContainerProps) => {
  return (
    <footer className={cn("relative z-10 bg-gray-950 pt-20 lg:pt-[100px]", className)}>
      <div className="container">
        {children}
      </div>
    </footer>
  );
};
