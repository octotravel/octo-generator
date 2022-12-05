import { UnitModel } from "../models/UnitModel";
import { UnitData } from "../data/UnitData";
import { UnitModelBuilder } from "../builders/UnitModelBuilder";
import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../dataProviders/PricingDataProvider";

export class UnitModelGenerator {
  private readonly unitModelBuilder = new UnitModelBuilder();

  public generate = (unitData: UnitData): UnitModel => {
    return this.unitModelBuilder.build({
      unitData: unitData,
    });
  };

  public generateForAdultType = (): UnitModel => {
    const data: UnitData = {
      id: "adult",
      type: UnitType.ADULT,
      pricing: [PricingDataProvider.adultPricing],
    };

    return this.generate(data);
  };

  public generateForChildType = (): UnitModel => {
    const data: UnitData = {
      id: "child",
      type: UnitType.CHILD,
      pricing: [PricingDataProvider.childPricing],
    };

    return this.generate(data);
  };
}
