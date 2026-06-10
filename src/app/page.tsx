import About from "@/components/About";
import { ContactDialogProvider } from "@/components/ContactDialogProvider";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FreeWorkout from "@/components/FreeWorkout";
import Hero from "@/components/Hero";
import InstagramStrip from "@/components/InstagramStrip";
import Method from "@/components/Method";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import Results from "@/components/Results";
import ScrollReveal from "@/components/ScrollReveal";
import Testimonials from "@/components/Testimonials";
import TrustBar from "@/components/TrustBar";
import VideoFeature from "@/components/VideoFeature";

export default function Home() {
  return (
    <ContactDialogProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <About />
        <Method />
        <Packages />
        <Results />
        <VideoFeature />
        <FreeWorkout />
        <Testimonials />
        <FAQ />
        <InstagramStrip />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
      <ScrollReveal />
    </ContactDialogProvider>
  );
}
