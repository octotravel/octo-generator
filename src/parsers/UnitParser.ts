import { CapabilityId, Unit } from "@octocloud/types";
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
    const unit = this.parseMainModelToPojo(unitModel);

    this.parseContentModelToPOJO(unit, unitModel);
    this.parsePricingModelToPOJO(unit, unitModel);

    return unit;
  };

  public parseModelToPOJOWithSpecificCapabilities = (unitModel: UnitModel, capabilities: CapabilityId[]): Unit => {
    const unit = this.parseMainModelToPojo(unitModel);

    if (capabilities?.includes(CapabilityId.Content)) {
      this.parseContentModelToPOJO(unit, unitModel);
    }

    if (capabilities?.includes(CapabilityId.Pricing)) {
      this.parsePricingModelToPOJO(unit, unitModel);
    }

    return unit;
  };

  private parseMainModelToPojo = (unitModel: UnitModel): Unit => {
    return {
      id: unitModel.id,
      internalName: unitModel.internalName,
      reference: unitModel.reference,
      type: unitModel.type,
      restrictions: unitModel.restrictions,
      requiredContactFields: unitModel.requiredContactFields,
    };
  };

  private parseContentModelToPOJO = (unit: Unit, unitModel: UnitModel) => {
    if (unitModel.unitContentModel === undefined) {
      return;
    }

    const unitContentModel = unitModel.unitContentModel;

    unit.title = unitContentModel?.title;
    unit.titlePlural = unitContentModel?.titlePlural;
    unit.subtitle = unitContentModel?.subtitle;
  };

  private parsePricingModelToPOJO = (unit: Unit, unitModel: UnitModel) => {
    if (unitModel.unitPricingModel === undefined) {
      return;
    }

    const unitPricingModel = unitModel.unitPricingModel;

    unit.pricingFrom = unitPricingModel?.pricingFrom;
    unit.pricing = unitPricingModel?.pricing;
  };
}
