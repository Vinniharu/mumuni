"use client";

import { Instagram, Facebook, MessageCircle } from "lucide-react";
import Image from "next/image";
import footerBg from "@/public/IMG_5000.jpg";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M200 88.6a59.5 59.5 0 0 1-34-10.8v66.7a62.7 62.7 0 1 1-50-61.6v33a28.5 28.5 0 1 0 20 27.2V24h30a60.2 60.2 0 0 0 34 54.6z" />
  </svg>
);

export default function Footer() {
  const navigationData = {
    Services: [
      "Bridal Makeup",
      "Event Makeup",
      "Photoshoot Makeup",
      "Everyday Glam",
      "Special Occasions",
    ],
    Classes: [
      "Beginner Basics",
      "Advanced Techniques",
      "Bridal Specialist",
      "Business Training",
    ],
    About: ["Our Story", "Maryam's Journey", "Certifications", "Gallery"],
    Contact: ["Book Appointment", "Class Enrollment", "Contact Info", "Location"],
  };

  return (
    <footer className="footer bg-white relative">
      {/* Header Layer */}
      <div className="relative z-10 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="pt-6">
            {/* Desktop & Tablet Layout */}
            <div className="hidden md:flex md:flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-[120px]">
              <div className="mb-6 lg:mb-0 lg:pt-6">
                <p className="font-sans text-[16px] md:text-[18px] leading-[1.4] text-[#9B9B9B] max-w-[300px]">
                  Enhancing natural beauty through professional makeup artistry
                  and education. Transform your beauty journey with us.
                </p>
              </div>

              {/* Navigation Columns */}
              <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-10">
                {Object.entries(navigationData).map(([heading, links]) => (
                  <div key={heading} className="flex-1 min-w-[120px]">
                    <h3 className="font-serif font-semibold text-[18px] md:text-[20px] text-brand-primary mb-4">
                      {heading}
                    </h3>
                    <ul className="space-y-[6px]">
                      {links.map((link, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="font-sans text-[13px] md:text-[14px] text-[#666666] hover:text-brand-primary hover:opacity-80 transition-all duration-150 cursor-pointer"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand wordmark and social links */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-14 gap-6">
              <div>
                <h1 className="font-serif font-medium italic text-[36px] md:text-[48px] lg:text-[72px] text-brand-primary leading-[1.1] text-center md:text-left">
                  Maquillage by Maryam
                </h1>
              </div>

              {/* Social Links - Desktop */}
              <div className="hidden md:flex gap-8 items-center">
                <a
                  href="https://www.instagram.com/maquillagebymaryam?igsh=ZjdlbzU3c2s4dm9v&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
                >
                  <Instagram size={18} /> Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@glamaryam?_t=ZS-8zy8RPoedSj&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
                >
                  <TikTokIcon /> TikTok
                </a>
                <a
                  href="https://www.facebook.com/share/1LisEzBLzn/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
                >
                  <Facebook size={18} /> Facebook
                </a>
                <a
                  href="https://wa.me/2348080354096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Layer */}
      <div className="relative w-full">
        <div className="h-[300px] md:h-[300px] lg:h-[600px] w-full overflow-hidden">
          <Image
            src={footerBg}
            alt="Beautiful makeup workspace with brushes and cosmetics"
            width={1920}
            height={1280}
            placeholder="blur"
            quality={80}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Mobile Social Links - Below image */}
        <div className="md:hidden bg-white py-6">
          <div className="max-w-[1320px] mx-auto px-4">
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/maquillagebymaryam?igsh=ZjdlbzU3c2s4dm9v&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href="https://www.tiktok.com/@glamaryam?_t=ZS-8zy8RPoedSj&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
              >
                <TikTokIcon /> TikTok
              </a>
              <a
                href="https://www.facebook.com/share/1LisEzBLzn/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
              >
                <Facebook size={16} /> Facebook
              </a>
              <a
                href="https://wa.me/2348080354096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-[14px] text-[#888C94] hover:text-brand-primary transition-colors duration-150"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
