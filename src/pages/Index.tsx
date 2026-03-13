import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ProductSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
