import { UnitType } from "@octocloud/types";
import { UnitModel } from "../../models/unit/UnitModel";
import { UnitDataProvider } from "../../dataProviders/UnitDataProvider";
import { UnitParser } from "../UnitParser";
import { UnitContentModel } from "../../models/unit/UnitContentModel";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { UnitPricingModel } from "../../models/unit/UnitPricingModel";

describe("UnitParser", () => {
  const unitParser = new UnitParser();
  const unit = {
    id: "id",
    internalName: "internalName",
    reference: "reference",
    type: UnitType.CHILD,
    restrictions: UnitDataProvider.commonRestrictions,
    requiredContactFields: [],
    title: "title",
    titlePlural: "titlePlural",
    subtitle: "subtitle",
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };
  const unitModel = new UnitModel({
    id: unit.id,
    internalName: unit.internalName,
    reference: unit.reference,
    type: unit.type,
    restrictions: unit.restrictions,
    requiredContactFields: unit.requiredContactFields,
    unitContentModel: new UnitContentModel({
      title: unit.title,
      titlePlural: unit.titlePlural,
      subtitle: unit.subtitle,
    }),
    unitPricingModel: new UnitPricingModel({
      pricing: unit.pricing,
      pricingFrom: undefined,
    }),
  });

  describe("parseModelToPOJO", () => {
    it("should return unit POJO", async () => {
      expect(unitParser.parseModelToPOJO(unitModel)).toStrictEqual(unit);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return unit model", async () => {
      expect(unitParser.parsePOJOToModel(unit)).toStrictEqual(unitModel);
    });
  });
});
