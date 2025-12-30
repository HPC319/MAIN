import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const HeroSection = ({ children, className, id = "home" }: HeroSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]",
        className
      )}
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
