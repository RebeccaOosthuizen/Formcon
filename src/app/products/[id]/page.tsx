import { use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Image from "next/image";

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

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = use(fetchProductData(id));

  return (
    <div className="mt-16 pt-3">
      <h1 className="text-3xl font-bold ml-6 mr-6">{product.name}</h1>

      {product.description && (
        <p className="mt-2 text-lg text-gray-700 ml-6 mr-6">{product.description}</p>
      )}

      <div className="mt-6 overflow-x-scroll w-[100vw]">
        <div className="carousel-container flex space-x-4 carousel-scroll portrait:pr-6">
          {product.photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`${product.name} ${index + 1}`}
              width={300}
              height={3000}
              className="object-cover rounded-lg ml-6 mb-2"
            />
          ))}
        </div>
      </div>

      <div className="overflow-x-scroll w-[100vw] portrait:pr-40">
        <div className="mt-8 portrait:text-sm w-full portrait:mr-14">
          <table className=" w-fit border border-gray-300 portrait:text-sm mx-6 portrait:mr-12 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Size</th>
                {product.materials.map((material) => (
                  <th
                    key={material}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {material}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((size) => (
                <tr key={size}>
                  <td className="border border-gray-300 px-4 py-2">{size}</td>
                  {product.materials.map((material) => (
                    <td
                      key={`${size}_${material}`}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {product.prices[`${size}_${material}`] !== undefined
                        ? `R${product.prices[`${size}_${material}`]}`
                        : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
