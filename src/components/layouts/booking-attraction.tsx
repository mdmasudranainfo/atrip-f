"use client";

import { Check } from "lucide-react";

const benefits = [
  "Best price guarantee",
  "24/7 Customer Support",
  "Easy booking System ",
  "Secure payment",
  "Instant Confirmation",
];

export default function BookingAttraction() {
  return (
    <div className="border rounded-lg shadow-md p-4 mt-4 max-w-sm bg-white">
      <h6 className="text-lg mb-3">
        Travelers should choose <span className="font-bold">atrip.ae</span>{" "}
        because of these following top 5 benefits.
      </h6>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <Check className="text-blue-500 w-5 h-5" />
            <span className="text-gray-800 ">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
