"use client"
import CarFAQs from "@/components/cars/carDetails/CarFaq";
import Essentials from "@/components/cars/carDetails/Essentials";
import GreatChoice from "@/components/cars/carDetails/GreatChoice";
import Included from "@/components/cars/carDetails/Include";
import CarOverview from "@/components/cars/carDetails/Overview";
import TripExtras from "@/components/cars/carDetails/TripExtras";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookCheck,
  Hotel,
  ShieldQuestion,
  SlidersHorizontal,
  SquarePlus,
  LandPlot,
  CalendarIcon,
  ChevronDown,
  Loader2
} from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Location } from "@/lib/actions/location-action";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CountryDropdown } from "@/components/ui/country-dropdown";
import SearchLocation from "@/components/filter/search-location";
import { useSearchParams } from "next/navigation";
import { formatPrice, getSellPrice, parseUrlStrDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { format } from "date-fns";
import { bookingAddToCart } from "@/lib/actions/booking-actions";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/handle-error";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(8, { message: "Please enter a valid phone number." }),
  driverAge: z.string().min(1, { message: "Select driver age range" }),
  licenseCountry: z.string().min(1, { message: "Select license country" }),
  flightNumber: z.string().optional(),
  pickupLocation: z.number({message: "Select pickup location" }),
  returnLocation: z.number({message: "Select return location" }),
  start_date: z.date(),
  end_date: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;




export default function CarTabSection({selectedLocations, car}: {selectedLocations: Location[], car: any}) {

  const router = useRouter();

  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false)

  const sellPrice = getSellPrice(car.price, car.sale_price)
  const [selectedPackage, setSelectedPackage] = useState<any[]>([]);

  const extraPrice = selectedPackage?.reduce((acc, item) => acc + (item.price * item.number), 0) || 0;

  const _sDate = searchParams.get("start")
  const _eDate = searchParams.get("end")
  const location_id = searchParams.get("location_id")

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      driverAge: "30-50",
      licenseCountry: "AE",
      flightNumber: "",

      pickupLocation: location_id? Number(location_id) : undefined,
      returnLocation: location_id? Number(location_id) : undefined,

      start_date: (_sDate ? parseUrlStrDate(_sDate) : undefined) || undefined,
      end_date: (_eDate ? parseUrlStrDate(_sDate) : undefined) || undefined,
    },
  });

    const [activeTab, setActiveTab] = useState<string>("overview");

    const tabItems = [
        { value: "overview", label: "Vehicle Overview" },
        { value: "choice", label: "Great choice!" },
        { value: "include", label: "What’s included" },
        { value: "essentials", label: "Pre-Pick-Up Essentials" },
        { value: "driverInfo", label: "Driver Information" },
        { value: "t&c", label: "Car T&C" },
      ]
      
      const handleIcons = (value: string) => {
        switch (value) {
          case "overview":
            return <HiOutlineSpeakerphone className="h-8 w-8 " />;
          case "choice":
            return <BookCheck className="h-7 w-7" />;
          case "essentials":
            return <SlidersHorizontal className="h-8 w-8" />;
          case "include":
            return <SquarePlus className="h-8 w-8 " />;
          case "t&c":
            return <ShieldQuestion className="h-8 w-8 " />;
          case "driverInfo":
            return <Hotel className="h-8 w-8 " />;
          default:
            return null;
        }
      }


      async function onSubmit(formData: FormSchema) {
        try {
            setIsLoading(true);
            const payload = {
                service_id: car.id,
                service_type: "car",
                step: 0,
                guests: 1,
                number: 1,
                ...formData,
                start_date: formData.start_date ? format(formData.start_date, "yyyy-MM-dd") : null,
                end_date: formData.end_date ? format(formData.end_date, "yyyy-MM-dd") : null,
                extra_price: selectedPackage || [],
            }

            const { data, error } = await bookingAddToCart(payload);
            if (data?.booking_code) {
                router.push(`/booking/${data?.booking_code}`);
            } else {
                toast.error(`Error: ${error}`);
            }
            
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
      }
    

    return (
      <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit, () => setActiveTab("driverInfo"))} 
      
      className="flex gap-8 w-full my-6 lg:flex-row flex-col-reverse">
        <div className="lg:w-[70%] w-full rounded-lg">
        <div className="w-full rounded-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="h-auto py-2 pb-1 bg-white w-full justify-between">
                {tabItems.map((tab) => (
                  <TabsTrigger
                    key={tab?.value}
                    value={tab?.value}
                    className=" px-5 py-3 text-sm font-bold text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none flex flex-col gap-3 justify-between"
                  >
                    <span className="py-2 px-2.5 rounded-lg group-data-[state=active]:bg-[#3264FF] group-data-[state=active]:shadow-md">
                      {handleIcons(tab?.value)}
                    </span>

                    <span className="text-dark">{tab?.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
            <ScrollArea className="w-full">
              <TabsContent value="overview" className="border-none">
                <CarOverview carTabData={car} />
              </TabsContent>
              <TabsContent value="choice" className="border-none">
                <GreatChoice greatChoice={car?.great_choice}/>
              </TabsContent>
              <TabsContent value="include" className="border-none">
                <Included include={car?.include}/>
              </TabsContent>
              <TabsContent value="essentials" className="border-none">
                <Essentials essential={car?.pre_pick_up}/>
              </TabsContent>
              <TabsContent
                value="driverInfo"
                className="border-none space-y-2"
              >

<Card className="w-full border-none">
        <Accordion
          type="single"
          collapsible
          defaultValue="policies"
          className="border-none"
        >
          <AccordionItem value="policies" className="border-none">
            <AccordionTrigger className="px-6 pt-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <LandPlot color="blue" className="h-5 w-5" />
                <span className="text-base font-bold">Driver Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                      <FormLabel className="text-base">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Phone</FormLabel>
                      <FormControl>
                        <PhoneInput value={field.value} onChange={field.onChange} international defaultCountry="AE" className="flex-1 border-[#ddd] border login-country rounded-md px-3 py-0 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="driverAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Age</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="18-29">18 - 29</SelectItem>
                          <SelectItem value="30-50">30 - 50</SelectItem>
                          <SelectItem value="51-70">51 - 70</SelectItem>
                          <SelectItem value="70+">70+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="licenseCountry"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Drivers license issuing country/region</FormLabel>
                      <CountryDropdown
                          placeholder="Select your nationality"
                          defaultValue={field.value}
                          onChange={(country) => {
                          field.onChange(country.alpha3);
                          }}
                      />
                      <FormMessage />
                      </FormItem>
                  )}
              />

                <FormField
                  control={form.control}
                  name="flightNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Flight number (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter flight number" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <TripExtras packages={car?.extra_price || []} onChange={setSelectedPackage} initialValue={selectedPackage} />

              </TabsContent>
              <TabsContent value="t&c" className="border-none">
                <CarFAQs faqs={car?.faqs} />
              </TabsContent>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 lg:max-w-md w-full mx-auto">




      <Card className="w-full  xl:max-w-md mx-auto shadow-none ">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{car.title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{formatPrice(sellPrice)}</p>
          </div>
        </div>


        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Pick-Up Location</FormLabel>
              <FormControl>
                <SearchLocation
                  error={undefined}
                  locationId={field.value}
                  placeholder="Select location"
                  initialLocations={selectedLocations || []}
                  onChangeValue={field.onChange}
                  inputSize={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="returnLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Return Location</FormLabel>
              <FormControl>
                <SearchLocation
                  error={undefined}
                  locationId={field.value}
                  placeholder="Select location"
                  initialLocations={selectedLocations || []}
                  onChangeValue={field.onChange}
                  inputSize={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Pick-up Date</FormLabel>
              <FormControl>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                        ) : (
                        <span>Select date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(val) => {
                            if(val) {
                              field.onChange(val)
                            }
                        }}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Return Time</FormLabel>
              <FormControl>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                        ) : (
                        <span>Select date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(val) => {
                            if(val) {
                              field.onChange(val)
                            }
                        }}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />






        {/* Location and Date Selection */}
        <div className="space-y-4">
          <div className="pb-4 border-b border-b-[#dadfe6] flex justify-between items-center">
            <span className="font-medium text-[#1a1a1a] text-sm">Protection & Extra</span>
            <span className="font-medium text-[#1a1a1a] text-sm">{formatPrice(extraPrice)}</span>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-2">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full justify-between items-center">
              <span className="font-medium">Deposit</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <p className="text-sm text-gray-600">Deposit details here</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex w-full justify-between items-center">
              <span className="font-medium">Fuel Policy</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <p className="text-sm text-gray-600">Fuel policy details here</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex w-full justify-between items-center">
              <span className="font-medium">
                Modification cancelation refund policy
              </span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <p className="text-sm text-gray-600">
                Cancellation policy details here
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Book Now Button */}
        <Button disabled={isLoading} type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Reserve"
          )}
        </Button>
      </CardContent>
    </Card>
      </div>
      </form>
      </Form>
    )

}