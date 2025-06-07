"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { icons } from "../../../public/icons/icons";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignInForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // or behavior: "auto"
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        device_name: "App", // Using static device name
        redirect: false,
        callbackUrl: callbackUrl ?? "/",
      });

      if (result?.error) {
        toast.error(
          result.error == "CredentialsSignin"
            ? "Invalid email or password"
            : "Something went wrong!"
        );
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl ?? "/");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  function onError(errors: any) {
    console.error("Validation errors:", errors); // Log the errors
  }
  return (
    <>
      <div className="relative">
        <TransparentNavbar isBgWhite={true} />
      </div>
      <div className="bg-about-us  ">
        {/* <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div> */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-[#00000066] h-full w-full absolute top-[74px] bottom-0"></div>
          <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg relative">
            <div className="mb-8">
              {/* <div className="mb-14 ">{icons.logo}</div> */}
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
              <h1 className="text-2xl font-bold text-dark mb-1">Sign In</h1>
              <p className="text-gray-s600">
                Create an account to easily use atrip.ae services.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Write your email here"
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 text-base mb-3 bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <Button
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-5 text-base bg-white text-black hover:bg-primary/90 border-primary border hover:text-white"
                onClick={() =>
                  signIn("google", { callbackUrl: callbackUrl ?? "/" })
                }
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </g>
                </svg>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue with Google"
                )}
              </Button>

              {/* <Button
                  className="w-full py-5 text-base bg-primary hover:bg-primary/90 text-white"
                  onClick={() => window.location.href = "http://127.0.0.1:8000/social-login/google"}
                >
                  Google Sign In
              </Button> */}

              <div className="mt-2">
                Already have an Account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary hover:text-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
