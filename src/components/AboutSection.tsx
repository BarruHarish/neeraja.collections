import { Heart, Truck, Shield } from 'lucide-react';

const features = [
  { icon: Heart, title: 'Handpicked Collection', desc: 'Every piece is carefully curated for quality and style.' },
  { icon: Truck, title: 'All India Delivery', desc: 'We deliver across India with safe and secure packaging.' },
  { icon: Shield, title: 'Quality Assured', desc: '100% authentic products with easy returns.' },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-rose-light">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Our Story</p>
        <h2 className="font-display text-4xl font-bold text-foreground mb-6">About Neeraja Collections</h2>
        <p className="font-body text-muted-foreground leading-relaxed">
          Neeraja Collections is a home-based boutique passionate about bringing you the finest sarees,
          jewellery, and accessories at affordable prices. Started with a love for traditional Indian
          fashion, we handpick every product to ensure you get nothing but the best. Whether it's a
          grand celebration or everyday elegance, we have something special for every woman.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center p-6 bg-background rounded-xl border border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{title}</h3>
            <p className="font-body text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
