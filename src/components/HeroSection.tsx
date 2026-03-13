import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBanner} alt="Neeraja Collections Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-4">
          Elegance Redefined
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Neeraja Collections
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl mx-auto">
          Exquisite sarees, jewellery & accessories — curated with love for the modern woman.
        </p>
        <button
          onClick={scrollToProducts}
          className="bg-primary text-primary-foreground font-body font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide"
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
