import About from "@/components/About";
import { ContactDialogProvider } from "@/components/ContactDialogProvider";
import CredibilityBar from "@/components/CredibilityBar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InstagramStrip from "@/components/InstagramStrip";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import Programs from "@/components/Programs";
import ScrollReveal from "@/components/ScrollReveal";
import Shop from "@/components/Shop";
import Supplements from "@/components/Supplements";
import Testimonials from "@/components/Testimonials";

export default function SitePage() {
  return (
    <ContactDialogProvider>
      <JsonLd />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <CredibilityBar />
        <div className="relative w-full overflow-x-hidden">
          <Programs />
        </div>
        <About />
        <Testimonials />
        <Packages />
        <Shop />
        <Supplements />
        <FinalCTA />
        <InstagramStrip />
      </main>
      <Footer />
      <ScrollReveal />
    </ContactDialogProvider>
  );
}
