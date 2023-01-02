import { Unit } from "@octocloud/types";
import { UnitModel } from "../models/unit/UnitModel";
import { UnitContentModel } from "../models/unit/UnitContentModel";
import { UnitPricingModel } from "../models/unit/UnitPricingModel";

export class UnitParser {
  public parsePOJOToModel = (unit: Unit): UnitModel => {
    return new UnitModel({
      id: unit.id,
      internalName: unit.internalName,
      reference: unit.reference,
      type: unit.type,
      requiredContactFields: unit.requiredContactFields,
      restrictions: unit.restrictions,
      unitContentModel: this.parseUnitContentPOJOToModel(unit),
      unitPricingModel: this.parseUnitPricingPOJOToModel(unit),
    });
  };

  private parseUnitContentPOJOToModel = (unit: Unit): UnitContentModel | undefined => {
    if (unit.title === undefined || unit.titlePlural === undefined || unit.subtitle === undefined) {
      return undefined;
    }

    return new UnitContentModel({
      title: unit.title,
      titlePlural: unit.titlePlural,
      subtitle: unit.subtitle,
    });
  };

  private parseUnitPricingPOJOToModel = (unit: Unit): UnitPricingModel | undefined => {
    if (unit.pricingFrom === undefined && unit.pricing === undefined) {
      return undefined;
    }

    return new UnitPricingModel({
      pricingFrom: unit.pricingFrom,
      pricing: unit.pricing,
    });
  };

  public parseModelToPOJO = (unitModel: UnitModel): Unit => {
    const unit: Unit = {
      id: unitModel.id,
      internalName: unitModel.internalName,
      reference: unitModel.reference,
      type: unitModel.type,
      restrictions: unitModel.restrictions,
      requiredContactFields: unitModel.requiredContactFields,
    };

    if (unitModel.unitContentModel !== undefined) {
      unit.title = unitModel.unitContentModel?.title;
      unit.titlePlural = unitModel.unitContentModel?.titlePlural;
      unit.subtitle = unitModel.unitContentModel?.subtitle;
    }

    if (unitModel.unitPricingModel !== undefined) {
      unit.pricingFrom = unitModel.unitPricingModel?.pricingFrom;
      unit.pricing = unitModel.unitPricingModel?.pricing;
    }

    return unit;
  };
}
