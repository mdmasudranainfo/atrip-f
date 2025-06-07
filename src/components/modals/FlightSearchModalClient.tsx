"use client";
import React, { useState } from "react";
import FlightSearchModal from "./FlightSearchModal";

const FlightSearchModalClient = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <FlightSearchModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default FlightSearchModalClient;
