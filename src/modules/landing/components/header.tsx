"use client";

import { useState } from "react";
import { List, Phone, ShoppingCart, X } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import Link from "next/link";

import { Button } from "@/shared";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Headshot studio" },
  { href: "/faq", label: "FAQ" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="px-6 sm:px-12">
        <div className="flex h-19 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-xl font-bold tracking-tight md:text-2xl">
            SWEETPIX
          </Link>

          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2xl py-xl hover:bg-brand-primary-hover hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button variant="outlined-primary" size="md" startIcon={Phone}>
                Contact
              </Button>
              <Button variant="primary" size="md" startIcon={ShoppingCart}>
                Order Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-16 right-0 left-0 border-t border-neutral-200 bg-white transition-all duration-300 lg:hidden",
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="flex flex-col gap-4 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="body-lg text-neutral-600 transition-colors hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="outlined-primary" size="md" startIcon={Phone} fullWidth>
            Contact
          </Button>
          <Button variant="primary" size="md" startIcon={ShoppingCart} fullWidth>
            Order Now
          </Button>
        </div>
      </div>
    </header>
  );
};
