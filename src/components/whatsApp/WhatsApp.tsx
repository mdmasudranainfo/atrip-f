import { siteConfig } from "@/config/site";
import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from react-icons

const WhatsApp = () => {
  return (
    <div>
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsAppId}`} // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed md:bottom-8 bottom-16 z-50 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default WhatsApp;
