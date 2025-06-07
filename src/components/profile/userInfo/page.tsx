"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  MapPinIcon,
  Mail,
  Phone,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfileInfo, profileUpdate } from "@/lib/actions/auth";
import { UserData } from "@/types/user";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  first_name: z.string().min(1, {
    message: "First name is required.",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  phone: z.string().optional(),
  birthday: z.date().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip_code: z.string().optional(),
});

export default function RegistrationForm() {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileInfo();
        if (result.success) {
          setProfile(result.data?.data);
        } else {
          setError(result.error || "Failed to fetch profile");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile?.email || "",
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
      bio: profile?.bio || "",
      birthday: profile?.birthday || "",
      avatar: profile?.avatar_url || "",
      address: profile?.address1 || "",
      address2: profile?.address2 || "",
      city: profile?.city || "",
      state: profile?.state || "",
      country: profile?.country || "United States",
      zip_code: `${profile?.zip_code}` || "",
    },
  });

  const {
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        // birthday: profile.birthday || "",
        avatar: profile?.avatar_url || "",
        address: profile?.address || "",
        address2: profile?.address2 || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "United States",
        zip_code: `${profile?.zip_code}` || "",
      });
    }
  }, [profile, reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUpdateLoading(true);
    try {
      const response = await profileUpdate(values);
      if (response?.success) {
        toast.success("Successfully Saved");
        setUpdateLoading(false);
      } else {
        toast.error(response?.error || "Profile update failed");
        setUpdateLoading(false);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" bg-white p-4 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="border rounded-lg p-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className=" font-semibold">Avatar</FormLabel>
                  <div className="flex flex-col gap-4">
                    <div className="w-full  rounded-lg overflow-hidden">
                      {/* <label
                        htmlFor="image-upload"
                        className="block border-2 border-dashed border-gray-300 rounded-lg py-3 hover:border-blue-400 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-600">
                          Click to upload image
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  const result = event.target.result as string;
                                  field.onChange(result);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label> */}

                      <div className="bg-white p-4 mt-3 border rounded-lg">
                        <Image
                          src={
                            field.value ||
                            "https://github.com/shadcn.png" ||
                            "/placeholder.svg"
                          }
                          alt="Avatar preview"
                          className="w-full h-auto max-h-48 object-contain mx-auto"
                          width={400}
                          height={200}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder.svg?height=200&width=400";
                          }}
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Personal Information Section */}
          <div className="border rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">First name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Customer"
                          className="pl-10"
                          {...field}
                        />
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
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">Last name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input placeholder="01" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className=" font-semibold">E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="customer1@mail.com"
                        className="pl-10"
                        disabled
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className=" font-semibold">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="+8801822932001"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className=" font-semibold">Birthday</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-10 py-5 text-left font-normal !justify-start",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy")
                            ) : (
                              <span>MM/DD/YYYY</span>
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mb-4 flex flex-col">
                  <FormLabel className=" font-semibold">
                    About Yourself
                  </FormLabel>
                  <FormControl>
                    {/* <Textarea placeholder="Tell us about yourself" className="min-h-[120px]" {...field} /> */}
                    <textarea
                      placeholder="Tell us about yourself"
                      className="border min-h-[200px] p-3 rounded-lg outline-none"
                      {...field}
                      name=""
                      id=""
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location Information Section */}
          <div className="w-full space-y-3">
            <div className="border rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Location Information
              </h2>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">
                      Address Line 1
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Address"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">
                      Address Line 2
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Address2"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">City</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="New York"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">State</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="State"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-5">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className=" font-semibold">Zip Code</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-[12px] h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Zip Code"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateLoading}
                className="px-8 font-semibold text-white !py-5"
              >
                {updateLoading ? <Loader2 /> : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
