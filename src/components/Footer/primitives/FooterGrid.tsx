import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FooterGridProps {
  children: ReactNode;
  className?: string;
}

export const FooterGrid = ({ children, className }: FooterGridProps) => {
  return (
    <div className={cn("-mx-4 flex flex-wrap", className)}>
      {children}
    </div>
  );
};

interface FooterColumnProps {
  children: ReactNode;
  className?: string;
  width?: "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/12" | "2/12" | "6/12";
}

export const FooterColumn = ({ children, className, width = "full" }: FooterColumnProps) => {
  const widthClasses = {
    "full": "w-full",
    "1/2": "w-full sm:w-1/2 md:w-1/2",
    "1/3": "w-full md:w-1/3",
    "2/3": "w-full md:w-2/3",
    "1/4": "w-full sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12",
    "3/12": "w-full sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12",
    "2/12": "w-full sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12",
    "6/12": "w-full md:w-2/3 lg:w-6/12 xl:w-3/12",
  };

  return (
    <div className={cn("px-4", widthClasses[width], className)}>
      <div className="mb-10 w-full">
        {children}
      </div>
    </div>
  );
};
