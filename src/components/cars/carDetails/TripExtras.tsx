"use client";

import { LandPlot, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICarExtraPrice } from "@/types/carTypes";
import { formatPrice } from "@/lib/utils";

export interface TariffSelectionResult {
  name: string;
  price: number;
  type: "one_time";
  enable: 1;
  price_html: string;
  price_type: null;
  number: number;
}

interface ExtraItemProps {
  title: string;
  price: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

export default function TripExtras({packages, onChange, initialValue}: {packages: ICarExtraPrice[], onChange?: (val: TariffSelectionResult[]) => void, initialValue?: any[]}) {

  const [selectedPackage, setSelectedPackage] = useState<any[]>(initialValue || []);
  if(!packages?.length) return;


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
            <AccordionContent>
              <div>
                <CardContent className="grid grid-cols-2 gap-4">
                  {packages?.map((item, i) => {
                    const oldItem = selectedPackage?.find((_it) => _it.name == item.name)
                    return (
                    <ExtraItem
                      key={i}
                      title={item.name}
                      price={`${formatPrice(item.price)} each per rental`}
                      description={item?.description || ''}
                      value={oldItem?.number || 0}
                      onChange={(_val) => {
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
                        onChange?.(_tmp)
                      }}
                    />
                    )
                  })}
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
            type="button"
            className="h-8 w-8"
            onClick={() => onChange(Math.max(0, value - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{value}</span>
          <Button
            variant="ghost"
            size="icon"
            type="button"
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
