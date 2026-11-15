import SmoothScroll from "@/components/layout/SmoothScroll";
import StarfieldCanvas from "@/components/layout/StarfieldCanvas";
import ScrollRocket from "@/components/layout/ScrollRocket";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ProjectArchive from "@/components/sections/ProjectArchive";
import CertificateSection from "@/components/sections/CertificateSection";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <StarfieldCanvas />
      <ScrollRocket />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <AboutSection />
        <FeaturedProjects />
        <ProjectArchive />
        <CertificateSection />
        <JourneyTimeline />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
