import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FooterBrandProps {
  logo: ReactNode;
  description?: string;
  className?: string;
}

export const FooterBrand = ({ logo, description, className }: FooterBrandProps) => {
  return (
    <div className={className}>
      {logo}
      {description && (
        <p className="mb-8 max-w-[270px] text-base text-gray-7">
          {description}
        </p>
      )}
    </div>
  );
};
