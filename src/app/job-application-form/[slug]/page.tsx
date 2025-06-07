"use client"

import type React from "react"
import { useState,useEffect } from "react"
import {
  Upload,
  CheckCircle,
  ChevronDown,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react"
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import type { E164Number } from "libphonenumber-js"
import { useParams } from "next/navigation"
import { getCareerBySlug } from "@/lib/actions/career-actions";
import axios from 'axios';

interface CareerData {
  id: number;
  title: string;
  designation: string;
  country?: { name: string };
  salary?: string;
}
const ExecutiveDrive = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { slug } = useParams() as { slug: string };
  const [careerData, setCareerData] = useState<CareerData | null>(null);
  const [nationalId, setNationalId] = useState(null);
  const [educationCertificate, setEducationCertificate] = useState(null);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null)
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        const response = await getCareerBySlug(slug as string);
        setCareerData(response?.data || null);
      } catch (err) {
        setError("An error occurred while fetching featured cards.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCards();
  }, [slug]);


  // Define the state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCity: "",
    position: "",
    education: "",
    experience: "",
    englishProficiency: {
      native: false,
      fluent: false,
      confident: false,
      notConfident: false,
    },
  })

  // Handle input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle phone number change
  const handlePhoneChange = (value?: E164Number) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "", // Ensure it's always a string
    }))
  }

  // Handle checkbox changes for English proficiency
  const handleEnglishProficiencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      englishProficiency: {
        ...prevState.englishProficiency,
        [name]: checked,
      },
    }))
  }

  const handleFileChange = (e:any) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (name === "national_id") {
        setNationalId(files[0]);
        setNationalIdFile(files[0]);
      } else if (name === "education_certificate") {
        setEducationCertificate(files[0]);
        setDrivingLicenseFile(files[0]);
      }
    }
  };

  useEffect(() => {
      if (careerData?.id) {
          setFormData((prev) => ({
              ...prev,
              careerId: careerData.id,
          }));
      }
      if (nationalId) {
          setFormData((prev) => ({
              ...prev,
              nationalId: nationalId,
          }));
      }
      if (educationCertificate) {
          setFormData((prev) => ({
              ...prev,
              educationCertificate: educationCertificate,
          }));
      }
  }, [careerData,nationalId,educationCertificate]);

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setError("");
    setSuccess("");

    try {

      const url = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const response = await axios.post(`${url}/career/apply`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      if (response.status === 202) {
        setSuccess(response.data.message);
        setTimeout(() => {
            setSuccess("");
        }, 2000);
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Something went wrong.");
    }
  }

  // const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
  //   const selectedFile = event.target.files?.[0] || null
  //   setFile(selectedFile)
  // }

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  return (
    <>
      <div className="relative h-full  bg-about-us overflow-hidden">
        <div className="absolute inset-0 bg-[#00000066]"></div>
        <TransparentNavbar isBgWhite={false} />
          <div className="w-full container m-auto relative z-10">
            <div className="max-w-6xl m-auto py-20">
              <div className="flex flex-col items-center">
                <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                  Premium Career Opportunity
                </div>
                {loading === false &&(
                  <>
                    <h1 className="mb-6 text-5xl md:text-6xl font-bold text-white text-center leading-tight">
                      {careerData?.title || "Career Title"}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center text-center gap-3 text-lg font-medium">
                      <span className="text-white">{careerData?.designation || "Company Name"}</span>
                      <span className="text-white h-2 w-2 bg-white rounded-full"></span>
                      <span className="text-white">{careerData?.country?.name || "Location"}</span>
                      <span className="text-white h-2 w-2 bg-white rounded-full"></span>
                      <span className="text-gray-200">${careerData?.salary || "Salary Range"}</span>
                    </div>
                  </>
                )}
                <div className="mt-8 animate-bounce">
                  <ChevronDown className="h-8 w-8 text-white/70" />
                </div>
              </div>
            </div>
          </div>
      </div>
      
      <div className=" from-gray-50 to-white">
        <Card className="w-full max-w-7xl mx-auto !shadow-xl !border !border-gray-100 rounded-xl my-10 relative z-20">
          <CardContent className="p-8 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply Now</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete the application form below to be considered for the {careerData?.designation} position. All
                fields marked with an asterisk (*) are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Information Section */}
                <div className="space-y-6 md:col-span-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <User className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex gap-1 text-gray-700 font-semibold">
                        First Name <span className="text-red-600">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="border border-gray-300 !py-4 !pl-4 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex gap-1 text-gray-700 font-semibold">
                        Last Name <span className="text-red-600">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="border border-gray-300 !py-4 !pl-4 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex gap-1 text-gray-700 font-semibold">
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border border-gray-300 !py-4 !pl-12 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex gap-1 text-gray-700 font-semibold">
                        Phone <span className="text-red-600">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <PhoneInput
                          id="phone"
                          name="phone"
                          international
                          defaultCountry="AE"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="flex-1 border-[#ddd] border login-country rounded-md px-3 py-0 text-base"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Country/City */}
                  <div className="space-y-2">
                    <Label htmlFor="countryCity" className="flex gap-1 text-gray-700 font-semibold">
                      Country/City <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="countryCity"
                        name="countryCity"
                        required
                        value={formData.countryCity}
                        onChange={handleInputChange}
                        className="border border-gray-300 !py-4 !pl-12 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="e.g. Dubai, UAE"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="space-y-6 md:col-span-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Professional Information</h3>
                  </div>

                  {/* Applying Position */}
                  <div className="space-y-2">
                    <Label htmlFor="position" className="flex gap-1 text-gray-700 font-semibold">
                      Applying Position <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="position"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleInputChange}
                        className="border border-gray-300 !py-4 !pl-12 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="e.g. Executive Personal Driver"
                      />
                    </div>
                  </div>

                  {/* Educational Qualification */}
                  <div className="space-y-2">
                    <Label htmlFor="education" className="flex gap-1 text-gray-700 font-semibold">
                      Educational Qualification (Last one) <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <GraduationCap className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="education"
                        name="education"
                        required
                        value={formData.education}
                        onChange={handleInputChange}
                        className="border border-gray-300 !py-4 !pl-12 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="e.g. Bachelor's Degree in Business Administration"
                      />
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="flex gap-1 text-gray-700 font-semibold">
                      Work Experience (Last one) <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="experience"
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="border border-gray-300 !py-4 !pl-12 !pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="e.g. Personal Driver at XYZ Company (2018-2023)"
                      />
                    </div>
                  </div>
                </div>

                {/* File Uploads Section */}
                <div className="space-y-6 md:col-span-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Upload className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Documents</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Educational certificate upload */}
                    <div className="space-y-2">
                      <Label className="flex gap-1 text-gray-700 font-semibold">
                        Educational certificate/any other certificate
                      </Label>
                      <div
                        className={`relative w-full h-40 border-2 border-dashed rounded-lg ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"} transition-colors duration-200 ease-in-out hover:bg-gray-50`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          name="education_certificate"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center justify-center h-full space-y-3 p-4">
                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Upload className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-indigo-600">Click to upload</p>
                            <p className="text-xs text-gray-500 mt-1">or drag and drop here</p>
                          </div>
                          {drivingLicenseFile && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 bg-indigo-50 px-3 py-1 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="truncate max-w-[200px]">{drivingLicenseFile.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* National ID upload */}
                    <div className="space-y-2">
                      <Label className="flex gap-1 text-gray-700 font-semibold">National ID (Optional)</Label>
                      <div
                        className={`relative w-full h-40 border-2 border-dashed rounded-lg ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"} transition-colors duration-200 ease-in-out hover:bg-gray-50`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          name="national_id"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center justify-center h-full space-y-3 p-4">
                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Upload className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-indigo-600">Click to upload</p>
                            <p className="text-xs text-gray-500 mt-1">or drag and drop here</p>
                          </div>
                          {nationalIdFile && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 bg-indigo-50 px-3 py-1 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="truncate max-w-[200px]">{nationalIdFile.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* English Proficiency Section */}
                <div className="space-y-6 md:col-span-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Globe className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Language Skills</h3>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex gap-1 text-gray-700 font-semibold">
                      How well do you speak English? <span className="text-red-600">*</span>
                    </Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          name="native"
                          id="native"
                          checked={formData.englishProficiency.native}
                          onChange={handleEnglishProficiencyChange}
                          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <label htmlFor="native" className="text-base font-semibold text-gray-800">
                            Native Speaker
                          </label>
                          <p className="text-sm text-gray-500 mt-1">I am a native speaker of English</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          name="fluent"
                          id="fluent"
                          checked={formData.englishProficiency.fluent}
                          onChange={handleEnglishProficiencyChange}
                          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <label htmlFor="fluent" className="text-base font-semibold text-gray-800">
                            Business Fluent
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            I am fully fluent in business/technical communication
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          name="confident"
                          id="confident"
                          checked={formData.englishProficiency.confident}
                          onChange={handleEnglishProficiencyChange}
                          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <label htmlFor="confident" className="text-base font-semibold text-gray-800">
                            Conversational
                          </label>
                          <p className="text-sm text-gray-500 mt-1">I feel fairly confident communicating in English</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          name="notConfident"
                          id="notConfident"
                          checked={formData.englishProficiency.notConfident}
                          onChange={handleEnglishProficiencyChange}
                          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <label htmlFor="notConfident" className="text-base font-semibold text-gray-800">
                            Basic
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            I do not always feel comfortable communicating in English
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center justify-center">
                  {loading === false &&(
                    <Button
                      size={"lg"}
                      type="submit"
                      className="w-full md:w-auto text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 px-10 py-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out"
                    >
                      Submit Your Application
                    </Button>
                  )}
                  <p className="text-sm text-gray-500 mt-4">
                    By submitting this application, you agree to our terms and conditions. 
                  </p>
                  {success && <p className="text-green-500">{success}</p>}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="h-20"></div>
      </div>
    </>
  )
}

export default ExecutiveDrive

