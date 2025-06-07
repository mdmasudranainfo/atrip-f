import { cn, formatPrice } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    taxAmount: number
}
export default function TaxVatLabel({ taxAmount, className }: Props) {
    return (
        taxAmount > 0 ? 
        <div className={cn("text-xs text-gray-600 mb-3", className)}>+ {formatPrice(taxAmount)} taxes and charges</div> : 
        <div className={cn("text-xs text-gray-600 mb-3", className)}>*Prices includes VAT & Tax</div>              
    )
}