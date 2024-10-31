"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);

        const productsList: Product[] = productsSnapshot.docs.map((doc) => {
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
            maxPrice,
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
    router.push(`/products/${productId}`);
  };

  return (
    <div className="md:mx-8 md:px-12 px-4 mt-20">
      <h1 className="text-4xl font-bold mb-4">PRODUCTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleViewDetails(product.id)}
            className="product-card bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-200 ease-in-out flex flex-col justify-between hover:cursor-pointer"
          >
            {product.photos[0] && (
              <img
                src={product.photos[0]}
                alt={product.name}
                className="w-full landscape:min-h-72 object-cover rounded-md"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
              <p className="text-lg text-gray-500 font-semibold ">
                R{product.minPrice} - R{product.maxPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
