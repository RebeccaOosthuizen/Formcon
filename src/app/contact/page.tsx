// ContactPage.tsx
"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import FB from "../../../public/FBColour.png";
import Whatsapp from "../../../public/WhatsAppColour.png";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          contact_info: form.contact,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      setStatus("Message sent successfully!");
      setForm({ name: "", contact: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="md:mx-8 md:px-12 px-8 mt-20">
      <h1 className="mt-10 text-4xl font-bold">CONTACT US</h1>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-32 md:mt-12 mt-6 w-full">
        <div className="w-full md:w-2/5  flex flex-col ">
          <h2 className="text-xl mb-4">Online Inquiry</h2>
          <form
            onSubmit={sendMessage}
            className="space-y-4 bg-[#c9d6cc] rounded-md p-4"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Email or Phone Number"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded mb-10"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-green-600">{status}</p>}
        </div>

        <div className="w-full md:w-3/5 flex flex-col ">
          <h2 className="text-xl mb-4">Where to Find Us</h2>
          <div className="flex items-center">
            <a
              href="https://wa.me/27844196685"
              className="flex items-center space-x-2"
            >
              <Image
                src={Whatsapp}
                alt="WhatsApp"
                width={40}
                height={40}
                className="rounded-md"
              />
            </a>
            <a
              href="https://www.facebook.com/OFTuinenHuis"
              className="flex items-center space-x-2"
            >
              <Image
                src={FB}
                alt="Facebook"
                width={40}
                height={40}
                className="ml-3 rounded-md"
              />
            </a>
          </div>

          <p className="mb-2 mt-4">
            <strong>Langhoven Market - Stalls 40 and 41</strong>
          </p>
          <p className="mb-1">
          22 Elias Motsoaledi Street
          </p>
          <p className="mb-1">
          Langenhoven Park
          </p>
          <p className="mb-1">
          Bloemfontein, 9301
          </p>
          <p className="mb-1 font-semibold">
          Saturdays, 07h00 - 12h30
          </p>
        </div>
      </div>
    </div>
  );
}
