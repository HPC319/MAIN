import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FooterLinksProps {
  title: string;
  links: Array<{ href: string; label: string }>;
  className?: string;
}

export const FooterLinks = ({ title, links, className }: FooterLinksProps) => {
  return (
    <div className={className}>
      <h4 className="mb-9 text-lg font-semibold text-white">{title}</h4>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FooterLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
}

export const FooterLink = ({ href, children, className, target }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={cn("text-base text-gray-7 hover:text-white hover:underline", className)}
    >
      {children}
    </Link>
  );
};
