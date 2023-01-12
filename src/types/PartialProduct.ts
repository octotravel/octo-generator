import { Product } from "@octocloud/types";
import { PartialOption } from "./PartialOption";

export type PartialProduct = Partial<
  Omit<Product, "options"> & {
    options: Array<PartialOption>;
  }
>;
