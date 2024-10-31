// ContactPage.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import AddProduct from "../../components/ProductUpload";
import AddJourney from "../../components/JourneyEntryUpload";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="md:mx-8 md:px-12 px-8 mt-20">
      <div className="w-full flex justify-between items-center mt-10 ">
      <h1 className="text-4xl font-bold">ADMIN DASHBOARD</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition h-fit"
        >
          Log Out
        </button>
      </div>
      
      {/* Your dashboard content here */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-32 md:mt-12 mt-6 w-full">
        <div className="w-full md:w-1/2">
          <AddProduct />
        </div>
        <div className="w-full md:w-1/2">
          <AddJourney />
        </div>
      </div>
      
    </div>
  );
}
