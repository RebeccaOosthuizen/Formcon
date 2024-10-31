import React from "react";

interface LinkGridProps {
  onNavClick: (page: string) => void;
}

const LinkGrid: React.FC<LinkGridProps> = ({ onNavClick }) => {
  return (
    <section className="p-10">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg shadow-lg hover:shadow-xl transition relative">
          <img src={"./img4.jpg"} className="w-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-60 portrait:w-full flex items-center p-4 rounded-lg justify-center flex-col">
            <div className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer h-full w-full flex items-center justify-center flex-col">
              <p className="text-white text-center font-bree text-7xl">
                Products
              </p>
              <p className="text-white text-center font-bree text-7xl">
                & Prices
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-lg hover:shadow-xl transition relative">
          <img src={"./img3.jpg"} className="w-full object-cover rounded-lg" />

          <div className="absolute inset-0 bg-black bg-opacity-60 portrait:w-full flex items-center p-4 rounded-lg">
            <div className="flex items-center justify-center text-white flex-col p-4 "></div>
          </div>
        </div>

        <div className="rounded-lg shadow-lg hover:shadow-xl transition relative">
          <img src={"./img1.jpg"} className="w-full object-cover rounded-lg" />

          <div className="absolute inset-0 bg-black bg-opacity-60 portrait:w-full flex items-center p-4 rounded-lg">
            <div className="flex items-center justify-center text-white flex-col p-4 "></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkGrid;
