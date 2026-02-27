import {
  FacebookLogo,
  InstagramLogo,
  PinterestLogo,
  TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const socialLinks = [
  { icon: InstagramLogo, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookLogo, href: "https://facebook.com", label: "Facebook" },
  { icon: PinterestLogo, href: "https://pinterest.com", label: "Pinterest" },
  { icon: TiktokLogo, href: "https://tiktok.com", label: "TikTok" },
];

const footerLinks = [
  { label: "Shop", href: "/shop" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-8 text-white">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            SWEETPIX
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="body-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-white"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="body-xs text-white/50">
            &copy; {currentYear} SWEETPIX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
