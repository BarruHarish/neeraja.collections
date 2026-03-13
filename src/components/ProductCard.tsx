import { MessageCircle } from 'lucide-react';
import { Product, WHATSAPP_NUMBER } from '@/data/products';

const ProductCard = ({ product }: { product: Product }) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in "${product.name}" priced at ₹${product.price}. Please share more details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/5] overflow-hidden bg-rose-light">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">
          {product.name}
        </h3>
        <p className="font-body text-lg font-bold text-primary mb-3">₹{product.price.toLocaleString()}</p>
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-primary-foreground font-body text-sm font-medium py-2.5 rounded-md transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
