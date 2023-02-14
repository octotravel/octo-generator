import { UnitType, Unit, UnitPricing, UnitContent } from "@octocloud/types";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { UnitModel } from "../../../models/unit/UnitModel";
import { UnitContentModel } from "../../../models/unit/UnitContentModel";
import { UnitPricingModel } from "../../../models/unit/UnitPricingModel";
import { UnitDataProvider } from "../../../dataProviders/UnitDataProvider";

export class UnitTestDataProvider {
  static unit: Unit = {
    id: "id",
    internalName: "internalName",
    reference: "reference",
    type: UnitType.CHILD,
    restrictions: UnitDataProvider.commonRestrictions,
    requiredContactFields: [],
  };

  static unitContent: Required<UnitContent> = {
    title: "title",
    titlePlural: "titlePlural",
    subtitle: "subtitle",
  };

  static unitPricing: UnitPricing = {
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };

  static unitPOJO: Unit = { ...this.unit, ...this.unitContent, ...this.unitPricing };

  static unitModel = new UnitModel({
    id: this.unitPOJO.id,
    internalName: this.unitPOJO.internalName,
    reference: this.unitPOJO.reference,
    type: this.unitPOJO.type,
    restrictions: this.unitPOJO.restrictions,
    requiredContactFields: this.unitPOJO.requiredContactFields,
    unitContentModel: new UnitContentModel({
      title: this.unitContent.title,
      titlePlural: this.unitContent.titlePlural,
      subtitle: this.unitContent.subtitle,
    }),
    unitPricingModel: new UnitPricingModel({
      pricing: this.unitPOJO.pricing,
      pricingFrom: undefined,
    }),
  });
}
