import { Booking } from "@octocloud/types";
import { PartialProduct } from "./PartialProduct";
import { PartialOption } from "./PartialOption";

export type PartialBooking = Partial<
  Omit<Booking, "product" | "option"> & {
    product: PartialProduct;
    option: PartialOption;
  }
>;
