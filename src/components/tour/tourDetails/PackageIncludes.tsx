import ItineraryPage from "@/components/tour/tourDetails/itinerary";
import IncludeAndExcludes from "@/components/tour/tourDetails/PackageExcludes";
import TourOverview from "@/components/tour/tourDetails/Overview";
import TourFAQs from "@/components/tour/tourDetails/TourFaq";
import TourHotel from "@/components/tour/tourDetails/TourHotel";

export default function PackageDetails({tabsData}:any) {
  
  return (
    <div>
      <div className='pt-5'>
          <TourOverview
              overview={tabsData?.content}
          />
      </div>
      <div className='pt-5'>
          <IncludeAndExcludes
            includes={tabsData?.include} excludes={tabsData?.exclude}
          />
      </div>
      <div className='pt-5'>
        <ItineraryPage 
          itineraryData={tabsData?.itinerary}
        />
      </div>
      <div className='pt-5'>
        <TourHotel 
          hotels={tabsData.hotel}
          hotelBed={tabsData?.hotel_bed}
          hotelServiceIncluding={tabsData?.hotel_service_including}
        />
      </div>
      <div className='pt-5'>
        <TourFAQs 
          faqs={tabsData?.faqs}
        />
      </div>
    </div>
  );
}
