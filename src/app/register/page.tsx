"use client";

import type React from "react";

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showAdditionalFields: false,
    address: "",
    city: "",
    country: "",
    showMoreFields: false,
    occupation: "",
    company: "",
    interests: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend

    // You should add validation here, especially to check if passwords match
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <>
      <div className="container m-auto">
        <TransparentNavbar isBgWhite={true} />
      </div>
      <div className="bg-about-us  ">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-[#00000066] h-full w-full absolute top-[73px] bottom-0"></div>

          <Card className="w-full max-w-2xl mx-auto my-16 relative ">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Sign up to get started with our service.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="font-semibold">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="johndoe123"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-semibold">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-semibold">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="font-semibold">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showAdditionalFields"
                    checked={formData.showAdditionalFields}
                    onCheckedChange={handleCheckboxChange(
                      "showAdditionalFields"
                    )}
                    className="border-purple-500 data-[state=checked]:bg-[#457cf7] data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="showAdditionalFields"
                    className="font-semibold text-sm"
                  >
                    {" "}
                    Are You Driver ?
                  </Label>
                </div>
                {formData.showAdditionalFields && (
                  <>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="font-semibold">
                          Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="123 Main St"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="font-semibold">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showMoreFields"
                        checked={formData.showMoreFields}
                        onCheckedChange={handleCheckboxChange("showMoreFields")}
                        className="border-purple-500 data-[state=checked]:bg-[#457cf7] data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor="showMoreFields"
                        className="font-semibold text-sm"
                      >
                        Do You Have A Car ?
                      </Label>
                    </div>
                    {formData.showMoreFields && (
                      <>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="occupation"
                              className="font-semibold"
                            >
                              Occupation
                            </Label>
                            <Input
                              id="occupation"
                              name="occupation"
                              placeholder="Software Developer"
                              value={formData.occupation}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="font-semibold">
                              Company
                            </Label>
                            <Input
                              id="company"
                              name="company"
                              placeholder="Tech Inc."
                              value={formData.company}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="interests"
                              className="font-semibold"
                            >
                              Interests
                            </Label>
                            <Input
                              id="interests"
                              name="interests"
                              placeholder="Technology, Travel, Photography"
                              value={formData.interests}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="country" className="font-semibold">
                              Country
                            </Label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="United States"
                              value={formData.country}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex items-center justify-start space-x-2 mb-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={handleCheckboxChange("acceptTerms")}
                    className="border-purple-500 text-purple-500 focus:ring-purple-500  data-[state=checked]:bg-purple-500 data-[state=checked]:text-white  hover:bg-purple-100 data-[state=checked]:hover:bg-purple-600"
                  />
                  <Label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-700"
                  >
                    I have read and accept the{" "}
                    <Link
                      href="/terms-and-condition"
                      className="text-purple-600 hover:underline"
                    >
                      Terms and Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#457cf7] text-white font-semibold"
                >
                  Register
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
