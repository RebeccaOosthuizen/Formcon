import React from "react";
import Image from "next/image";
import FB from "../../../public/FB.png";
import Whatsapp from "../../../public/WhatsApp.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#233326] text-white py-6 mt-10 text-center flex justify-between p-6 items-center">
      <p className="text-2xl font-bold">FORMCON</p>
      <div className="flex flex-col text-end">
        <div className="flex justify-end items-center my-2">
          <p className="portrait:text-s ">Facebook: </p>
          <a href="https://www.facebook.com/OFTuinenHuis" className="flex items-center space-x-2">
            <Image
              src={FB}
              alt="Facebook"
              width={30}
              height={30}
              className="ml-2"
            />
          </a>
        </div>
        <div className="flex justify-end items-center">
          <p className="portrait:text-s">WhatsApp: </p>
          <a href="https://wa.me/27844196685" className="flex items-center space-x-2">
            <Image
              src={Whatsapp}
              alt="WhatsApp"
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
