import { Booking, BookingAvailability } from "@octocloud/types";
import { PartialProduct } from "./PartialProduct";
import { PartialOption } from "./PartialOption";

export type PartialBooking = Partial<
  Omit<Booking, "product" | "option" | "availaiblity"> & {
    product: PartialProduct;
    option: PartialOption;
  }
> & {
  availability: BookingAvailability;
};
