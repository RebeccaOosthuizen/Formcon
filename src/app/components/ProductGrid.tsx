// src/components/ProductGrid.tsx

import React from 'react';
import ProductCard from './ProductCard';

// Sample product data (Replace with actual data or fetch from database)
const products = [
  { id: 1, name: 'Product One', price: 29.99, image: '/path/to/image1.jpg' },
  { id: 2, name: 'Product Two', price: 39.99, image: '/path/to/image2.jpg' },
  { id: 3, name: 'Product Three', price: 49.99, image: '/path/to/image3.jpg' },
];

const ProductGrid: React.FC = () => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold text-center mb-8">Featured Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
