import { UnitModelGenerator } from "../UnitModelGenerator";
import { CapabilityId, UnitType } from "@octocloud/types";
import { UnitValidator } from "@octocloud/validators";
import { UnitParser } from "../../parsers/UnitParser";

describe("UnitModelGenerator", () => {
  const unitModelGenerator = new UnitModelGenerator();
  const unitParser = new UnitParser();
  const capabilities = [CapabilityId.Content, CapabilityId.Pricing];
  const unitValidator = new UnitValidator({
    path: "",
    capabilities: capabilities,
  });

  describe("generate and validate unit model", () => {
    it.concurrent("should generate valid unit model", async () => {
      const unitModel = unitModelGenerator.generate({
        unitData: {
          id: "id",
          type: UnitType.ADULT,
        },
        capabilities: capabilities,
      });
      const unit = unitParser.parseModelToPOJO(unitModel);
      const validationErrors = unitValidator.validate(unit);

      expect(validationErrors).toStrictEqual([]);
    });

    it.concurrent("should generate invalid unit model", async () => {
      const unitModel = unitModelGenerator.generate({
        unitData: {
          id: "",
          type: UnitType.ADULT,
        },
        capabilities: capabilities,
      });
      const unit = unitParser.parseModelToPOJO(unitModel);
      const validationErrors = unitValidator.validate(unit);

      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
