import Link from "next/link";
import type { Route } from "next";
import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FooterSocialProps {
  links: Array<{ href: string; icon: ReactNode; label?: string }>;
  className?: string;
}

export const FooterSocial = ({ links, className }: FooterSocialProps) => {
  return (
    <div className={cn("-mx-3 flex items-center", className)}>
      {links.map((link, index) => (
        <Link
          key={index}
          aria-label={link.label || "social link"}
          href={link.href as Route}
          className="px-3 text-gray-7 hover:text-white"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};
