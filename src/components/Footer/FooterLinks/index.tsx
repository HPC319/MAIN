import Link from "next/link";
import type { Route } from "next";

interface LinkItem {
  label: string;
  href: string;
}

interface LinkSection {
  title: string;
  links: LinkItem[];
}

const linkSections: LinkSection[] = [
  {
    title: "About Us",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "How it works", href: "/#features" },
      { label: "Privacy policy", href: "/#" },
      { label: "Terms of Service", href: "/#" },
      { label: "Refund policy", href: "/#" },
    ],
  },
  {
    title: "Our Products",
    links: [
      { label: "Lineicons", href: "https://lineicons.com/" },
      { label: "Ecommerce HTML", href: "https://ecommercehtml.com/" },
      { label: "Ayro UI", href: "https://ayroui.com/" },
      { label: "PlainAdmin", href: "https://plainadmin.com/" },
    ],
  },
];

export const FooterLinks = () => {
  return (
    <>
      {linkSections.map((section) => (
        <div key={section.title} className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
          <div className="mb-10 w-full">
            <h4 className="mb-9 text-lg font-semibold text-foreground">
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as Route}
                    className="inline-block text-base leading-loose text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};
