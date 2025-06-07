"use client";

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerNewUser } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, Text } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import * as z from "zod";
import { icons } from "../../../public/icons/icons";
import Image from "next/image";
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  first_name: z.string().min(1, "Please enter your first name"),
  last_name: z.string().min(1, "Please enter your last name"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  term: z.boolean().refine((val) => val === true, {
    message: "You must agree to the term and conditions",
  }),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      password: "",
      term: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formData = {
        ...values,
        term: values.term ? 1 : 0,
      };
      const response = await registerNewUser(formData);
      if (response?.success) {
        toast.success("Registration successful");
        router.push("/sign-in");
        setIsLoading(false);
      } else {
        toast.error(response?.error || "Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="relative">
        <TransparentNavbar isBgWhite={true} />
      </div>

      <div className="bg-about-us  ">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-[#00000066] h-full w-full absolute top-[74px] bottom-0"></div>
          <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg relative">
            <div className="mb-8">
              <div className="mb-4">
                <div className="mb-4">
                  <Image
                    src={"/images/logo/light_logo-preview.png"}
                    alt="Site Logo"
                    width={150}
                    height={50}
                    priority
                    className="object-contain site-logo"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Up</h1>
              <p className="text-gray-600">
                Create an account to easily use atrip.ae services.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="first name"
                            className="pl-10 py-5 text-base"
                            {...field}
                          />
                          <Text className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="last name"
                            className="pl-10 py-5 text-base"
                            {...field}
                          />
                          <Text className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="example@gmail.com"
                            className="pl-10 py-5 text-base"
                            {...field}
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex">
                          <PhoneInput
                            defaultCountry="AE"
                            international
                            className="flex-1 border-[#ddd] border login-country rounded-md px-3 py-0 text-base"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-10 pr-10 py-5 text-base"
                            {...field}
                          />
                          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <div className="text-sm">
                          By creating an account you agree to our{" "}
                          <Link
                            href="/term"
                            className="text-primary hover:text-primary/90"
                          >
                            Terms & Conditions
                          </Link>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-5 text-base bg-primary hover:bg-primary/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an Account?{" "}
              <Link
                href="/sign-in"
                className="text-primary hover:text-primary/90 !hover:text-white"
              >
                Sign In
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
