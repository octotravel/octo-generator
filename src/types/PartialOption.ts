import { Option } from "@octocloud/types/src/types/Option";
import { Unit } from "@octocloud/types";

export type PartialOption = Partial<
  Omit<Option, "units"> & {
    units: Array<Partial<Unit>>;
  }
>;
