import { use } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Image from 'next/image';

interface Product {
  name: string;
  description?: string;
  sizes: string[];
  materials: string[];
  prices: { [key: string]: number };
  photos: string[];
}

async function fetchProductData(id: string) {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    return productSnap.data() as Product;
  } else {
    throw new Error("No such document!");
  }
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = use(fetchProductData(id));

  return (
    <div className="p-6 mt-16">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      
      {product.description && (
        <p className="mt-2 text-lg text-gray-700">{product.description}</p>
      )}

      <div className="mt-6">
        <div className="carousel-container flex overflow-x-scroll space-x-4 carousel-scroll ">
          {product.photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`${product.name} ${index + 1}`}
              width={300}
              height={300}
              className="object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Size</th>
              {product.materials.map(material => (
                <th key={material} className="border border-gray-300 px-4 py-2">{material}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product.sizes.map(size => (
              <tr key={size}>
                <td className="border border-gray-300 px-4 py-2">{size}</td>
                {product.materials.map(material => (
                  <td key={`${size}_${material}`} className="border border-gray-300 px-4 py-2">
                    {product.prices[`${size}_${material}`] !== undefined
                      ? `R${product.prices[`${size}_${material}`]}`
                      : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
