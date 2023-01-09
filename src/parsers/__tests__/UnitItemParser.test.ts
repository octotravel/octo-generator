import { CapabilityId, BookingStatus } from "@octocloud/types";
import { UnitItemParser } from "../UnitItemParser";
import { UnitTestDataProvider } from "./dataProviders/UnitTestDataProvider";
import { UnitItemModel } from "../../models/unitItem/UnitItemModel";
import { UnitItemPricingModel } from "../../models/unitItem/UnitItemPricingModel";

describe("UnitItemParser", () => {
  const unitItemParser = new UnitItemParser();
  const unitPOJO = UnitTestDataProvider.unitPOJO;
  const unitModel = UnitTestDataProvider.unitModel;
  const unitItem = {
    uuid: "10ea9ebd-a4f2-419e-808d-b0e111137a96",
    resellerReference: null,
    supplierReference: null,
    unitId: unitPOJO.id,
    unit: unitPOJO,
    status: BookingStatus.CANCELLED,
    utcRedeemedAt: null,
    contact: {
      fullName: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      locales: [],
      country: null,
      notes: null,
      postalCode: null,
    },
    ticket: null,
  };
  const unitItemPricing = {
    pricing: unitPOJO.pricing[0],
  };
  const unitItemPOJO = {
    ...unitItem,
    ...unitItemPricing,
  };

  const unitItemModel = new UnitItemModel({
    uuid: unitItemPOJO.uuid,
    resellerReference: unitItemPOJO.resellerReference,
    supplierReference: unitItemPOJO.supplierReference,
    unitModel: unitModel,
    status: unitItemPOJO.status,
    utcRedeemedAt: unitItemPOJO.utcRedeemedAt,
    contact: unitItemPOJO.contact,
    ticket: unitItemPOJO.ticket,
    unitItemPricingModel: new UnitItemPricingModel({
      pricing: unitItemPOJO.pricing,
    }),
  });

  describe("parsePOJOToModel", () => {
    it("should return unit item model", async () => {
      expect(unitItemParser.parsePOJOToModel(unitItemPOJO)).toStrictEqual(unitItemModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return unit item POJO", async () => {
      expect(unitItemParser.parseModelToPOJO(unitItemModel)).toStrictEqual(unitItemPOJO);
    });
  });

  describe("parseModelToPOJOWithPricingCapatibility", () => {
    it("should return unit item POJO without pricing capability", async () => {
      expect(unitItemParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel, [])).toStrictEqual(unitItem);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pricing capability", async () => {
      expect(
        unitItemParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel, [CapabilityId.Pricing])
      ).toStrictEqual({
        ...unitItem,
        ...unitItemPricing,
      });
    });
  });
});
