import { CapabilityId } from "@octocloud/types";
import { OptionValidator } from "@octocloud/validators";
import { OptionParser } from "../../parsers/OptionParser";
import { OptionModelGenerator } from "../OptionModelGenerator";

describe("OptionModelGenerator", () => {
  const optionModelGenerator = new OptionModelGenerator();
  const optionParser = new OptionParser();
  const capabilities = [CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing];
  const optionValidator = new OptionValidator({
    path: "",
    capabilities: capabilities,
  });

  describe("generate and validate option model", () => {
    it("should generate valid option model", async () => {
      const optionModel = optionModelGenerator.generate({
        optionData: {
          restrictions: {
            minUnits: 0,
            maxUnits: null,
          },
          units: [],
        },
        capabilities: capabilities,
      });
      const option = optionParser.parseModelToPOJO(optionModel);
      const validationErrors = optionValidator.validate(option);

      expect(validationErrors).toStrictEqual([]);
    });

    it("should generate invalid option model", async () => {
      const optionModel = optionModelGenerator.generate({
        optionData: {
          id: "",
          restrictions: {
            minUnits: 0,
            maxUnits: null,
          },
          units: [],
        },
        capabilities: capabilities,
      });
      const option = optionParser.parseModelToPOJO(optionModel);
      const validationErrors = optionValidator.validate(option);

      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
