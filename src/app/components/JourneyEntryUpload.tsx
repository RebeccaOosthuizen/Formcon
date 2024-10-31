"use client";
import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';


export default function JourneyEntryUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

      await addDoc(collection(db, 'journeyEntries'), journeyData);
      alert('Journey entry added successfully');
      resetForm();
    } catch (error) {
      console.error('Error adding entry: ', error);
      alert('Error adding entry. Check the console for details.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPhotos([]);
    setUploadedPhotoURLs([]);
  };

  return (
    <div className="p-6">
      <h2>Upload New Journey Entry</h2>
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

      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
        Submit Entry
      </button>
    </div>
  );
}