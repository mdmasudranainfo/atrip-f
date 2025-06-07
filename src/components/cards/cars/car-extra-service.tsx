import {
  Sofa,
  BrainCircuit,
  Fuel,
  AirVent,
  Luggage,
} from "lucide-react";
import { ICarExtraInfo } from "@/types/carTypes";

export default function CarExtraService({ info }: { info: ICarExtraInfo }) {
  return (
    <div className="services flex gap-5 mt-3 text-dark text-sm flex-wrap">
      {!!info?.passenger && (
        <div className="service-single flex items-center gap-2">
          <Sofa className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">{info.passenger} Seats</span>
        </div>
      )}

      {!!info.baggage && (
        <div className="service-single flex items-center gap-2">
          <Luggage className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">Luggage x {info.baggage}</span>
        </div>
      )}


      {!!info?.ac && (
        <div className="service-single flex items-center gap-2">
          <AirVent className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">AC</span>
        </div>
      )}


      {!!info?.fuel && (
        <div className="service-single flex items-center gap-2">
          <Fuel className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">{info.fuel}</span>
        </div>
      )}

      {!!info?.gear && (
        <div className="service-single flex items-center gap-2">
          <BrainCircuit className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
          <span className="md:text-md text-[13px]">{info.gear}</span>
        </div>
      )}
    </div>
  )
}