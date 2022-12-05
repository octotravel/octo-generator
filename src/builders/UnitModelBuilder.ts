import { UnitModel } from "../models/UnitModel";
import { PricingPer } from "@octocloud/types";
import { UnitParser } from "../parsers/UnitParser";
import { UnitData } from "../data/UnitData";
import { UnitDataProvider } from "../dataProviders/UnitDataProvider";

interface UnitModelBuilderData {
  unitData: UnitData;
  pricingPer?: PricingPer;
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;

export class UnitModelBuilder {
  private readonly unitParser = new UnitParser();

  public build(unitModelBuilderData: UnitModelBuilderData): UnitModel {
    const unitData = unitModelBuilderData.unitData;
    const pricingPer = unitModelBuilderData.pricingPer ?? defaultPricingPer;

    unitData.internalName ??= unitData.id;
    unitData.reference ??= unitData.id.toLowerCase();
    unitData.restrictions ??= UnitDataProvider.commonRestrictions;
    unitData.requiredContactFields ??= [];
    unitData.title ??= unitData.id;
    unitData.titlePlural ??= `${unitData.id}'s subtitle`;
    unitData.subtitle ??= `${unitData.id}'s subtitle`;
    let pricingFrom = unitData.pricing;
    let pricing = undefined;

    // TODO pricing logic will be changed based on the source model
    if (pricingPer === PricingPer.BOOKING) {
      pricing = undefined;
      pricingFrom = undefined;
    }

    return this.unitParser.parsePOJOToModel({
      id: unitData.id,
      internalName: unitData.internalName,
      reference: unitData.reference,
      type: unitData.type,
      restrictions: unitData.restrictions,
      requiredContactFields: unitData.requiredContactFields,
      title: unitData.title,
      titlePlural: unitData.titlePlural,
      subtitle: unitData.subtitle,
      pricingFrom,
      pricing,
    });
  }
}
