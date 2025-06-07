"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { BudgetRange, BudgetSelectorProps } from "@/types/tourTypes"



const BudgetSelector: React.FC<BudgetSelectorProps> = ({ budgets,
    range,
    selectedRange,
    expandedBudget,
    setExpandedBudget,
    handleSliderChange,
    handleRangeClick }) => {
   
    return (
        <div className="w-full px-4 py-4 pb-6">
            {/* Header with Toggle Button */}
            <div
                className="flex items-center justify-between cursor-pointer text-primary-dark"
                onClick={() => setExpandedBudget(!expandedBudget)}
            >
                <span className="font-semibold text-base text-primary-dark leading-6">Budget</span>
                {expandedBudget ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {expandedBudget && (
                <div className="mt-5">
                    {/* Slider with Min/Max Display */}
                    <div className="mb-2 px-1">
                        <Slider
                            defaultValue={[0, 200]}
                            max={250}
                            step={10}
                            value={range}
                            onValueChange={handleSliderChange}
                            className="w-full h-2 bg-primary-dark/90 rounded-xl"
                        />
                    </div>
                    <div className="flex justify-between text-primary-dark font-medium text-sm mt-2">
                        <span>Min: ${range[0]}</span>
                        <span>Max: ${range[1]}</span>
                    </div>

                    {/* Budget Range Buttons */}
                    <div className="flex justify-between flex-wrap gap-2 mt-4">
                        {budgets.map((budget: BudgetRange) => (
                            <button
                                key={budget?.label}
                                onClick={() => handleRangeClick(budget)}
                                className="group"
                            >
                                <Card
                                    className={cn(
                                        "px-2 py-2.5 text-center transition-colors justify-center items-center text-primary-dark text-sm leading-5 rounded-lg shadow-none border-none",
                                        "bg-white-lightSlate hover:bg-gray-100 flex",
                                        selectedRange === budget && "bg-white-lightSlate ring-2 ring-info/90"
                                    )}
                                >
                                    <span className="text-sm font-medium text-primary-dark">{budget?.label}</span>
                                </Card>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default BudgetSelector;