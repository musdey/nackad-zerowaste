export interface Deposit {
  firstName: string;
  lastName: string;
  status: "OPEN" | "PARTIALLYRETURNED" | "RETURNED";
  totalPrice: string;
  paidDeposit: string;
  _id: string;
  orderDate: string;
}

export type UserOrderProp = {
  children?: any;
  history?: any;
  location?: {
    state?: {
      state?: {
        firstName: string;
        lastName: string;
        address: { street: string; postal: string; city: string };
        deliveryStatus: string;
        orderId: string;
        timeslot: string;
        deliveryDay: string;
      };
    };
  };
};