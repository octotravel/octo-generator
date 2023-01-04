import { CapabilityId, UnitType } from "@octocloud/types";
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
  };

  const unitContent = {
    title: "title",
    titlePlural: "titlePlural",
    subtitle: "subtitle",
  };

  const unitPricing = {
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };

  const unitPOJO = { ...unit, ...unitContent, ...unitPricing };

  const unitModel = new UnitModel({
    id: unitPOJO.id,
    internalName: unitPOJO.internalName,
    reference: unitPOJO.reference,
    type: unitPOJO.type,
    restrictions: unitPOJO.restrictions,
    requiredContactFields: unitPOJO.requiredContactFields,
    unitContentModel: new UnitContentModel({
      title: unitPOJO.title,
      titlePlural: unitPOJO.titlePlural,
      subtitle: unitPOJO.subtitle,
    }),
    unitPricingModel: new UnitPricingModel({
      pricing: unitPOJO.pricing,
      pricingFrom: undefined,
    }),
  });

  describe("parsePOJOToModel", () => {
    it("should return unit model", async () => {
      expect(unitParser.parsePOJOToModel(unitPOJO)).toStrictEqual(unitModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return unit POJO", async () => {
      expect(unitParser.parseModelToPOJO(unitModel)).toStrictEqual(unitPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [])).toStrictEqual(unit);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with content capability", async () => {
      expect(unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [CapabilityId.Content])).toStrictEqual({
        ...unit,
        ...unitContent,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pricing capability", async () => {
      expect(unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [CapabilityId.Pricing])).toStrictEqual({
        ...unit,
        ...unitPricing,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with all capabilities", async () => {
      expect(
        unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [CapabilityId.Content, CapabilityId.Pricing])
      ).toStrictEqual(unitPOJO);
    });
  });
});
