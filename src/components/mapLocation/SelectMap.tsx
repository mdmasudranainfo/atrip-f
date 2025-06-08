"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import LocationPickerModal from "./LocationPickerModal";

interface Props {
  defaultValue?: string;
  type: string;
  locationId?: number;
  placeholder?: string;
  inputSize?: number;
  onChangeValue: (val: number | string) => void;
  initialLocations?: any[];
}

export default function SelectMap({
  defaultValue,
  type,
  locationId,
  placeholder = "Search location",
  onChangeValue,
  initialLocations = [],
}: Props) {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSuggestions = async (input: string) => {
    if (!input) return;
    try {
      const res = await axios.get(
        `/api/google-places?input=${encodeURIComponent(input)}`
      );
      setSuggestions(res.data.predictions);
    } catch (err) {
      console.error("Suggestion Error:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
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
      setInputValue(description);
      onChangeValue(description); // Pass address string or ID
      setSuggestions([]);
    } catch (err) {
      console.error("Place detail error:", err);
    }
  };

  const handleSelectFromMap = () => {
    setIsModalOpen(true);
  };

  const handleModalSelect = (loc: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setInputValue(loc.address);
    onChangeValue(loc.address); // or store lat/lng or ID as needed
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto">
          {suggestions.map((sug) => (
            <li
              key={sug.place_id}
              onClick={() =>
                handleSuggestionSelect(sug.place_id, sug.description)
              }
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {sug.description}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={handleSelectFromMap}
        className="mt-2 text-sm text-blue-600 underline"
      >
        📍 Select from Map
      </button>

      <LocationPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(loc) => {
          handleModalSelect(loc);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
