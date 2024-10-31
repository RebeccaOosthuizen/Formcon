"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Product {
  id: string;
  name: string;
  description: string;
  photos: string[];
  minPrice: number;
  maxPrice: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter(); // Initialize the router for client-side navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        // Map through each document in the snapshot and calculate min/max prices
        const productsList: Product[] = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          const priceValues = Object.values(data.prices) as number[];

          const minPrice = Math.min(...priceValues);
          const maxPrice = Math.max(...priceValues);

          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            photos: data.photos || [],
            minPrice,
            maxPrice
          };
        });

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (productId: string) => {
    router.push(`/products/${productId}`); // Use router.push to navigate
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-16">
      {products.map(product => (
        <div key={product.id} className="product-card bg-white shadow-lg rounded-lg p-4">
          {product.photos[0] && (
            <img src={product.photos[0]} alt={product.name} className="w-full object-cover rounded-md" />
          )}
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-2">Price Range: ${product.minPrice} - ${product.maxPrice}</p>
          <button
            onClick={() => handleViewDetails(product.id)} // Use handler for client-side navigation
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
