import Link from "next/link";
import Image from "next/image";
import heroImg from "@/public/IMG_7137.jpg";
import logoImg from "@/public/Logo.png";

export default function HeroSection() {
  return (
    <section className="hero_section bg-white px-4 sm:px-6 py-12 sm:py-16 lg:py-24 relative overflow-hidden mt-16 md:mt-20">
      {/* Oversized watermark wordmark */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
          <div
            className="font-serif italic font-thin text-[18vw] md:text-[16vw] lg:text-[14vw] select-none"
            style={{
              color: "rgba(114, 47, 55, 0.04)",
              lineHeight: "0.8",
              whiteSpace: "nowrap",
            }}
          >
            Maquillage
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-[1320px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left column - Hero image placeholder */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Burgundy backdrop */}
              <div className="absolute inset-0 bg-brand-primary/10 rounded-lg transform scale-105 -z-10"></div>

              {/* Main hero image */}
              <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-white">
                <Image
                  src={heroImg}
                  alt="Featured makeup look by Maryam"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-white/80 px-3 py-2 rounded-md shadow-sm">
                  <Image src={logoImg} alt="Maquillage by Maryam logo" width={120} height={30} />
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8 text-left md:text-left">
            {/* Intro tagline */}
            <div className="animate-fade-in-up">
              <p className="font-sans text-[12px] sm:text-[14px] text-[#666] mb-3 sm:mb-4 lg:mb-6">
                Professional makeup artistry and education
              </p>
            </div>

            {/* Main headline */}
            <div className="animate-fade-in-up animation-delay-100">
              <h1 className="font-serif font-bold text-[#111] leading-tight">
                <div className="text-[clamp(2rem,8vw,4.5rem)] lg:text-[4.5rem] italic">
                  Enhance Your Beauty
                </div>
                <div className="text-[clamp(2rem,8vw,4.5rem)] lg:text-[4.5rem] ml-2 sm:ml-4 lg:ml-8 text-brand-primary">
                  — With Maryam
                </div>
              </h1>
            </div>

            {/* Supporting paragraph */}
            <div className="animate-fade-in-up animation-delay-200">
              <p className="font-sans text-[14px] sm:text-[16px] text-[#222] leading-relaxed max-w-[42ch] mb-4 sm:mb-6 lg:mb-8">
                From bridal glam to everyday elegance, discover professional
                makeup services and learn the art of beauty through our expert
                classes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center h-[48px] sm:h-[54px] px-[40px] sm:px-[67px] bg-brand-primary rounded-lg border border-transparent hover:bg-brand-dark active:bg-brand-darker hover:translate-y-[-1px] hover:shadow-[0_4px_12px_rgba(114,47,55,0.3)] active:translate-y-[0px] active:shadow-[0_2px_6px_rgba(114,47,55,0.2)] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 group"
              >
                <span className="font-sans font-semibold text-[14px] sm:text-[16px] text-white uppercase tracking-[0.4px] sm:tracking-[0.6px]">
                  BOOK APPOINTMENT
                </span>
              </Link>

              <Link
                href="/classes"
                className="inline-flex items-center justify-center h-[48px] sm:h-[54px] px-[40px] sm:px-[67px] bg-transparent rounded-lg border-2 border-brand-primary hover:bg-brand-primary hover:text-white active:bg-brand-dark hover:translate-y-[-1px] hover:shadow-[0_4px_12px_rgba(114,47,55,0.3)] active:translate-y-[0px] active:shadow-[0_2px_6px_rgba(114,47,55,0.2)] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 group"
              >
                <span className="font-sans font-semibold text-[14px] sm:text-[16px] text-brand-primary group-hover:text-white uppercase tracking-[0.4px] sm:tracking-[0.6px]">
                  LEARN MAKEUP
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
