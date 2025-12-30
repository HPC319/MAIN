import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FooterBottomProps {
  children: ReactNode;
  className?: string;
}

export const FooterBottom = ({ children, className }: FooterBottomProps) => {
  return (
    <div className={cn("mt-12 border-t border-[#8890A4]/40 py-8 lg:mt-[60px]", className)}>
      <div className="container">
        {children}
      </div>
    </div>
  );
};
