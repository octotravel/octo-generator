import { OptionParser } from "../OptionParser";
import { OptionTestDataProvider } from "./dataProviders/OptionTestDataProvider";
import { CapabilityId } from "@octocloud/types";

describe("OptionParser", () => {
  const optionParser = new OptionParser();
  const option = OptionTestDataProvider.option;
  const optionContent = OptionTestDataProvider.optionContent;
  const optionPickups = OptionTestDataProvider.optionPickups;
  const optionPricing = OptionTestDataProvider.optionPricing;
  const optionPOJO = OptionTestDataProvider.optionPOJO;
  const optionModel = OptionTestDataProvider.optionModel;

  describe("parsePOJOToModel", () => {
    it("should return option model", async () => {
      expect(optionParser.parsePOJOToModel(optionPOJO)).toStrictEqual(optionModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return option POJO", async () => {
      expect(optionParser.parseModelToPOJO(optionModel)).toStrictEqual(optionPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, [])).toStrictEqual(option);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with content capability", async () => {
      expect(optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, [CapabilityId.Content])).toStrictEqual({
        ...option,
        ...optionContent,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pickups capability", async () => {
      expect(optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, [CapabilityId.Pickups])).toStrictEqual({
        ...option,
        ...optionPickups,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pricing capability", async () => {
      expect(optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, [CapabilityId.Pricing])).toStrictEqual({
        ...option,
        ...optionPricing,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with all capabilities", async () => {
      expect(
        optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, [
          CapabilityId.Content,
          CapabilityId.Pickups,
          CapabilityId.Pricing,
        ])
      ).toStrictEqual(optionPOJO);
    });
  });
});
