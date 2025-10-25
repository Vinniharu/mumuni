"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
  imageUrl: StaticImageData | string;
}

import bridalImg from "@/public/IMG_bridal 1.jpg";
import eventImg from "@/public/IMG_7759.jpg";
import photoshootImg from "@/public/IMG_7137.jpg";
import everydayImg from "@/public/IMG_8194.jpg";

export default function AppointmentsPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });

  const services: Service[] = [
    {
      id: "bridal",
      title: "Bridal Makeup",
      description: "Complete bridal transformation including trial session, wedding day makeup, and touch-ups.",
      price: "₦50,000 - ₦80,000",
      duration: "3-4 hours",
      includes: ["Consultation & trial", "Wedding day makeup", "Touch-up kit", "Photography ready"],
      imageUrl: bridalImg,
    },
    {
      id: "event",
      title: "Event Makeup",
      description: "Glamorous makeup for special occasions, parties, and formal events.",
      price: "₦25,000 - ₦40,000",
      duration: "1.5-2 hours",
      includes: ["Consultation", "Full face makeup", "Lash application", "Setting spray"],
      imageUrl: eventImg,
    },
    {
      id: "photoshoot",
      title: "Photoshoot Makeup",
      description: "Professional makeup designed for photography and camera-ready perfection.",
      price: "₦30,000 - ₦45,000",
      duration: "2-3 hours",
      includes: ["HD makeup application", "Contouring & highlighting", "Multiple look changes", "Touch-ups"],
      imageUrl: photoshootImg,
    },
    {
      id: "everyday",
      title: "Everyday Glam",
      description: "Natural, polished makeup perfect for work, meetings, or daily confidence boost.",
      price: "₦15,000 - ₦25,000",
      duration: "1-1.5 hours",
      includes: ["Skin prep", "Natural enhancement", "Brow shaping", "Lip color"],
      imageUrl: everydayImg,
    },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setFormData((prev) => ({ ...prev, service: service.title }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      toast.success("Appointment booked successfully! We will contact you shortly to confirm.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "",
        message: "",
      });
      setSelectedService(null);
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-brand-primary/5 to-white">
        <div className="max-w-[1320px] mx-auto text-center">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-brand-primary mb-4 italic">
            Book Your Appointment
          </h1>
          <p className="font-sans text-[18px] text-[#666] max-w-2xl mx-auto leading-relaxed">
            Choose from our range of professional makeup services and let us enhance your natural beauty for any occasion.
          </p>
        </div>
      </section>

      {/* Services Selection */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-serif text-[2.5rem] text-[#111] mb-12 text-center">Choose Your Service</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedService?.id === service.id
                    ? "border-brand-primary shadow-xl"
                    : "border-gray-200 hover:border-brand-primary/50 hover:shadow-lg"
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-[1.5rem] text-brand-primary font-semibold">{service.title}</h3>
                    <span className="font-sans text-[16px] font-semibold text-brand-primary">{service.price}</span>
                  </div>

                  <p className="font-sans text-[14px] text-[#666] mb-4 leading-relaxed">{service.description}</p>

                  <div className="space-y-2">
                    <p className="font-sans text-[13px] text-[#888]">
                      <span className="font-semibold">Duration:</span> {service.duration}
                    </p>

                    <div>
                      <p className="font-sans text-[13px] text-[#888] font-semibold mb-1">Includes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {service.includes.map((item, index) => (
                          <li key={index} className="font-sans text-[12px] text-[#888]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {selectedService?.id === service.id && (
                    <div className="mt-4 p-3 bg-brand-primary/10 rounded-lg">
                      <p className="font-sans text-[13px] text-brand-primary font-semibold">
                        ✓ Selected - Continue to booking form below
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      {selectedService && (
        <section className="py-16 px-4 sm:px-6 bg-[#faf9f7]">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-[2rem] text-brand-primary mb-8 text-center">
              Book Your {selectedService.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Preferred Time *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your event, skin type, any allergies, or special requests..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary text-white py-4 rounded-lg font-sans font-semibold text-[16px] uppercase tracking-wide hover:bg-brand-dark active:bg-brand-darker transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
