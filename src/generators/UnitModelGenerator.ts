import { UnitModel } from "../models/unit/UnitModel";
import { UnitData } from "../data/UnitData";
import { UnitModelBuilder } from "../builders/UnitModelBuilder";
import { CapabilityId, PricingPer } from "@octocloud/types";

interface UnitGenerateData {
  unitData: UnitData;
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
}
