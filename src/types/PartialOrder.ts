import { Order } from "@octocloud/types";
import { PartialBooking } from "./PartialBooking";

export type PartialOrder = Partial<
  Omit<Order, "bookings"> & {
    bookings: Array<PartialBooking>;
  }
>;
