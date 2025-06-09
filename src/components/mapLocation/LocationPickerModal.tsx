"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

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
// 23.9759468289481, 54.33126540257541
const defaultCenter = {
  lat: 23.9759468289481,
  lng: 54.33126540257541,
};

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [selected, setSelected] = useState<Location | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions from Google Places Autocomplete API
  const fetchSuggestions = async (input: string) => {
    const res = await axios.get(
      `/api/google-places?input=${encodeURIComponent(input)}`
    );
    setSuggestions(res.data.predictions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleSuggestionSelect = async (
    placeId: string,
    description: string
  ) => {
    try {
      const res = await axios.get(
        `/api/google-place-details?place_id=${placeId}`
      );
      const location = res.data.result.geometry.location;
      const lat = location.lat;
      const lng = location.lng;

      setSelected({ lat, lng, address: description });
      setSuggestions([]);
      setInputValue(description);
      mapRef?.panTo({ lat, lng });
    } catch (err) {
      console.error("Failed to fetch place details", err);
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
      // console.log(err);
      return "Unknown location";
    }
  };

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

        <div className="relative">
          <input
            type="text"
            placeholder="Search location"
            className="w-full p-2 border border-gray-300 rounded"
            value={inputValue}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-y-auto">
              {suggestions.map((sug) => (
                <li
                  key={sug.place_id}
                  onClick={() =>
                    handleSuggestionSelect(sug.place_id, sug.description)
                  }
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {sug.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              selected
                ? { lat: selected.lat, lng: selected.lng }
                : defaultCenter
            }
            zoom={selected ? 14 : 8}
            onClick={handleClick}
            onLoad={(map) => setMapRef(map)}
          >
            {selected && (
              <Marker position={{ lat: selected.lat, lng: selected.lng }} />
            )}
          </GoogleMap>
        </div>

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
