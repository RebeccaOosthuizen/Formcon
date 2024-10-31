import React from "react";
import Image from "next/image";
import FB from "../../../public/FB.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#233326] text-white py-6 mt-10 text-center flex justify-between p-6 items-center">
      <p className="text-2xl font-bold">FORMCON</p>
      <div className="flex flex-col text-end">
        <p className="portrait:text-xs">+27 84 419 6685</p>
        <p className="portrait:text-xs">formcon@gmail.com</p>
        <br></br>
        <div className="flex justify-end items-center">
          <p className="portrait:text-xs font-bold">follow us: </p>
          <a href="https://www.facebook.com/OFTuinenHuis" className="flex items-center space-x-2">
            <Image
              src={FB}
              alt="Logo"
              width={30}
              height={30}
              className="ml-2"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
