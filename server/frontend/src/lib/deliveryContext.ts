import React, { useState } from "react";
const DeliveriesContext = React.createContext({
  deliveries: [],
  setDeliveries: (deliveries: any) => {},
  isSearch: false,
  setSearch: (isSearch: boolean) => {},
  searchText: "",
  setSearchText: (searchText: string) => {},
});
export const DeliveriesProvider = DeliveriesContext.Provider;
export default DeliveriesContext;
