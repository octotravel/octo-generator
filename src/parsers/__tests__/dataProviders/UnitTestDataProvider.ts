import { UnitType } from "@octocloud/types";
import PricingDataProvider from "../../../dataProviders/PricingDataProvider";
import UnitModel from "../../../models/unit/UnitModel";
import UnitContentModel from "../../../models/unit/UnitContentModel";
import UnitPricingModel from "../../../models/unit/UnitPricingModel";
import UnitDataProvider from "../../../dataProviders/UnitDataProvider";

export default class UnitTestDataProvider {
  static unit = {
    id: "id",
    internalName: "internalName",
    reference: "reference",
    type: UnitType.CHILD,
    restrictions: UnitDataProvider.commonRestrictions,
    requiredContactFields: [],
  };

  static unitContent = {
    title: "title",
    titlePlural: "titlePlural",
    subtitle: "subtitle",
  };

  static unitPricing = {
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };

  static unitPOJO = { ...this.unit, ...this.unitContent, ...this.unitPricing };

  static unitModel = new UnitModel({
    id: this.unitPOJO.id,
    internalName: this.unitPOJO.internalName,
    reference: this.unitPOJO.reference,
    type: this.unitPOJO.type,
    restrictions: this.unitPOJO.restrictions,
    requiredContactFields: this.unitPOJO.requiredContactFields,
    unitContentModel: new UnitContentModel({
      title: this.unitPOJO.title,
      titlePlural: this.unitPOJO.titlePlural,
      subtitle: this.unitPOJO.subtitle,
    }),
    unitPricingModel: new UnitPricingModel({
      pricing: this.unitPOJO.pricing,
      pricingFrom: undefined,
    }),
  });
}
