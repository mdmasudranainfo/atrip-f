"use client"

import { 
    Info, 
    Loader2,
    Car,
    Clock,
    Coffee,
    MapPin,
    Shield,
    Star,
    UserRound,
    Users,
 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { toast } from "sonner";
import { bookingAddToCart } from "@/lib/actions/booking-actions";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { getErrorMessage } from "@/lib/handle-error";
import { ChauffeurBookingData, ChauffeurPackageType, ChauffeurRow } from "@/types/chauffer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"


const getFeatureIcon = (feature: string): React.ReactElement => {
  const featureIcons: { [key: string]: React.ReactElement } = {
    "professional chauffeur": <UserRound className="h-4 w-4 text-gray-400" />,
    punctuality: <Clock className="h-4 w-4 text-gray-400" />,
    "flexibility and adaptability": (
      <Shield className="h-4 w-4 text-gray-400" />
    ),
    "knowledge of routes": <MapPin className="h-4 w-4 text-gray-400" />,
    "experience driving skill": <Star className="h-4 w-4 text-gray-400" />,
    "customer centric attitude": <Users className="h-4 w-4 text-gray-400" />,
    "standard sedan": <Car className="h-4 w-4 text-gray-400" />,
    "experienced driver": <Shield className="h-4 w-4 text-gray-400" />,
    "passengers 4": <Users className="h-4 w-4 text-gray-400" />,
    "we take care": <Coffee className="h-4 w-4 text-gray-400" />,
    "4 bagged": <Star className="h-4 w-4 text-gray-400" />,
    "tollgate covers": <Info className="h-4 w-4 text-gray-400" />,
  };

  return (
    featureIcons[feature.toLowerCase()] || (
      <Star className="h-4 w-4 text-gray-400" />
    )
  );
};

const formatFeatureName = (feature: string) => {
  return feature.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};


const FormSchema = z.object({
    start_date: z.date(),
})

export default function ChaufferBooking({chauffer, booking}: {chauffer: ChauffeurRow, booking: ChauffeurBookingData}) {
    const [selected, setSelected] = useState<ChauffeurPackageType>();

    const [open, setOpen] = useState<boolean>(false);

return (
    <>

        {booking.package_types.map((chauffeurPackage: ChauffeurPackageType, index: number) => (
          <div key={index}>
            <Card className="space-y-4">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-4 rounded-lg space-y-1 w-full sm:w-1/3 font-bold">
                    <div className="bg-gray-50 p-7">
                      <div className="">{chauffeurPackage.name}</div>
                    </div>
                    <Info className="h-5 w-5" />
                  </div>

                  {/* Middle Section - Features */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-bold w-full sm:w-1/3 items-center">
                    {booking?.features.map((feature: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        {getFeatureIcon(feature)}
                        <span>{formatFeatureName(feature)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Section - Price and Button */}
                  <div className="min-w-[140px] space-y-2 w-full sm:w-1/3 flex flex-col justify-end items-end">
                    <div className="font-semibold whitespace-nowrap ml-2 mb-3">
                      {formatPrice(Number(chauffeurPackage.price || 0))}
                    </div>
                    <Button type="button" onClick={() => {
                        setSelected(chauffeurPackage)
                        setOpen(true)
                        }} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-white font-bold">
                        Reserve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}


        {!!selected && <DatePickerDialogue selected={selected} chauffer={chauffer} open={open} onOpenChange={setOpen} /> }
      </>
)


    
}




export function DatePickerDialogue({open, onOpenChange, chauffer, selected}: {chauffer: ChauffeurRow, selected: ChauffeurPackageType, open: boolean, onOpenChange: (open: boolean) => void}) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    async function onSubmit(value: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);


            const ticket_types = [
                {
                    code: selected.name,
                    name: selected.name,
                    name_ja: selected.name,
                    name_egy: selected.name,
                    price: selected.price,
                    number: 1,
                }
            ]

            const payload = {
                service_id: chauffer.id,
                service_type: "chauffeur",
                ticket_types: ticket_types,
                step: 1,
                guests: 1,
                ...value,
                start_date: format(value.start_date, "yyyy-MM-dd")
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{selected.name}</DialogTitle>
            <DialogDescription>
              Select date
            </DialogDescription>
          </DialogHeader>


        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">


        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pick-up Date</FormLabel>
              <div className="flex justify-center">
              <FormControl>
                    <Calendar
                    className="justify-center"
                        mode="single"
                        selected={field.value}
                        onSelect={(val) => {
                            if(val) {
                                form.setValue('start_date', val, {shouldValidate: true})
                            }
                        }}
                        initialFocus
                    />
              </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                "Reserve"
            )}
        </Button>

        </form>
        </Form>
        </DialogContent>
      </Dialog>
    )
  }