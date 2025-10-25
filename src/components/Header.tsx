"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/appointments" },
    { name: "Classes", href: "/classes" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="font-serif text-2xl md:text-3xl text-brand-primary italic font-medium">
                MaquillagebyMaryam
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Book Now Button */}
          <div className="hidden md:flex">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark active:bg-brand-darker transition-all duration-200 hover:shadow-lg"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-brand-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-primary transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/appointments"
                  className="block w-full text-center px-6 py-3 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
