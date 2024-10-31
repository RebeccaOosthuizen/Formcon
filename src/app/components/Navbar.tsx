"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          FORMCON
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-[#384b3c]">
            Home
          </Link>
          <Link href="/products" className="hover:text-[#384b3c]">
            Products
          </Link>
          <Link href="/journey" className="hover:text-[#384b3c]">
            Journey
          </Link>
          <Link href="/contact" className="hover:text-[#384b3c]">
            Contact
          </Link>
        </div>

        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <span className="sr-only">Open menu</span>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black mb-4"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden transform transition-transform duration-300 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="block border-t border-t-[#adadad] px-4 py-2 mt-6 w-full"></div>

          <Link href="/" className="block px-4 py-2 w-full text-end hover:bg-[#eeeeee] transition duration-200 ease-in-out" onClick={toggleMenu}>Home</Link>
          <Link href="/products" className="block px-4 py-2 w-full text-end hover:bg-[#eeeeee] transition duration-200 ease-in-out" onClick={toggleMenu}>Products</Link>
          <Link href="/journey" className="block px-4 py-2 w-full text-end hover:bg-[#eeeeee] transition duration-200 ease-in-out" onClick={toggleMenu}>Journey</Link>
          <Link href="/contact" className="block px-4 py-2 w-full text-end hover:bg-[#eeeeee] transition duration-200 ease-in-out" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
