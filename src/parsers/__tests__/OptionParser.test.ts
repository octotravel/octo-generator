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

  describe("Parse option model to option POJO", () => {
    it("should return option POJO", async () => {
      const parsedPOJO = optionParser.parseModelToPOJO(optionModel);

      expect(parsedPOJO.id).toStrictEqual(option.id);
      expect(parsedPOJO.default).toStrictEqual(option.default);
      expect(parsedPOJO.internalName).toStrictEqual(option.internalName);
      expect(parsedPOJO.reference).toStrictEqual(option.reference);
      expect(parsedPOJO.availabilityLocalStartTimes).toStrictEqual(option.availabilityLocalStartTimes);
      expect(parsedPOJO.cancellationCutoff).toStrictEqual(option.cancellationCutoff);
      expect(parsedPOJO.cancellationCutoffAmount).toStrictEqual(option.cancellationCutoffAmount);
      expect(parsedPOJO.cancellationCutoffUnit).toStrictEqual(option.cancellationCutoffUnit);
      expect(parsedPOJO.requiredContactFields).toStrictEqual(option.requiredContactFields);
      expect(parsedPOJO.restrictions).toStrictEqual(option.restrictions);
      expect(parsedPOJO.units).toStrictEqual(option.units);
    });
  });

  describe("Parse POJO to option model", () => {
    it("should return option model", async () => {
      const parsedModel = optionParser.parsePOJOToModel(option);

      expect(parsedModel.id).toStrictEqual(optionModel.id);
      expect(parsedModel.isDefault).toStrictEqual(optionModel.isDefault);
      expect(parsedModel.internalName).toStrictEqual(optionModel.internalName);
      expect(parsedModel.reference).toStrictEqual(optionModel.reference);
      expect(parsedModel.availabilityLocalStartTimes).toStrictEqual(optionModel.availabilityLocalStartTimes);
      expect(parsedModel.cancellationCutoff).toStrictEqual(optionModel.cancellationCutoff);
      expect(parsedModel.cancellationCutoffAmount).toStrictEqual(optionModel.cancellationCutoffAmount);
      expect(parsedModel.cancellationCutoffUnit).toStrictEqual(optionModel.cancellationCutoffUnit);
      expect(parsedModel.requiredContactFields).toStrictEqual(optionModel.requiredContactFields);
      expect(parsedModel.restrictions).toStrictEqual(optionModel.restrictions);
      expect(parsedModel.unitModels).toStrictEqual(optionModel.unitModels);
    });
  });
});
