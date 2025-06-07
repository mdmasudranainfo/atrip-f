"use client"

import { FlightData, FlightSeat } from "@/types/flight-book-data"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { bookingAddToCart } from "@/lib/actions/booking-actions"
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { getErrorMessage } from '@/lib/handle-error';
import { CheckCircle } from "lucide-react";

interface FlightDialogueProps {
    flight: FlightData
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function FlightBookingDialogue({ flight, open, onOpenChange }: FlightDialogueProps) {

    const [seatTypes, setSeatTypes] = useState<FlightSeat[]>(() => flight.flight_seat || [])

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleIncrement = (seatId: number) => {
        setSeatTypes((prev) => {
            return prev.map((seat) => {
                if (seat.id == seatId) {
                    return { ...seat, number: seat.number + 1 }
                }
                return seat;
            })
        })
    }

    const handleDecrement = (seatId: number) => {
        setSeatTypes((prev) => {
            return prev.map((seat) => {
                if (seat.id == seatId) {
                    return { ...seat, number: seat.number - 1 }
                }
                return seat;
            })
        })
    }



    const calculateTotal = () => {
        return seatTypes
            .reduce((total, seat) => {
                return total + Number.parseFloat(seat.price) * (seat.number || 0)
            }, 0)
            .toFixed(2)
    }

    const totalSeat = () => {
        return seatTypes
            .reduce((acc, seat) => acc + (seat.number || 0), 0);
    }

    // Parse departure and arrival times
    const departureDate = new Date(flight.departure_time)
    const arrivalDate = new Date(flight.arrival_time)

    // Format times and dates
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "2-digit" })
    }

    const onBookNow = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await bookingAddToCart({
                service_id: flight.id,
                service_type: "flight",
                flight_seat: seatTypes,
            });
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
            <DialogContent className="sm:max-w-[800px] flight-modal">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Flight Details</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-4 py-4">
                    <div className="w-12 h-12 relative overflow-hidden rounded-md">
                        <Image
                            src={flight.airline.image_url || "/placeholder.svg"}
                            alt={flight.airline.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-medium">
                            {flight.title} | {flight.code}
                        </h3>
                        <p className="text-sm text-muted-foreground">{flight.airline.name}</p>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-2">
                    <div className="text-left">
                        <div className="text-xl font-bold">{formatTime(departureDate)}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(departureDate)}</div>
                        <div className="text-sm mt-1">{flight.airport_from.name}</div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-sm font-medium">{flight.duration} hrs</div>
                        <div className="relative w-20 flex items-center justify-center">
                            <Separator className="absolute w-full" />
                            <Plane className="w-4 h-4 rotate-90 bg-background z-10" />
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-xl font-bold">{formatTime(arrivalDate)}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(arrivalDate)}</div>
                        <div className="text-sm mt-1">{flight.airport_to.name}</div>
                    </div>
                </div>



                <Card>
                    <CardContent className="p-0">
                        {seatTypes.map((seat, index) => (
                            <div key={seat.id} className="grid grid-cols-6 items-center p-4 border-b last:border-b-0">

                                <div>
                                    <div className="font-medium">Seat type</div>
                                    <div className="text-sm">{seat.seat_type.name}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Baggage</div>
                                    <div className="text-sm capitalize">{seat.person}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Check-in</div>
                                    <div className="text-sm">{seat.baggage_check_in}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Cabin</div>
                                    <div className="text-sm">{seat.baggage_cabin}</div>
                                </div>

                                <div className="font-medium">
                                    <div className="font-medium">Price</div>
                                    <div className="text-sm">{formatPrice(Number(seat.price || 0))}</div>
                                </div>

                                <div>
                                    <div className="font-medium">Number</div>
                                    <div className="flex items-center">
                                        <div className="flex flex-row gap-3">
                                            <button onClick={() => handleDecrement(seat.id)} disabled={!seat.number} type="button" className="text-primary">
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                            <span className="text-center">{seat.number || 0}</span>
                                            <button onClick={() => handleIncrement(seat.id)} disabled={seat.max_passengers == seat.number} type="button" className="text-primary">
                                                <ChevronUp className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </CardContent>


                    {!!(totalSeat() > 0) && <CardFooter className="flex justify-between p-4 pt-6">
                        <div className="font-medium text-lg">Pay Amount</div>
                        <div className="font-bold text-xl">{formatPrice(calculateTotal())}</div>
                    </CardFooter>
                    }

                </Card>

                {!!(totalSeat() > 0) && <Button type="button" className="w-full mt-2 text-white" variant="default" size="lg" onClick={onBookNow}>
                    <CheckCircle size={12} color="#fff" />
                    Book Now
                </Button>}

            </DialogContent>
        </Dialog>
    )
}