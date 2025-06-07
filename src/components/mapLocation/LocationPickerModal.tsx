// components/LocationPickerModal.tsx
"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 23.8103,
  lng: 90.4125,
};

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selected, setSelected] = useState<Location | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const getAddressFromLatLng = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      return data?.results?.[0]?.formatted_address || "Unknown location";
    } catch (err) {
      console.log(err);
      return "Unknown location err";
    }
  };

  const handleClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setLoadingAddress(true);
      const address = await getAddressFromLatLng(lat, lng);
      setSelected({ lat, lng, address });
      setLoadingAddress(false);
    }
  }, []);

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  if (!isOpen || !isLoaded) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Select Location</h2>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={10}
          onClick={handleClick}
        >
          {selected && (
            <Marker position={{ lat: selected.lat, lng: selected.lng }} />
          )}
        </GoogleMap>

        {loadingAddress ? (
          <p className="mt-2 text-gray-500 italic">Fetching address...</p>
        ) : selected?.address ? (
          <p className="mt-2 text-green-700 font-medium">
            Selected Address: {selected.address}
          </p>
        ) : null}

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={!selected}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;
