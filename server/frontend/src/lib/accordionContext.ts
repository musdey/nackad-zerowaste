import React, { useState } from "react";
const AccordionContext = React.createContext({
  currentAccordion: { deliveryDayGroup: "", vehicleGroup: "" },
  setCurrentAccordion: (accordion: any) => {},
});
export const AccordionProvider = AccordionContext.Provider;
export default AccordionContext;
