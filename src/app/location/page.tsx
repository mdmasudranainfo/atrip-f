"use client";

import LocationPickerModal from "@/components/mapLocation/LocationPickerModal";
import { useState } from "react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export default function SelectLocationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Location</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Select Location
      </button>

      {location && (
        <div className="mt-4 space-y-1">
          <p>
            <strong>Address:</strong> {location.address}
          </p>
          <p>
            <strong>Lat:</strong> {location.lat}, <strong>Lng:</strong>{" "}
            {location.lng}
          </p>
        </div>
      )}

      <LocationPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(loc) => setLocation(loc)}
      />
    </div>
  );
}
