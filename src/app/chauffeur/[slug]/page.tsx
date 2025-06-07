import ChaufferBooking from "@/components/chauffeur/chauffer-booking";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChauffeurBySlug } from "@/lib/actions/chauffeur-action";
import { notFound } from "next/navigation";

const ChauffeurDetails = async ({ params }: any) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const { data, booking_data } = await getChauffeurBySlug(slug);

  if (!data?.id) {
    notFound();
  }

  return (
    <div className="">
      <TransparentNavbar isBgWhite={true} />
      <div className="container mx-auto space-y-4 mt-5 mb-5">
        <Card className="p-4 space-y-4">
          <CardHeader className="">
            <CardTitle>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{data.title}</h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-0 pb-2">
            <p className="text-sm text-gray-500 font-normal">
              Hire a chauffer to drive your car
            </p>
          </CardContent>
        </Card>

        {!!booking_data && <ChaufferBooking chauffer={data} booking={booking_data} /> }
      </div>
    </div>
  );
};

export default ChauffeurDetails;
