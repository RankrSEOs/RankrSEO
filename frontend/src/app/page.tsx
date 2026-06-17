import HeroSection from "@/components/home/HeroSection"
import ServicesSection from "@/components/home/ServicesSection"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import ProcessSection from "@/components/home/ProcessSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import IndustriesSection from "@/components/home/IndustriesSection"
import FAQSection from "@/components/home/FAQSection"
import CTASection from "@/components/home/CTASection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection />
      <IndustriesSection />
      <FAQSection />
      <CTASection />
    </>
  )
}