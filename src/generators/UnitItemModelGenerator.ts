import { CapabilityId } from "@octocloud/types";
import { PartialUnitItem } from "../types/PartialUnitItem";
import UnitItemModelBuilder from "../builders/UnitItemModelBuilder";
import UnitItemModel from "../models/unitItem/UnitItemModel";

interface UnitItemGenerateData {
  unitItemData: PartialUnitItem;
  capabilities?: CapabilityId[];
}

export default class UnitItemModelGenerator {
  private readonly unitItemModelBuilder = new UnitItemModelBuilder();

  public generateUnitItem = (unitItemGenerateData: UnitItemGenerateData): UnitItemModel =>
    this.unitItemModelBuilder.build({
      unitItemData: unitItemGenerateData.unitItemData,
      capabilities: unitItemGenerateData.capabilities,
    });

  public generateMultipleUnitItems = (
    unitItemsData: PartialUnitItem[],
    capabilities?: CapabilityId[]
  ): UnitItemModel[] =>
    unitItemsData.map((unitItemData) =>
      this.unitItemModelBuilder.build({
        unitItemData,
        capabilities,
      })
    );
}
