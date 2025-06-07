"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

interface MemberInputProps {
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
}

export function MemberInput({ label, value, onChange, min = 0, max = 99 }: MemberInputProps) {
    const decrease = () => onChange(Math.max(min, value - 1))
    const increase = () => onChange(Math.min(max, value + 1))

    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm text-dark">{label}</span>
            <div className="flex items-center border rounded-md">
                <p className="h-10 w-10 rounded-none border-r flex items-center justify-center cursor-pointer"
                    onClick={decrease}
                >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease {label}</span>
                </p>
                <div className="w-12 text-center">
                    <span className="text-xs font-medium">{value}</span>
                </div>
                <p className="h-10 w-10 rounded-none border-l flex items-center justify-center cursor-pointer"
                    onClick={increase}
                >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase {label}</span>
                </p>
            </div>
        </div>
    )
}


