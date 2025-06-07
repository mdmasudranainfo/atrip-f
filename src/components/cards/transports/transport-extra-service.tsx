import {
  Sofa,
  BrainCircuit,
  Fuel,
  AirVent,
  Luggage,
  Drill,
  ParkingMeter,
} from "lucide-react";
import { TransportExtraInfo } from "@/types/transportTypes";
import { icons } from "~/public/icons/icons";

export default function TransportExtraService({
  info,
}: {
  info: TransportExtraInfo;
}) {
  return (
    <div className="services flex gap-3  text-dark text-sm  flex-wrap">
      {!!info?.passenger ? (
        <div className="service-single flex items-center gap-2">
          <Sofa className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">{info.passenger} Seats</span>
        </div>
      ) : (
        ""
      )}

      {!!info.baggage ? (
        <div className="service-single flex items-center gap-2">
          <Luggage className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">
            Luggage x {info.baggage}
          </span>
        </div>
      ) : (
        ""
      )}

      {!!info?.ac ? (
        <div className="service-single flex items-center gap-2">
          <AirVent className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">AC</span>
        </div>
      ) : (
        ""
      )}

      {!!info?.gear ? (
        <div className="service-single flex items-center gap-2">
          <BrainCircuit className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">{info.gear}</span>
        </div>
      ) : (
        ""
      )}
      {!!info.chauffeur ? (
        <div className="service-single flex items-center gap-2">
          <span className="text-primary-dark">{icons.carDriverIcon}</span>
          <span className="md:text-md text-[13px]">Chauffeur</span>
        </div>
      ) : (
        ""
      )}
      {!!info?.fuel && (
        <div className="service-single flex items-center gap-2">
          <Fuel className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px] ">Fuel</span>
        </div>
      )}

      {info?.parking ? (
        <div className="service-single flex items-center gap-2">
          <ParkingMeter className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px] ">Parking</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
