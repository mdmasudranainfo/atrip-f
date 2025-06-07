import { CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface IProps {
  packages: any[];
  selectedPackage: any[];
  totalPrice: number;
}

const MobileSummary = ({ packages, selectedPackage, totalPrice }: IProps) => {
  return (
    <div>
      <div className="mt-4">
        <div className="space-y-4">
          {selectedPackage.map((item, i) => (
            <div className="flex justify-between items-center" key={i}>
              <span className="text-sm font-medium ">
                {item.number} {item.name}
              </span>
              <span className="text-sm">
                {formatPrice(item.number * item.price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSummary;
