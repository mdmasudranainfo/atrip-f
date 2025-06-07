"use client";
import { FilterAttribute, FilterAttributeTerm } from "@/types/booking";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiFilterProps {
  attribute: FilterAttribute;
  onChange?: (key: string, values: string[]) => void;
  isExpanded?: boolean;
  params: any;
}

const extractParams = (paramValue?: string[] | string): string[] => {
  if (!paramValue) return []; // Return an empty array if undefined/null

  if (Array.isArray(paramValue)) {
    return paramValue; // Already an array, return as is
  }

  return [paramValue]; // Convert a single string to an array
};

export default function MultiFilter({
  params,
  attribute,
  onChange,
  isExpanded = true,
}: MultiFilterProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const key = `attrs_${attribute.id}[]`;

  const [selected, setSelected] = useState<string[]>(() =>
    extractParams(params[key])
  );

  return (
    <div>
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-base text-primary-dark leading-6">
            {attribute.name}
          </span>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {expanded && (
        <div className="px-4 pb-4">
          {attribute.terms.map((term: FilterAttributeTerm, i: number) => (
            <label
              key={i}
              className="flex items-center space-x-3 py-2 cursor-pointer text-primary-dark font-semibold"
            >
              <Checkbox
                checked={selected.includes(term.slug)}
                onCheckedChange={(val: boolean) => {
                  let newValues: string[] = selected;

                  if (val) {
                    newValues = [...newValues, term.slug];
                  } else {
                    newValues = newValues.filter((it) => it !== term.slug);
                  }

                  setSelected(newValues);
                  onChange?.(key, newValues);
                }}
              />
              <span className="text-sm font-medium leading-[22px]">
                {term.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
