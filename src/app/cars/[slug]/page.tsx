import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import { Button } from "@/components/ui/button";
import { getCarsBySlug } from "@/lib/actions/car-actions";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";
import CarExtraService from "@/components/cards/cars/car-extra-service";
import RatingBadgeHorizontal from "@/components/rating-badge-horizontal";
import { notFound } from "next/navigation";
import { getSelectedLocation } from "@/lib/actions/location-action";
import CarTabSection from "@/components/cars/car-tab-section";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

const CarDetails = async (context: {
  params: Promise<{ slug: string }>;
  searchParams: any;
}) => {
  const params = await context.params;
  const slug = params.slug;
  const query = await context.searchParams;

  if (!slug) {
    notFound();
  }

  const { data: car, reviews } = await getCarsBySlug(slug);
  if (!car?.id) {
    notFound();
  }

  const locationIds = [];
  if (query.location_id) {
    locationIds.push(Number(query.location_id));
  }

  const selectedLocations = locationIds.length
    ? await getSelectedLocation(locationIds)
    : [];

  const sellPrice = getSellPrice(car.price, car.sale_price);
  const comparePrice = getComparePrice(car.price, car.sale_price);

  const elId = "car-checkout";

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      <main className="w-[96%] sm:container m-auto min-h-screen  py-8  ">
        <div className="bg-white p-6 rounded-xl  ">
          {/* Back Link */}
          <Link
            href="/cars"
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
          >
            Revisit the search list
          </Link>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {car?.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{car.address}</span>
              </div>
              {!!car.extra_info && <CarExtraService info={car.extra_info} />}
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:items-end items-start">
              <div className="text-sm text-gray-600 mb-1">
                Price starts from
              </div>

              <div className="text-xl font-semibold mb-2">
                <DiscountPriceBadge
                  sellPrice={sellPrice}
                  comparePrice={comparePrice}
                  hideLabel
                  labelClass="text-md"
                />
              </div>

              <Link href={`#${elId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-bold">
                  Select Car
                </Button>
              </Link>
            </div>
          </div>

          {/* Rating Section */}
          <RatingBadgeHorizontal
            total={Number(car.review_data?.total_review || 0)}
            score={Number(car.review_data?.score_total || 0)}
          />

          <ImageGallery
            data={car}
            images={car.gallery}
            title={"Activities"}
            star_rate={5}
            review_score={car?.review_score}
            alt="Activities Images"
            reviews={reviews || []}
            review_count={0}
          />
        </div>

        {/* Tabs menu */}
        <div id={elId}>
          <CarTabSection selectedLocations={selectedLocations} car={car} />
        </div>
      </main>
    </div>
  );
};
export default CarDetails;
