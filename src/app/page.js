import SmoothScroll from "@/components/layout/SmoothScroll";
import StarfieldCanvas from "@/components/layout/StarfieldCanvas";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import KineticMarquee from "@/components/sections/KineticMarquee";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WorkflowSection from "@/components/sections/WorkflowSection";
import ProjectArchive from "@/components/sections/ProjectArchive";
import CertificateSection from "@/components/sections/CertificateSection";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <StarfieldCanvas />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <KineticMarquee />
        <AboutSection />
        <ServicesSection />
        <FeaturedProjects />
        <WorkflowSection />
        <ProjectArchive />
        <CertificateSection />
        <JourneyTimeline />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
