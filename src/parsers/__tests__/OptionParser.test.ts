import { Option } from "@octocloud/types";
import { UnitModel } from "../../models/Unit/UnitModel";
import { OptionParser } from "../OptionParser";
import { OptionModel } from "../../models/Option/OptionModel";

describe("OptionParser", () => {
  const optionParser = new OptionParser();

  const option: Option = {
    id: "id",
    default: true,
    internalName: "internalName",
    reference: null,
    availabilityLocalStartTimes: [],
    cancellationCutoff: "cancellationCutoff",
    cancellationCutoffAmount: 0,
    cancellationCutoffUnit: "cancellationCutoffUnit",
    requiredContactFields: [],
    restrictions: {
      minUnits: 0,
      maxUnits: null,
    },
    units: [],
  };

  const optionModel = new OptionModel({
    id: option.id,
    isDefault: option.default,
    internalName: option.internalName,
    reference: option.reference,
    availabilityLocalStartTimes: option.availabilityLocalStartTimes,
    cancellationCutoff: option.cancellationCutoff,
    cancellationCutoffAmount: option.cancellationCutoffAmount,
    cancellationCutoffUnit: option.cancellationCutoffUnit,
    requiredContactFields: option.requiredContactFields,
    restrictions: option.restrictions,
    unitModels: option.units.map((unit) => new UnitModel(unit)),
  });

  describe("parseModelToPOJO", () => {
    it("should return option POJO", async () => {
      expect(optionParser.parseModelToPOJO(optionModel)).toStrictEqual(option);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return option model", async () => {
      expect(optionParser.parsePOJOToModel(option)).toStrictEqual(optionModel);
    });
  });
});
