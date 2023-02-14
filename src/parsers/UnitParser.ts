import { CapabilityId, Unit, UnitContent, UnitPricing } from "@octocloud/types";
import { UnitModel } from "../models/unit/UnitModel";
import { UnitContentModel } from "../models/unit/UnitContentModel";
import { UnitPricingModel } from "../models/unit/UnitPricingModel";

export class UnitParser {
  public parsePOJOToModel(unit: Unit): UnitModel {
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
  }

  public parseUnitContentPOJOToModel(unitContent: UnitContent): UnitContentModel | undefined {
    if (
      unitContent.title === undefined ||
      unitContent.titlePlural === undefined ||
      unitContent.subtitle === undefined
    ) {
      return undefined;
    }

    return new UnitContentModel({
      title: unitContent.title,
      titlePlural: unitContent.titlePlural,
      subtitle: unitContent.subtitle,
    });
  }

  public parseUnitPricingPOJOToModel(unitPricing: UnitPricing): UnitPricingModel | undefined {
    if (unitPricing.pricingFrom === undefined && unitPricing.pricing === undefined) {
      return undefined;
    }

    return new UnitPricingModel({
      pricingFrom: unitPricing.pricingFrom,
      pricing: unitPricing.pricing,
    });
  }

  public parseModelToPOJO(unitModel: UnitModel): Unit {
    return Object.assign(
      this.parseMainModelToPojo(unitModel),
      this.parseContentModelToPOJO(unitModel.unitContentModel),
      this.parsePricingModelToPOJO(unitModel.unitPricingModel)
    );
  }

  public parseModelToPOJOWithSpecificCapabilities(unitModel: UnitModel, capabilities: CapabilityId[]): Unit {
    let unitContent;
    let unitPricing;

    if (capabilities?.includes(CapabilityId.Content)) {
      unitContent = this.parseContentModelToPOJO(unitModel.unitContentModel);
    }

    if (capabilities?.includes(CapabilityId.Pricing)) {
      unitPricing = this.parsePricingModelToPOJO(unitModel.unitPricingModel);
    }

    return Object.assign(this.parseMainModelToPojo(unitModel), unitContent, unitPricing);
  }

  private parseMainModelToPojo(unitModel: UnitModel): Unit {
    return {
      id: unitModel.id,
      internalName: unitModel.internalName,
      reference: unitModel.reference,
      type: unitModel.type,
      restrictions: unitModel.restrictions,
      requiredContactFields: unitModel.requiredContactFields,
    };
  }

  public parseContentModelToPOJO(unitContentModel?: UnitContentModel): UnitContent {
    if (unitContentModel === undefined) {
      return {};
    }

    return {
      title: unitContentModel?.title,
      titlePlural: unitContentModel?.titlePlural,
      subtitle: unitContentModel?.subtitle,
    };
  }

  public parsePricingModelToPOJO(unitPricingModel?: UnitPricingModel): UnitPricing {
    if (unitPricingModel === undefined) {
      return {};
    }

    return {
      pricingFrom: unitPricingModel.pricingFrom,
      pricing: unitPricingModel.pricing,
    };
  }
}
