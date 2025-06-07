import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const ThankYouScreen = async (context: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await context.params;

  return (
    <div>
      <TransparentNavbar isBgWhite={true} />
      <div className="w-[90%] sm:w-full bg-white max-w-md mx-auto p-6 rounded-lg sm:my-52 my-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <div className="text-2xl font-bold">Order Confirmed!</div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-center text-gray-600">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <p className="my-4 text-sm text-wrap break-all">Order-ID: {params?.slug}</p>
          <Link href="/" passHref>
            <Button className="w-full font-semibold text-white">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
