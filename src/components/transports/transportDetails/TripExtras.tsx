"use client";

import { ChevronDown, LandPlot, Minus, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExtraItemProps {
  title: string;
  price: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

export default function TripExtras() {
  const [additionalDriver, setAdditionalDriver] = useState(0);
  const [childSeat, setChildSeat] = useState(0);
  const [boosterSeat, setBoosterSeat] = useState(0);
  const [babySeat, setBabySeat] = useState(0);

  return (
    <>
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
                <span className="text-base font-bold">
                  Add extras, complete your trip
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="">
              <div className="">
                <CardContent className="grid grid-cols-2 gap-4">
                  <ExtraItem
                    title="Additional driver"
                    price="Aed 150 each per rental"
                    description="If you want other people to drive as well"
                    value={additionalDriver}
                    onChange={setAdditionalDriver}
                  />
                  <ExtraItem
                    title="Child seat"
                    price="Aed 150 each per rental"
                    description="For small children: 9-10 kg"
                    value={childSeat}
                    onChange={setChildSeat}
                  />
                  <ExtraItem
                    title="Booster seat"
                    price="Aed 150 each per rental"
                    description="If you want other people to drive as well"
                    value={boosterSeat}
                    onChange={setBoosterSeat}
                  />
                  <ExtraItem
                    title="Baby seat"
                    price="Aed 150 each per rental"
                    description="For small children: 9-10 kg"
                    value={babySeat}
                    onChange={setBabySeat}
                  />
                </CardContent>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
}
function ExtraItem({
  title,
  price,
  description,
  value,
  onChange,
}: ExtraItemProps) {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{price}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center space-x-3 border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onChange(Math.max(0, value - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{value}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onChange(value + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
