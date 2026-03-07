import { ShoppingBag } from 'lucide-react';

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span className="font-display text-lg font-bold">Neeraja Collections</span>
        </div>
        <div className="flex gap-6 font-body text-sm text-primary-foreground/70">
          {['Home', 'Products', 'About', 'Contact'].map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary-foreground transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
        <p className="font-body text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Neeraja Collections. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
