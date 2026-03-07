import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/products';

const ContactSection = () => {
  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I would like to know more about your collections.')}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Get in Touch</p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">Contact Us</h2>
          <p className="font-body text-muted-foreground mb-10">
            Have questions or want to place a bulk order? Reach out to us on WhatsApp!
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-4">
              <Phone className="h-6 w-6 text-primary mb-3" />
              <p className="font-body text-sm font-medium text-foreground">+91 98765 43210</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <MessageCircle className="h-6 w-6 text-primary mb-3" />
              <p className="font-body text-sm font-medium text-foreground">WhatsApp Available</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <MapPin className="h-6 w-6 text-primary mb-3" />
              <p className="font-body text-sm font-medium text-foreground">Home Business, India</p>
            </div>
          </div>

          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-primary-foreground font-body font-medium px-8 py-3 rounded-full transition-colors text-sm"
          >
            <MessageCircle className="h-5 w-5" />
            Chat with us on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
