"use client";

import { useState } from "react";
import { MapPin, Phone, X } from "lucide-react";
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

export default function ScheduleServiceFrom({ ticketCat }: any) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    cat_id: "",
    content: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle service selection change
  const handleServiceChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      cat_id: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const response = await axios.post(`${url}/ticket/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 202) {
        setSuccess(response.data.message);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          cat_id: "",
          content: "",
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

  return (
    <div className="container mx-auto p-4 sm:p-8 md:p-16">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold leading-[25px] mb-4 md:mb-6">
              Customers can reach out to the Atrip. Ae Customer Support team at
              any time Need assistance?
            </h1>
            <p className="text-dark text-sm sm:text-[15px] leading-relaxed">
              Atrip. Ae operates a dedicated team of Customer Support
              professionals who are ready to assist customers. Our customers can
              get help with their queries or obtain travel information or
              support through both phone calls and messaging platforms.
            </p>
            <p className="text-dark text-sm sm:text-[15px] leading-relaxed">
              Our 24/7 support system ensures you will have a relaxed travel
              journey without stress. Contact us anytime because our support
              services operate on a continuous basis.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4361EE] flex items-center justify-center">
                {/* <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
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
                <div className="text-[#344054] font-medium">book@atrip.ae</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-[#EEF2FF] rounded-[20px] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Schedule a Service
            </h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1.5">
                <Input
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 rounded-[10px] bg-white border-gray-200"
                />
              </div>
              <div className="space-y-1.5">
                <Input
                  id="mobile"
                  name="mobile"
                  type="number"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="h-12 rounded-[10px] bg-white border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Input
                name="email"
                type="email"
                placeholder="Email address *"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 rounded-[10px] bg-white border-gray-200"
              />
            </div>

            <div className="space-y-1.5">
              <Select
                name="cat_id"
                value={String(formData.cat_id)}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, cat_id: value }))
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

            <div className="grid w-full gap-1.5">
              <textarea
                name="content"
                className="resize-none h-40 p-2 border border-gray-300 rounded-md outline-none focus:ring-0 focus:ring-blue-500"
                placeholder="Describe about your project"
                value={formData.content}
                onChange={handleInputChange}
              />
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
