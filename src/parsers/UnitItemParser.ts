import { CapabilityId, UnitItem } from "@octocloud/types";
import { UnitItemModel } from "../models/unitItem/UnitItemModel";
import { UnitParser } from "./UnitParser";
import { UnitItemPricingModel } from "../models/unitItem/UnitItemPricingModel";

export class UnitItemParser {
  private readonly unitParser: UnitParser = new UnitParser();
  public parsePOJOToModel = (unitItem: UnitItem): UnitItemModel => {
    return new UnitItemModel({
      uuid: unitItem.uuid,
      resellerReference: unitItem.resellerReference,
      supplierReference: unitItem.supplierReference,
      unitModel: this.unitParser.parsePOJOToModel(unitItem.unit),
      status: unitItem.status,
      utcRedeemedAt: unitItem.utcRedeemedAt,
      contact: unitItem.contact,
      ticket: unitItem.ticket,
      unitItemPricingModel: this.parseUnitItemPricingPOJOToModel(unitItem),
    });
  };

  private parseUnitItemPricingPOJOToModel = (unitItem: UnitItem): UnitItemPricingModel | undefined => {
    if (unitItem.pricing === undefined) {
      return undefined;
    }

    return new UnitItemPricingModel({
      pricing: unitItem.pricing,
    });
  };

  public parseModelToPOJO = (unitItemModel: UnitItemModel): UnitItem => {
    const unitItem = this.parseMainModelToPojo(unitItemModel);

    this.parsePricingModelToPOJO(unitItem, unitItemModel);

    return unitItem;
  };

  public parseModelToPOJOWithSpecificCapabilities = (
    unitItemModel: UnitItemModel,
    capabilities: CapabilityId[]
  ): UnitItem => {
    const unitItem = this.parseMainModelToPojo(unitItemModel);

    if (capabilities?.includes(CapabilityId.Pricing)) {
      this.parsePricingModelToPOJO(unitItem, unitItemModel);
    }

    return unitItem;
  };

  private parseMainModelToPojo = (unitItemModel: UnitItemModel, capabilities?: CapabilityId[]): UnitItem => {
    let unit;

    if (capabilities === undefined) {
      unit = this.unitParser.parseModelToPOJO(unitItemModel.unitModel);
    } else {
      unit = this.unitParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel.unitModel, capabilities);
    }

    return {
      uuid: unitItemModel.uuid,
      resellerReference: unitItemModel.resellerReference,
      supplierReference: unitItemModel.supplierReference,
      unitId: unitItemModel.unitModel.id,
      unit: unit,
      status: unitItemModel.status,
      utcRedeemedAt: unitItemModel.utcRedeemedAt,
      contact: unitItemModel.contact,
      ticket: unitItemModel.ticket,
    };
  };

  private parsePricingModelToPOJO = (unitItem: UnitItem, unitItemModel: UnitItemModel) => {
    if (unitItemModel.unitItemPricingModel === undefined) {
      return;
    }

    unitItem.pricing = unitItemModel.unitItemPricingModel?.pricing;
  };
}
