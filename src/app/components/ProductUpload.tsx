import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../config/firebase";

export default function ProductUpload() {
  const [productName, setProductName] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [uploadedPhotoURLs, setUploadedPhotoURLs] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const handleAddSize = () => {
    const size = prompt("Enter new size:");
    if (size) setSizes([...sizes, size]);
  };

  const handleAddMaterial = () => {
    const material = prompt("Enter new material:");
    if (material) setMaterials([...materials, material]);
  };

  const handlePriceChange = (size: string, material: string, value: string) => {
    setPrices((prev) => ({
      ...prev,
      [`${size}_${material}`]: Number(value),
    }));
  };

  const handlePhotoUpload = async (file: File) => {
    const fileRef = ref(storage, `product_photos/${productName}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setUploadedPhotoURLs((prev) => [...prev, url]);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      handlePhotoUpload(files[i]);
    }
  };

  const handleSubmit = async () => {
    const productData = {
      name: productName,
      description, // Add description to the product data
      sizes,
      materials,
      prices,
      photos: uploadedPhotoURLs,
    };

    try {
      const docRef = await addDoc(collection(db, "products"), productData);
      alert(`Product added with ID: ${docRef.id}`);
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding product. Check the console for details.");
    }
  };

  const resetForm = () => {
    setProductName("");
    setDescription("");
    setSizes([]);
    setMaterials([]);
    setPrices({});
    setUploadedPhotoURLs([]);
  };

  return (
    <div>
      <h2>Upload New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        rows={4}
      />

      <div className="mb-4">
        <button
          onClick={handleAddSize}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add Size
        </button>
        <button
          onClick={handleAddMaterial}
          className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
        >
          Add Material
        </button>
      </div>
      <table className="table-fixed border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Size</th>
            {materials.map((material) => (
              <th key={material} className="border border-gray-300 px-4 py-2">
                {material}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size}>
              <td className="border border-gray-300 px-4 py-2">{size}</td>
              {materials.map((material) => (
                <td
                  key={`${size}_${material}`}
                  className="border border-gray-300 px-4 py-2"
                >
                  <input
                    type="number"
                    placeholder="Price"
                    value={prices[`${size}_${material}`] || ""}
                    onChange={(e) =>
                      handlePriceChange(size, material, e.target.value)
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-4">
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="mb-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Product
      </button>
    </div>
  );
}
