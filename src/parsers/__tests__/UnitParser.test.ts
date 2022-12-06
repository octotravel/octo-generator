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
      expect(unitParser.parseModelToPOJO(unitModel)).toStrictEqual(unit);
    });
  });

  describe("Parse POJO to unit model", () => {
    it("should return unit model", async () => {
      expect(unitParser.parsePOJOToModel(unit)).toStrictEqual(unitModel);
    });
  });
});
