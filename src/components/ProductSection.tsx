import { useState } from 'react';
<<<<<<< HEAD
import { useProducts } from '@/context/ProductContext';
import { categories, type Category } from '@/data/products';
import ProductCard from './ProductCard';

const ProductSection = () => {
  const { products } = useProducts();
=======
import { products, categories, type Category } from '@/data/products';
import ProductCard from './ProductCard';

const ProductSection = () => {
>>>>>>> f825538e180e43f6e91254ed2af4ea4b9d7fe74b
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Our Collection</p>
          <h2 className="font-display text-4xl font-bold text-foreground">Shop by Category</h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category | 'All')}
              className={`font-body text-sm px-5 py-2 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
