import { Booking, Product, Unit } from "@octocloud/types";
import { Option } from "@octocloud/types/src/types/Option";

type Nullable<T> = T | null;

type PartialBooking = Partial<
  Omit<Booking, "product" | "option"> & {
    product: PartialProduct;
    option: PartialOption;
  }
>;

type PartialProduct = Partial<
  Omit<Product, "options"> & {
    options: Array<PartialOption>;
  }
>;

type PartialOption = Partial<
  Omit<Option, "units"> & {
    units: Array<Partial<Unit>>;
  }
>;

type PartialUnit = Partial<Unit>;
