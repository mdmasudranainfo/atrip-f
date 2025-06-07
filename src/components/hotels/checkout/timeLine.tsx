"use client";

import { Check } from "lucide-react";

export default function Timeline({ currentStep = 1 }: { currentStep: number }) {
  const steps = ["Your selection", "Your Details", "Finish booking"];

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-between relative">
        {steps.map((title, index) => (
          <TimelineStep
            key={index}
            title={title}
            isCompleted={index < currentStep}
            isActive={index === currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

const TimelineStep = ({
  title,
  isCompleted,
  isActive,
  isLast,
}: {
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  isLast: boolean;
}) => {
  return (
    <div className="flex-1 relative">
      {/* Step content */}
      <div className="flex flex-col items-center relative z-10">
        {/* Circle */}
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              isCompleted
                ? "bg-blue-600 border-blue-600"
                : isActive
                ? "border-blue-600"
                : "border-gray-300"
            }`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
          {isActive && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
          {isLast && !isActive && (
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          )}
        </div>
        {/* Title */}
        <span
          className={`mt-2 text-[11px] sm:text-sm ${
            isActive
              ? "text-blue-600 font-medium"
              : isCompleted
              ? "text-gray-900 font-medium"
              : "text-gray-400"
          }`}
        >
          {title}
        </span>
      </div>

      {/* Horizontal line */}
      {!isLast && (
        <div className="absolute top-3 left-[50%] w-full h-[2px] bg-gray-200">
          {isCompleted && <div className="absolute inset-0 bg-blue-600" />}
        </div>
      )}
    </div>
  );
};
