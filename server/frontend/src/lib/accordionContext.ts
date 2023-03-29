import React, { useState } from "react";
const AccordionContext = React.createContext({
  currentAccordion: { group1: "", group2: "" },
  setCurrentAccordion: (accordion: any) => {},
});
export const AccordionProvider = AccordionContext.Provider;
export default AccordionContext;
