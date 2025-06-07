"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { bookingUpdateCart } from "@/lib/actions/booking-actions";
export interface VisaPackage {
    name: string
    description: string
    max: number
    price: number
    type: string
}
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import VisaPriceSummery from "./price-summery";
import { EnquiryDialog } from "@/components/booking/enquiry-dialog";

export default function VisaGuestInfo({bookingData}: {bookingData: any}) {

      const [selectedPackage, setSelectedPackage] = useState<any[]>([]);
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
  
  
      const packages = bookingData?.service?.extra_price || []
  
      const updateQuantity = (item: VisaPackage, _val: number) => {
          const _data = {
            name: item.name,
            price: item.price,
            type: "one_time",
            enable: 1,
            price_html: item.price.toString(),
            price_type: null,
            number: _val,
          }
          const _tmp = [...selectedPackage];
          const _index = selectedPackage.findIndex((_it) => _it.name == item.name)
          if(_index !== -1) {
            if(_val) {
              _tmp[_index] = _data;
            } else {
              _tmp.splice(_index, 1);
            }
          } else if(_val) {
            _tmp.push(_data);
          }
          setSelectedPackage(_tmp)
      }
  
  
  
      const totalPrice = packages?.length ? selectedPackage?.reduce((acc, item) => acc + (item.number * item.price), 0) : bookingData.booking.total
  
      const isValid = packages?.length ? !!selectedPackage.length : true

  
      async function onSubmit() {
        try {
            setIsLoading(true);
            const payload = {
                service_id: bookingData?.booking?.object_id,
                service_type: bookingData?.booking?.object_model,
                packages: selectedPackage,
            }

            const { data, error } = await bookingUpdateCart(payload, bookingData?.booking?.code);

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
    <div className="bg-white">
      <TransparentNavbar isBgWhite={true} />



<main className="container mx-auto px-4">
        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
            <div className="space-y-4">
            <div className="border rounded-xl p-4 h-content ">
              <h1 className="text-2xl font-bold">{bookingData?.service?.title}</h1>
              <p className="text-sm pt-3 ">
                Fill out the form and apply online{" "}
              </p>
            </div>

            {!!packages?.length && <Card className="p-4 space-y-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                    <User className="h-5 w-5 text-blue-600 " />
                    <h2 className="text-xl">Guests Information</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Table Header */}
                    <div className="grid grid-cols-[auto,auto,auto] gap-4 mb-4 text-sm text-gray-500">
                    <div>TITLE</div>
                    <div className="text-center px-8">QUANTITY</div>
                    <div className="text-right">PRICE</div>
                    </div>

                    {/* Package Items */}
                    <div className="space-y-6">
                    {packages?.map((pkg : VisaPackage, i: number) => {

                        const oldItem = selectedPackage?.find((_it) => _it.name == pkg.name)
                        const val = oldItem?.number || 0
                        
                    return (
                        <div
                        key={i}
                        className="grid grid-cols-[auto,auto,auto] gap-4 items-center py-10 border-t"
                        >
                        <div>
                            <h3 className="font-semibold">{pkg.name}</h3>
                            <p className="text-sm text-gray-500">{pkg.description}</p>
                        </div>

                        <div className="flex items-center justify-between  h-10 rounded-md bg-gray-100">
                            <Button
                            variant="ghost"
                            size="icon"
                            disabled={val <= 0}
                            className="h-full px-3 hover:bg-transparent"
                            type="button"
                            onClick={() => updateQuantity(pkg, val - 1)}
                            >
                            <span className="text-xl font-medium">−</span>
                            </Button>
                            <Input
                            type="number"
                            value={val}
                            onChange={(e) => {
                                const value = Number.parseInt(e.target.value);
                                if (!isNaN(value)) {
                                    updateQuantity(pkg, value)
                                }
                            }}
                            className="w-35 h-full border-0 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button
                            variant="ghost"
                            size="icon"
                            disabled={val >= pkg.max}
                            type="button"
                            className="h-full px-3 hover:bg-transparent"
                            onClick={() => updateQuantity(pkg, val + 1)}
                            >
                            <span className="text-xl font-medium">+</span>
                            </Button>
                        </div>

                            <div className="text-right font-medium">
                                {formatPrice(Number(pkg.price || 0))}
                            </div>
                        </div>
                    )})}
                    </div>
                </CardContent>
            </Card>
            }

          <div className="flex items-center gap-4">
            <EnquiryDialog
              className="py-7 px-5 rounded-lg mb-4 font-bold"
              serviceId={bookingData?.booking?.object_id}
              serviceType={bookingData?.booking?.object_model}
            />
              <Button className="bg-primary text-white py-7 px-5 rounded-lg mb-4 font-bold" disabled={!isValid || isLoading} onClick={onSubmit}>
              {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                  "Next Page"
              )}
              </Button>
          </div>

          </div>

          <VisaPriceSummery 
            isLoading={isLoading} 
            packages={packages} 
            selectedPackage={selectedPackage} 
            totalPrice={totalPrice} 
            isValid={isValid} 
            onSubmit={onSubmit}
            serviceId={bookingData?.booking?.object_id}
            serviceType={bookingData?.booking?.object_model}
          />

        </div>
      </main>



    </div>
  );
}
