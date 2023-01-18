import { Unit, Option } from "@octocloud/types";

export type PartialOption = Partial<
  Omit<Option, "units"> & {
    units: Array<Partial<Unit>>;
  }
>;
