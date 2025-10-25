"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Local images from public
import appointmentsImg from "@/public/IMG_5003.jpg";
import classesImg from "@/public/IMG_5004.jpg";
import about1 from "@/public/IMG_7759.jpg";
import about2 from "@/public/IMG_5001.jpg";
import ctaImg from "@/public/IMG_8194.jpg";

export function ServicesOverview() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services = [
    {
      id: "appointments",
      title: "Makeup Appointments",
      description: "Professional makeup services for all occasions - bridal, events, photoshoots, and everyday glam.",
      price: "Starting from ₦15,000",
      imageUrl: appointmentsImg,
      link: "/appointments",
      ctaText: "BOOK APPOINTMENT",
    },
    {
      id: "classes",
      title: "Makeup Classes",
      description: "Learn professional makeup techniques from beginner basics to advanced artistry and business skills.",
      price: "Starting from ₦25,000",
      imageUrl: classesImg,
      link: "/classes",
      ctaText: "ENROLL NOW",
    },
  ];

  return (
    <section className="services_overview bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-24">
      <div className="max-w-[1320px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#111] mb-4 italic">
            Our Services
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] text-[#666] max-w-2xl mx-auto leading-relaxed">
            Discover our range of professional makeup services and educational programs designed to enhance your beauty journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div className="space-y-4">
                  <h3 className="font-serif text-[1.75rem] md:text-[2rem] font-semibold leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[14px] md:text-[16px] text-gray-200 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                  <p className="font-sans text-[16px] md:text-[18px] font-semibold text-accent-gold">
                    {service.price}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={service.link}
                      className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-sans font-semibold text-[14px] uppercase tracking-wide transition-all duration-200 ${
                        hoveredService === service.id
                          ? "bg-brand-primary text-white border-2 border-brand-primary"
                          : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-primary"
                      }`}
                    >
                      {service.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="about_section bg-[#faf9f7] px-4 sm:px-6 py-16 sm:py-20 md:py-24">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div>
              <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#111] mb-4 italic">
                About Maryam
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-sans text-[16px] md:text-[18px] text-[#444] leading-relaxed">
                Maryam Mumuni, the Creative Director of Maquillagebymaryam is a Lagos-based Professional Makeup and Gele Artist with over nine years of experience in the beauty industry. Known for her flawless application and creative Gele designs, she is dedicated to accentuating her clients' natural beauty.
              </p>
              <p className="font-sans text-[16px] md:text-[18px] text-[#444] leading-relaxed">
                Uniquely, she is also a qualified lawyer, bringing a rare combination of artistic flair and meticulous precision to her work. This ensures a professional and detail-oriented experience from start to finish.
              </p>
              <p className="font-sans text-[16px] md:text-[18px] text-[#444] leading-relaxed">
                With a team of skilled Makeup and Gele Artists available to glam you up for your events in the heart of Lagos and Worldwide, We cannot wait to have you in our Chair!
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-[1.5rem] text-brand-primary font-semibold">
                Certifications & Experience
              </h3>
              <ul className="space-y-2 font-sans text-[14px] md:text-[16px] text-[#555]">
                {[
                  "Certified Professional Makeup Artist (2016)",
                  "Bridal Makeup Specialist Certification",
                  "500+ Happy Brides and Clients",
                  "200+ Students Trained in Makeup Artistry"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-primary mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="space-y-3">
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src={about1}
                  alt="Maryam working"
                  width={600}
                  height={600}
                  placeholder="blur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={about2}
                  alt="Portfolio"
                  width={600}
                  height={450}
                  placeholder="blur"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="testimonial_section relative bg-white min-h-[80vh] py-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className={`font-serif text-[18vw] lg:text-[14vw] xl:text-[12vw] leading-none select-none transition-opacity duration-700 ease-out ${
            isVisible ? "opacity-[0.03]" : "opacity-0"
          }`}
          style={{
            WebkitTextStroke: "1px #722F37",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Beautiful
        </div>
      </div>

      <div className="relative z-10 max-w-[70ch] mx-auto text-center">
        <div
          className={`space-y-6 transition-all duration-600 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-serif font-medium text-[#000000] text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] tracking-tight italic">
            "Maryam transformed me for my wedding day. I felt absolutely stunning and the makeup lasted all day!"
          </h2>
          <div className="font-sans text-[0.875rem] uppercase tracking-wide">
            <span className="text-[#000000] font-normal">– AISHA IBRAHIM, </span>
            <span className="text-[#B3B3B3] font-normal">BRIDE</span>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-10 left-0 right-0 transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <p className="font-sans text-[14px] text-[#666] italic">
                "Best makeup class I've ever taken. Learned so much!"
              </p>
              <p className="font-sans text-[12px] text-[#999] mt-2 uppercase tracking-wide">
                – Fatima A.
              </p>
            </div>
            <div>
              <p className="font-sans text-[14px] text-[#666] italic">
                "Professional service, stunning results every time."
              </p>
              <p className="font-sans text-[12px] text-[#999] mt-2 uppercase tracking-wide">
                – Kemi O.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="call_to_action relative min-h-[55vh] md:min-h-[75vh] overflow-hidden">
      <div className="absolute inset-0 group">
        <Image
          src={ctaImg}
          alt="Makeup workspace"
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center md:object-[70%_center] group-hover:scale-[1.03] transition-transform duration-[12s] ease-[cubic-bezier(0.25,1,0.3,1)]"
        />
        <div className="absolute inset-0 bg-brand-primary bg-opacity-60"></div>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1320px] mx-auto w-full px-6">
          <div className="max-w-[520px]" style={{ marginTop: "100px" }}>
            <div className="space-y-6">
              <h1 className="font-serif font-semibold text-white leading-[1.1]">
                <span className="text-[clamp(32px,6vw,52px)] block italic">
                  Ready to Glow?
                </span>
              </h1>
              <p className="font-sans font-light text-white text-[clamp(15px,3vw,18px)] leading-[1.5]">
                Book your appointment today or enroll in our professional makeup classes. Transform your beauty journey with Maquillage by Maryam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center px-[clamp(28px,5vw,40px)] py-[clamp(12px,2vw,14px)] bg-white border border-white rounded-lg font-sans font-medium text-brand-primary uppercase tracking-[0.6px] text-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-gray-50 active:shadow-[0_2px_6px_rgba(0,0,0,0.1)] active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary transition-all duration-150"
                >
                  BOOK APPOINTMENT
                </Link>
                <Link
                  href="/classes"
                  className="inline-flex items-center justify-center px-[clamp(28px,5vw,40px)] py-[clamp(12px,2vw,14px)] bg-transparent border-2 border-white rounded-lg font-sans font-medium text-white uppercase tracking-[0.6px] text-sm hover:bg-white hover:text-brand-primary active:bg-gray-100 active:text-brand-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary transition-all duration-150"
                >
                  JOIN CLASSES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
