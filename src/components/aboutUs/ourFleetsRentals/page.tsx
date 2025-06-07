import RentalCarCard from "../../cards/cars/rentalCarCard/page";


export default function CarFleet() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Fleets For Rentals
      </h1>

      <div className="rental-fleets-slick-area container mx-auto px-0 sm:px-3">
        <RentalCarCard cardItemNumber={4} />
      </div>
    </div>
  );
}
