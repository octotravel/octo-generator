import { CapabilityId, PricingPer } from "@octocloud/types";
import UnitModel from "../models/unit/UnitModel";
import UnitModelBuilder from "../builders/UnitModelBuilder";
import UnitDataProvider from "../dataProviders/UnitDataProvider";
import { PartialUnit } from "../types/PartialUnit";

interface UnitGenerateData {
  unitData: PartialUnit;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export default class UnitModelGenerator {
  private readonly unitModelBuilder = new UnitModelBuilder();

  public generateUnit = (unitGenerateData: UnitGenerateData): UnitModel =>
    this.unitModelBuilder.build({
      unitData: unitGenerateData.unitData,
      pricingPer: unitGenerateData.pricingPer,
      capabilities: unitGenerateData.capabilities,
    });

  public generateMultipleUnits = (
    unitsData: PartialUnit[],
    pricingPer?: PricingPer,
    capabilities?: CapabilityId[]
  ): UnitModel[] =>
    unitsData.map((unitData) =>
      this.unitModelBuilder.build({
        unitData,
        pricingPer,
        capabilities,
      })
    );

  public generateForAdultType = (): UnitModel =>
    this.generateUnit({
      unitData: UnitDataProvider.adultUnit,
    });

  public generateForChildType = (): UnitModel =>
    this.generateUnit({
      unitData: UnitDataProvider.childUnit,
    });
}
