"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ClassItem {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  schedule: string;
  includes: string[];
  imageUrl: StaticImageData | string;
}

import beginnerImg from "@/public/IMG_5002.jpg";
import advancedImg from "@/public/IMG_5003.jpg";
import bridalImg2 from "@/public/IMG_bridal 2.jpg";
import businessImg from "@/public/IMG_5004.jpg";

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "",
    experience: "",
    goals: "",
    schedule: "",
  });

  const classes: ClassItem[] = [
    {
      id: "beginner",
      title: "Beginner Basics",
      description: "Perfect for makeup novices. Learn fundamental techniques, color theory, and essential skills.",
      price: "₦35,000",
      duration: "2 days (16 hours)",
      schedule: "Weekend intensive",
      includes: ["Basic makeup kit", "Color theory", "Foundation matching", "Eye makeup basics", "Lip application", "Certificate"],
      imageUrl: beginnerImg,
    },
    {
      id: "advanced",
      title: "Advanced Techniques",
      description: "Master professional techniques including contouring, advanced eye looks, and special effects.",
      price: "₦75,000",
      duration: "5 days (40 hours)",
      schedule: "Monday to Friday",
      includes: ["Professional kit", "Advanced contouring", "Editorial looks", "Color correction", "Photography makeup", "Portfolio shoot", "Certificate"],
      imageUrl: advancedImg,
    },
    {
      id: "bridal",
      title: "Bridal Specialist",
      description: "Specialized course focusing on bridal makeup, cultural looks, and long-lasting techniques.",
      price: "₦60,000",
      duration: "3 days (24 hours)",
      schedule: "Flexible scheduling",
      includes: ["Bridal makeup kit", "Cultural makeup styles", "Airbrush techniques", "Longevity secrets", "Client consultation", "Business tips", "Certificate"],
      imageUrl: bridalImg2,
    },
    {
      id: "business",
      title: "Business Training",
      description: "Learn to build your makeup artistry business, from pricing to marketing and client management.",
      price: "₦45,000",
      duration: "2 days (16 hours)",
      schedule: "Weekend workshop",
      includes: ["Business planning", "Pricing strategies", "Marketing techniques", "Client relations", "Portfolio building", "Social media", "Certificate"],
      imageUrl: businessImg,
    },
  ];

  const handleClassSelect = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setFormData((prev) => ({ ...prev, classType: classItem.title }));
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in class");
      }

      toast.success("Enrollment successful! We will contact you shortly with class details and payment information.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        classType: "",
        experience: "",
        goals: "",
        schedule: "",
      });
      setSelectedClass(null);
    } catch (error) {
      toast.error("Failed to enroll. Please try again.");
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
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-brand-primary mb-4 italic">Makeup Classes</h1>
          <p className="font-sans text-[18px] text-[#666] max-w-2xl mx-auto leading-relaxed">
            Master the art of makeup with our comprehensive courses. From beginner basics to advanced techniques, start your beauty journey today.
          </p>
        </div>
      </section>

      {/* Why Choose Our Classes */}
      <section className="py-16 px-4 sm:px-6 bg-[#faf9f7]">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-serif text-[2.5rem] text-[#111] mb-12 text-center">Why Choose Our Classes?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Expert Instruction", desc: "Learn from Maryam's 9+ years of professional experience and industry expertise." },
              { num: "2", title: "Hands-On Practice", desc: "Practice on real models with professional-grade products and tools." },
              { num: "3", title: "Certification", desc: "Receive professional certification to boost your credibility and career prospects." },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{item.num}</span>
                </div>
                <h3 className="font-serif text-[1.25rem] text-brand-primary mb-3">{item.title}</h3>
                <p className="font-sans text-[14px] text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Selection */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-serif text-[2.5rem] text-[#111] mb-12 text-center">Choose Your Course</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedClass?.id === classItem.id
                    ? "border-brand-primary shadow-xl"
                    : "border-gray-200 hover:border-brand-primary/50 hover:shadow-lg"
                }`}
                onClick={() => handleClassSelect(classItem)}
              >
                <div className="aspect-[4/3] relative">
                  <Image src={classItem.imageUrl} alt={classItem.title} fill placeholder="blur" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-[1.5rem] text-brand-primary font-semibold">{classItem.title}</h3>
                    <span className="font-sans text-[16px] font-semibold text-brand-primary">{classItem.price}</span>
                  </div>

                  <p className="font-sans text-[14px] text-[#666] mb-4 leading-relaxed">{classItem.description}</p>

                  <div className="space-y-2 mb-4">
                    <p className="font-sans text-[13px] text-[#888]">
                      <span className="font-semibold">Duration:</span> {classItem.duration}
                    </p>
                    <p className="font-sans text-[13px] text-[#888]">
                      <span className="font-semibold">Schedule:</span> {classItem.schedule}
                    </p>
                  </div>

                  <div>
                    <p className="font-sans text-[13px] text-[#888] font-semibold mb-2">What's Included:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {classItem.includes.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-brand-primary mr-2 text-[12px]">✓</span>
                          <span className="font-sans text-[12px] text-[#888]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedClass?.id === classItem.id && (
                    <div className="mt-4 p-3 bg-brand-primary/10 rounded-lg">
                      <p className="font-sans text-[13px] text-brand-primary font-semibold">
                        ✓ Selected - Continue to enrollment form below
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      {selectedClass && (
        <section className="py-16 px-4 sm:px-6 bg-[#faf9f7]">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-[2rem] text-brand-primary mb-8 text-center">Enroll in {selectedClass.title}</h2>

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

              <div>
                <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Makeup Experience Level *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                >
                  <option value="">Select your level</option>
                  <option value="Complete Beginner">Complete Beginner</option>
                  <option value="Some Experience">Some Experience</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Preferred Schedule *</label>
                <select
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                >
                  <option value="">Select schedule</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evening Classes">Evening Classes</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-[14px] font-semibold text-[#333] mb-2">Your Goals & Expectations</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your goals, what you hope to achieve, career plans, or any specific techniques you want to learn..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary text-white py-4 rounded-lg font-sans font-semibold text-[16px] uppercase tracking-wide hover:bg-brand-dark active:bg-brand-darker transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enrolling..." : "Enroll Now"}
              </button>
            </form>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
