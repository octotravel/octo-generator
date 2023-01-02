import { UnitModel } from "../models/unit/UnitModel";
import { UnitModelBuilder } from "../builders/UnitModelBuilder";
import { CapabilityId, PricingPer } from "@octocloud/types";
import { UnitDataProvider } from "../dataProviders/UnitDataProvider";
import { PartialUnit } from "../global";

interface UnitGenerateData {
  unitData: PartialUnit;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class UnitModelGenerator {
  private readonly unitModelBuilder = new UnitModelBuilder();

  public generateUnit = (unitGenerateData: UnitGenerateData): UnitModel => {
    return this.unitModelBuilder.build({
      unitData: unitGenerateData.unitData,
      pricingPer: unitGenerateData.pricingPer,
      capabilities: unitGenerateData.capabilities,
    });
  };

  public generateMultipleUnits = (unitGenerateData: UnitGenerateData[]): UnitModel[] => {
    return unitGenerateData.map((unitGenerateData) => {
      return this.unitModelBuilder.build({
        unitData: unitGenerateData.unitData,
      });
    });
  };

  public generateForAdultType = (): UnitModel => {
    return this.generateUnit({
      unitData: UnitDataProvider.adultUnit,
    });
  };

  public generateForChildType = (): UnitModel => {
    return this.generateUnit({
      unitData: UnitDataProvider.childUnit,
    });
  };
}
