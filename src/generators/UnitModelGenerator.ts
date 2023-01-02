import { UnitModel } from "../models/unit/UnitModel";
import { UnitModelBuilder } from "../builders/UnitModelBuilder";
import { CapabilityId, PricingPer, Unit } from "@octocloud/types";
import { UnitDataProvider } from "../dataProviders/UnitDataProvider";

interface UnitGenerateData {
  unitData: Partial<Unit>;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class UnitModelGenerator {
  private readonly unitModelBuilder = new UnitModelBuilder();

  public generate = (unitGenerateData: UnitGenerateData): UnitModel => {
    return this.unitModelBuilder.build({
      unitData: unitGenerateData.unitData,
      pricingPer: unitGenerateData.pricingPer,
      capabilities: unitGenerateData.capabilities,
    });
  };

  public generateMultiple = (unitGenerateData: UnitGenerateData[]): UnitModel[] => {
    return unitGenerateData.map((unitGenerateData) => {
      return this.unitModelBuilder.build({
        unitData: unitGenerateData.unitData,
      });
    });
  };

  public generateForAdultType = (): UnitModel => {
    return this.generate({
      unitData: UnitDataProvider.adultUnit,
    });
  };

  public generateForChildType = (): UnitModel => {
    return this.generate({
      unitData: UnitDataProvider.childUnit,
    });
  };
}
