export type Category = 'Sarees' | 'Jewellery' | 'Bangles' | 'Handbags' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description?: string;
}

<<<<<<< HEAD
export const WHATSAPP_NUMBER = '919505421343'; // Replace with actual number
=======
export const WHATSAPP_NUMBER = '919876543210'; // Replace with actual number
>>>>>>> f825538e180e43f6e91254ed2af4ea4b9d7fe74b

export const categories: Category[] = ['Sarees', 'Jewellery', 'Bangles', 'Handbags', 'Accessories'];

export const products: Product[] = [
  // Sarees
  { id: 's1', name: 'Kanchipuram Silk Saree', price: 4500, category: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop' },
  { id: 's2', name: 'Banarasi Silk Saree', price: 3800, category: 'Sarees', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop' },
  { id: 's3', name: 'Cotton Handloom Saree', price: 1200, category: 'Sarees', image: 'https://images.unsplash.com/photo-1614886137651-2624ad4406b4?w=400&h=500&fit=crop' },
  { id: 's4', name: 'Georgette Designer Saree', price: 2500, category: 'Sarees', image: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&h=500&fit=crop' },
  { id: 's5', name: 'Chiffon Party Wear Saree', price: 1800, category: 'Sarees', image: 'https://images.unsplash.com/photo-1604502046685-13607e4e4c69?w=400&h=500&fit=crop' },
  { id: 's6', name: 'Linen Casual Saree', price: 950, category: 'Sarees', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop' },

  // Jewellery
  { id: 'j1', name: 'Temple Gold Necklace Set', price: 1500, category: 'Jewellery', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop' },
  { id: 'j2', name: 'Pearl Choker Set', price: 800, category: 'Jewellery', image: 'https://images.unsplash.com/photo-1515562141589-67f0d999b36b?w=400&h=500&fit=crop' },
  { id: 'j3', name: 'Kundan Earrings', price: 450, category: 'Jewellery', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop' },
  { id: 'j4', name: 'Antique Jhumka Set', price: 650, category: 'Jewellery', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=500&fit=crop' },

  // Bangles
  { id: 'b1', name: 'Gold Plated Bangle Set', price: 350, category: 'Bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop' },
  { id: 'b2', name: 'Silk Thread Bangles', price: 200, category: 'Bangles', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=500&fit=crop' },
  { id: 'b3', name: 'Stone Studded Bangles', price: 500, category: 'Bangles', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=500&fit=crop' },

  // Handbags
  { id: 'h1', name: 'Embroidered Clutch', price: 600, category: 'Handbags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop' },
  { id: 'h2', name: 'Silk Potli Bag', price: 450, category: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop' },
  { id: 'h3', name: 'Designer Tote Bag', price: 850, category: 'Handbags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop' },

  // Accessories
  { id: 'a1', name: 'Hair Accessories Set', price: 250, category: 'Accessories', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=500&fit=crop' },
  { id: 'a2', name: 'Kamarband Waist Belt', price: 550, category: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=500&fit=crop' },
  { id: 'a3', name: 'Maang Tikka Set', price: 300, category: 'Accessories', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=500&fit=crop' },
];
