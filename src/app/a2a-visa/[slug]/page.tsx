import HowToApplyA2aVisa from "@/components/a2AVisa/a2aVisaDetails/A2aApply";
import A2aVisaDocuments from "@/components/a2AVisa/a2aVisaDetails/A2aDocuments";
import A2aVisaFaq from "@/components/a2AVisa/a2aVisaDetails/A2aFaq";
import A2aVisaOverview from "@/components/a2AVisa/a2aVisaDetails/A2aOverview";
import A2aVisaTermsAndConditions from "@/components/a2AVisa/a2aVisaDetails/A2aT&C";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import { getVisaBySlug } from "@/lib/actions/a2avisa-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookCheck,
  CircleAlert,
  Dock,
  MessageCircleQuestion,
  Star,
} from "lucide-react";
import Link from "next/link";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { notFound } from "next/navigation";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import VisaBooking from "@/components/visa/visa-booking";
import BookingAttraction from "@/components/layouts/booking-attraction";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";
import { CheckCircle } from "lucide-react";

const A2aVisaDetails = async ({ params, searchParams }: any) => {
  const tabItems = [
    { value: "overview", label: "Overview" },
    { value: "documents", label: "Documents" },
    { value: "how_to_apply", label: "How to apply" },
    { value: "terms_conditions", label: "Visa Terms & Conditions" },
    { value: "faq", label: "Faq" },
  ];

  const query = await searchParams;
  const _searchParams = new URLSearchParams(query);

  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const { data, gallery, reviews } = await getVisaBySlug(slug);

  if (!data?.id) {
    notFound();
  }

  const sellPrice = getSellPrice(data.price, data.sale_price);
  const comparePrice = getComparePrice(data.price, data.sale_price);

  const elId = "a2a-visa-tab";

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      {/*  */}
      <main className="sm:container w-[96%] m-auto py-8">
        <div className="bg-white p-6 rounded-xl  ">
          <Link
            href={`/a2a-visa?${_searchParams.toString()}`}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
          >
            Revisit the search list
          </Link>

          {/*  */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {data?.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{data?.working_day} Days Visit Visa</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-5">
              <div>
                <DiscountPriceBadge
                  sellPrice={sellPrice}
                  comparePrice={comparePrice}
                  hideLabel
                  labelClass="text-md"
                />
                <div className="text-sm text-gray-600">Price starts from</div>
              </div>

              <Link href={`#${elId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-bold">
                  <CheckCircle size={12} color="#fff" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(reviews?.score_total || 0)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 py-0.5 rounded text-base">
              {reviews?.score_total || 0}
            </span>
            <span className="text-gray-600 text-base">
              {reviews?.total_review || 0} Reviews
            </span>
          </div>
          {/* header & rating end */}
          <ImageGallery
            data={data}
            images={gallery}
            title={"A to A Visa"}
            star_rate={reviews?.score_total || 0}
            review_score={reviews?.score_total || 0}
            alt="A to A Visa Images"
            reviews={data?.reviews}
            review_count={reviews?.total_review || 0}
          />
        </div>

        {/* Tabs menu */}
        <div
          className="flex gap-8 w-full my-6 lg:flex-row flex-col-reverse"
          id={elId}
        >
          {/* left section start */}
          <div className="lg:w-[70%] w-full rounded-lg">
            <div className="w-full ">
              <Tabs
                defaultValue="documents"
                className="w-full font-bold bg-[#f6f7fa]"
              >
                <ScrollArea>
                  <TabsList className="h-auto py-2 pb-1  w-full flex justify-between px-4 gap-0 border-b bg-white">
                    {tabItems.map((tab) => (
                      <TabsTrigger
                        key={tab?.value}
                        value={tab?.value}
                        className="group px-4 py-3 text-base font-bold text-muted-foreground data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none flex flex-col items-center gap-3 justify-between"
                      >
                        {/* Icon Wrapper - Gets red background when active */}
                        <span className="py-2 px-2.5 rounded-lg group-data-[state=active]:bg-[#3264FF] group-data-[state=active]:shadow-md">
                          {handleIcons(tab?.value)}
                        </span>

                        {/* Tab Label */}
                        <span className="text-dark">{tab?.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>

                <ScrollArea>
                  <TabsContent value="overview" className="border-none">
                    <A2aVisaOverview
                      overview={data?.overview}
                      title={data?.title}
                    />
                  </TabsContent>

                  <TabsContent value="documents" className="border-none">
                    <A2aVisaDocuments tabData={data} title={data?.title} />
                  </TabsContent>

                  <TabsContent value="how_to_apply" className="border-none">
                    <HowToApplyA2aVisa howToApply={data?.how_to_apply} />
                  </TabsContent>

                  <TabsContent value="terms_conditions" className="border-none">
                    <A2aVisaTermsAndConditions
                      termsConditions={data?.terms_conditions}
                    />
                  </TabsContent>

                  <TabsContent value="faq" className="border-none">
                    <A2aVisaFaq faqs={data?.faqs} />
                  </TabsContent>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
              </Tabs>
            </div>
          </div>
          {/* left section ends */}

          {/* Right section start */}
          <div className="flex-1 lg:max-w-md w-full mx-auto">
            <Card className=" px-5 py-6 bg-white rounded-lg shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg leading-6 font-semibold text-dark">
                  {data?.title}
                </CardTitle>
                <p className="text-lg leading-6 font-medium text-dark">
                  {formatPrice(sellPrice)} Per Person
                </p>
              </CardHeader>
              <CardContent className="p-0 sm:p-0 mt-4">
                <VisaBooking visa={data} />

                <BookingAttraction />
              </CardContent>
            </Card>
          </div>
          {/* Right section ends */}
        </div>
      </main>
    </div>
  );
};

export default A2aVisaDetails;

const handleIcons = (value: string) => {
  switch (value) {
    case "overview":
      return <HiOutlineSpeakerphone className="h-8 w-8 " />;
    case "documents":
      return <BookCheck className="h-7 w-7" />;
    case "terms_conditions":
      return <CircleAlert className="h-8 w-8" />;
    case "how_to_apply":
      return <Dock className="h-8 w-8 " />;
    case "faq":
      return <MessageCircleQuestion className="h-8 w-8 " />;
    default:
      return null;
  }
};
