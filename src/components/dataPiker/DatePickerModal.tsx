// components/DatePickerModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"; // or your Calendar2
import { format } from "date-fns";
import { Calendar2 } from "../ui/calendar2";

interface DatePickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Date | undefined;
  onSelect: (date: Date) => void;
}

const DatePickerModal = ({
  open,
  onOpenChange,
  value,
  onSelect,
}: DatePickerModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Select a Date</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <Calendar2
            mode="single"
            selected={value}
            onSelect={(val) => {
              if (val) {
                onSelect(val);
                onOpenChange(false);
              }
            }}
            initialFocus
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerModal;
