"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icons } from "../../../../public/icons/icons";
import axios from "axios";

export default function PartnerContactForm({ ticketCat }: any) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    position: "",
    company: "",
    website: "",
    location: "",
    tradeLicenseFile: null,
    vatFile: null,
    service_id: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleServiceChange = (value: string | undefined) => {
    setSelectedService(value);
    setFormData((prevState) => ({
      ...prevState,
      service_id: value || "",
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.position ||
      !formData.company ||
      !formData.website ||
      !formData.location ||
      !formData.service_id
    ) {
      setError("All fields are required except VAT Certificate.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateForm()) return;

    try {
      const url = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const response = await axios.post(`${url}/ticket/partner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 202) {
        setSuccess(response.data.message);
        setFormData({
          name: "",
          mobile: "",
          position: "",
          company: "",
          website: "",
          location: "",
          tradeLicenseFile: null,
          vatFile: null,
          service_id: "",
        });

        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Something went wrong.");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      [fileType]: file,
    }));
  };

  const FileInput = ({
    file,
    onChange,
    onRemove,
    id,
    label,
  }: {
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    id: string;
    label: string;
  }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[15px] font-semibold">
        {label}
      </Label>
      <div className="relative">
        <div className="flex items-center gap-1 border-2 border-dashed rounded-[10px] bg-white h-14 px-4 border-gray-200">
          📎 <span className="text-primary mr-2">Upload File</span>
          {file ? (
            <div className="flex items-center justify-between flex-1">
              <span className="text-[15px] truncate max-w-[250px] sm:max-w-[400px]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={onRemove}
                className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                {/* <X className="h-4 w-4" /> */}
              </button>
            </div>
          ) : (
            <span className="text-gray-400 text-[15px]">
              Upload File or drag and drop here
            </span>
          )}
          <input
            type="file"
            id={id}
            onChange={onChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-8 md:p-16">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">
              Together, we achieve greatness
            </h1>
            <p className="text-dark text-sm sm:text-[15px] leading-relaxed">
              Our commitment to ethical practices has been a driving force.
              Clients rely on us for clear communication, honest collaboration,
              and reliable results. This foundation of trust has been key to our
              journey, fostering relationships and fueling our enduring success.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4361EE] flex items-center justify-center">
                {/* <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
                {/* <MapPinned className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
                {icons.location}
              </div>
              <div className="text-sm sm:text-[15px] text-[#344054] font-medium">
                Dubai, United Arab Emirates
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4361EE] flex items-center justify-center">
                {/* <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
                {icons.callCenter}
              </div>
              <div className="text-sm sm:text-[15px]">
                <div className="text-[#344054] font-medium">
                  +971 56 286 4704
                </div>
                <div className="text-[#344054] font-medium">
                  admin@leadrive.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-[#EEF2FF] rounded-[20px] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Send Message
            </h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[15px] font-semibold">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-12 rounded-[10px] bg-white border-gray-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-[15px] font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="number"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="h-12 rounded-[10px] bg-white border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="position" className="text-[15px] font-semibold">
                Your Position <span className="text-red-500">*</span>
              </Label>
              <Input
                id="position"
                name="position"
                placeholder="Enter your position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="h-12 rounded-[10px] bg-white border-gray-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-[15px] font-semibold">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="h-12 rounded-[10px] bg-white border-gray-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="website" className="text-[15px] font-semibold">
                Company Website <span className="text-red-500">*</span>
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="Enter company website"
                value={formData.website}
                onChange={handleInputChange}
                required
                className="h-12 rounded-[10px] bg-white border-gray-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-[15px] font-semibold">
                Company Register Location{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter company register location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="h-12 rounded-[10px] bg-white border-gray-200"
              />
            </div>

            <FileInput
              file={formData.tradeLicenseFile}
              onChange={(e) => handleFileChange(e, "tradeLicenseFile")}
              onRemove={() =>
                setFormData({ ...formData, tradeLicenseFile: null })
              }
              id="trade-license"
              label="Company Trade License"
            />

            <FileInput
              file={formData.vatFile}
              onChange={(e) => handleFileChange(e, "vatFile")}
              onRemove={() => setFormData({ ...formData, vatFile: null })}
              id="vat"
              label="VAT Certificate (Optional)"
            />

            <div className="space-y-1.5">
              <Label htmlFor="service" className="text-[15px] font-semibold">
                Select a service <span className="text-red-500">*</span>
              </Label>
              <Select
                name="cat_id"
                value={String(formData.service_id)}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, service_id: value }))
                }
              >
                <SelectTrigger className="h-12 rounded-[10px] font-bold bg-white border-gray-200">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {ticketCat.map((cat: any) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="submit"
                className="w-full sm:w-auto text-white font-bold h-12 bg-[#4361EE] hover:bg-[#3651D4] rounded-[10px] text-[15px]"
              >
                Send Message
              </Button>
              {success && (
                <p className="text-green-500 text-sm font-medium">{success}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
