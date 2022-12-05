import { Unit, UnitType } from "@octocloud/types";
import { UnitModel } from "../../models/Unit/UnitModel";
import { UnitDataProvider } from "../../dataProviders/UnitDataProvider";
import { UnitParser } from "../UnitParser";

describe("UnitParser", () => {
  const unitParser = new UnitParser();
  const unit: Unit = {
    id: "id",
    internalName: "internalName",
    reference: "reference",
    type: UnitType.CHILD,
    restrictions: UnitDataProvider.commonRestrictions,
    requiredContactFields: [],
  };
  const unitModel = new UnitModel(unit);

  describe("Parse unit model to unit POJO", () => {
    it("should return unit POJO", async () => {
      const parsedPOJO = unitParser.parseModelToPOJO(unitModel);

      expect(parsedPOJO.id).toStrictEqual(unit.id);
      expect(parsedPOJO.internalName).toStrictEqual(unit.internalName);
      expect(parsedPOJO.reference).toStrictEqual(unit.reference);
      expect(parsedPOJO.type).toStrictEqual(unit.type);
      expect(parsedPOJO.restrictions).toStrictEqual(unit.restrictions);
      expect(parsedPOJO.requiredContactFields).toStrictEqual(unit.requiredContactFields);
    });
  });

  describe("Parse POJO to unit model", () => {
    it("should return unit model", async () => {
      const parsedModel = unitParser.parsePOJOToModel(unit);

      expect(parsedModel.id).toStrictEqual(unitModel.id);
      expect(parsedModel.internalName).toStrictEqual(unitModel.internalName);
      expect(parsedModel.reference).toStrictEqual(unitModel.reference);
      expect(parsedModel.type).toStrictEqual(unitModel.type);
      expect(parsedModel.restrictions).toStrictEqual(unitModel.restrictions);
      expect(parsedModel.requiredContactFields).toStrictEqual(unitModel.requiredContactFields);
    });
  });
});
