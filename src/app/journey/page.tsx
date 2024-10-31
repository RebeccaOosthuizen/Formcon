"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface JourneyEntry {
  id: string;
  title: string;
  description: string;
  photos: string[];
}

export default function JourneyPage() {
  const [entries, setEntries] = useState<JourneyEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const journeyCollection = collection(db, 'journeyEntries');
      const journeySnapshot = await getDocs(journeyCollection);

      const entriesList: JourneyEntry[] = journeySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as JourneyEntry));

      setEntries(entriesList);
    };

    fetchEntries();
  }, []);

  return (
    <div className="md:mx-8 md:px-12 px-4 mt-20">
      <h1 className="text-4xl font-bold mb-4">JOURNEY</h1>
      <div className="space-y-8">
        {entries.map(entry => (
          <JourneyEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function JourneyEntryCard({ entry }: { entry: JourneyEntry }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === entry.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? entry.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-4">
      <div className="relative w-full md:w-1/3">
        {entry.photos.length > 1 && (
          <>
            <button
              onClick={showPrevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-700 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
            >
              &lt;
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-700 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
            >
              &gt;
            </button>
          </>
        )}
        <img
          src={entry.photos[currentIndex]}
          alt={`${entry.title} photo ${currentIndex + 1}`}
          className="w-full max-h-96 object-cover rounded-lg"
        />
      </div>

      <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-4">
        <h2 className="text-2xl font-semibold mb-2">{entry.title}</h2>
        <p className="text-gray-800">{entry.description}</p>
      </div>
    </div>
  );
}
