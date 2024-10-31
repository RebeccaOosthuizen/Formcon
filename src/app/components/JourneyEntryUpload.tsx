"use client";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";

export default function JourneyEntryUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadedPhotoURLs, setUploadedPhotoURLs] = useState<string[]>([]);

  const uploadPhoto = async (file: File): Promise<string> => {
    const fileRef = ref(storage, `journey_photos/${title}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setPhotos(filesArray);
    }
  };

  const handleSubmit = async () => {
    try {
      const urls = await Promise.all(photos.map((file) => uploadPhoto(file)));
      setUploadedPhotoURLs(urls);

      const journeyData = {
        title,
        description,
        photos: urls,
      };

      await addDoc(collection(db, "journeyEntries"), journeyData);
      alert("Journey entry added successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding entry: ", error);
      alert("Error adding entry. Check the console for details.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPhotos([]);
    setUploadedPhotoURLs([]);
  };

  return (
    <div>
      <h2 className="mb-2">Upload New Journey Entry</h2>
      <div className="p-4 bg-[#c9d6cc] rounded-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          rows={4}
        />

        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="mb-2"
        />

        <br />
        <div className="flex justify-between items-center">
          <button
            onClick={handleSubmit}
            className="bg-[#233326] text-white py-2 px-4 rounded hover:bg-[#344b38] transition duration-200 ease-in-out mt-2"
          >
            Submit Entry
          </button>
          <button
            onClick={resetForm}
            className="bg-[#677569] text-white py-2 px-4 rounded hover:bg-[#79867b] transition duration-200 ease-in-out"
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
}
