import React from "react";
import Image from "next/image";
import main from "../../public/main.jpg";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative w-full landscape:h-screen overflow-hidden portrait:mt-16">
        <Image src={main} alt="Logo" className="w-full object-cover" />

        <div className="absolute inset-0 bg-black bg-opacity-70 w-[50vw] portrait:w-full flex items-center p-4">
          <div className="flex items-center justify-center text-white flex-col p-4 ">
            <h1 className="landscape:text-7xl portrait:text-xl text-[#E2C4A8] font-alfa ">
              Tuinbou en Huis
            </h1>
            <p className="landscape:text-4xl text-center landscape:pt-10 portrait:pt-4 portrait:w-[70%]">
              Vervaardiger van beton, staal en hout produkte vir die tuin en
              huis.
            </p>
          </div>
        </div>
      </section>

      <section className="p-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/products" className="hover:text-[#384b3c]">
            <div className="rounded-lg shadow-lg hover:shadow-xl transition relative">
              <img
                src={"./img4.jpg"}
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 portrait:w-full flex items-center p-4 rounded-lg justify-center flex-col">
                <div className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer h-full w-full flex items-center justify-center flex-col">
                  <p className="text-white text-center font-bree landscape:text-7xl text-4xl">
                    Products
                  </p>
                  <p className="text-white text-center font-bree landscape:text-7xl text-4xl">
                    & Prices
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/journey" className="hover:text-[#384b3c]">
            <div className="rounded-lg shadow-lg hover:shadow-xl transition relative">
              <img
                src={"./img3.jpg"}
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 portrait:w-full flex items-center p-4 rounded-lg justify-center flex-col">
                <div className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer h-full w-full flex items-center justify-center flex-col">
                  <p className="text-white text-center font-bree landscape:text-7xl text-4xl">
                    See the
                  </p>
                  <p className="text-white text-center font-bree landscape:text-7xl text-4xl">
                    Journey
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/contact" className="hover:text-[#384b3c]">
            <div className="rounded-lg shadow-lg hover:shadow-xl transition relative">
              <img
                src={"./img1.jpg"}
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 portrait:w-full flex items-center p-4 rounded-lg justify-center flex-col">
                <div className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer h-full w-full flex items-center justify-center flex-col">
                  <p className="text-white text-center font-bree landscape:text-7xl text-4xl">
                    Get in
                  </p>
                  <p className="text-white text-center font-bree landscape:text-7xl text-4xl">
                    Touch
                  </p>
                </div>
              </div>
            </div>
          </Link>



        </div>
      </section>
    </>
  );
}
