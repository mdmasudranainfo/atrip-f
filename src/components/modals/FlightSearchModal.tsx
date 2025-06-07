"use client";

import { CalendarIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface FlightSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FlightSearchModal({
  open,
  onOpenChange,
}: FlightSearchModalProps) {
  const [tripType, setTripType] = useState("one-way");
  const [departureDate, setDepartureDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Search Flight</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={() => onOpenChange(false)}
            ></Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <RadioGroup
            defaultValue="one-way"
            onValueChange={setTripType}
            className="flex gap-4 "
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way" className="font-bold">
                One-Way
              </Label>
            </div>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="font-bold">
                Round-Trip
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">Passenger Name</Label>
            <Input id="name" placeholder="Enter your name" className="h-11" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">Passenger Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="from" className="font-semibold">From</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select departure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dac">Dhaka (DAC)</SelectItem>
                <SelectItem value="dxb">Dubai (DXB)</SelectItem>
                <SelectItem value="lhr">London (LHR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to" className="font-semibold">To</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doh">Doha (DOH)</SelectItem>
                <SelectItem value="dxb">Dubai (DXB)</SelectItem>
                <SelectItem value="lhr">London (LHR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Departing</Label>
            <Popover>
              <PopoverTrigger asChild className="h-11">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? (
                    format(departureDate, "PP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 h-11" align="start">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Passengers/Class</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select passengers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Passenger</SelectItem>
                <SelectItem value="2">2 Passengers</SelectItem>
                <SelectItem value="3">3 Passengers</SelectItem>
                <SelectItem value="4">4 Passengers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-4xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
            size="lg"
          >
            <Search />
            Search Flight
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
