import { Unit, UnitType } from "@octocloud/types";
import { UnitModel } from "../../models/UnitModel";
import { UnitDataProvider } from "../../dataProviders/UnitDataProvider";
import { UnitParser } from "../UnitParser";

describe("Unit parser", () => {
  const unitParser = new UnitParser();

  describe("Parse unit model to unit POJO", () => {
    it("should return an unit POJO", async () => {
      const unit: Unit = {
        id: "id",
        internalName: "internalName",
        reference: "reference",
        type: UnitType.CHILD,
        restrictions: UnitDataProvider.commonRestrictions,
        requiredContactFields: [],
      };
      const unitModel: UnitModel = new UnitModel(unit);

      expect(unitParser.parseModelToPOJO(unitModel)).toEqual(unit);
    });
  });

  describe("Parse POJO to unit model", () => {
    it("should return an unit model", async () => {
      const unit: Unit = {
        id: "id",
        internalName: "internalName",
        reference: "reference",
        type: UnitType.CHILD,
        restrictions: UnitDataProvider.commonRestrictions,
        requiredContactFields: [],
      };
      const unitModel: UnitModel = new UnitModel(unit);

      expect(unitParser.parsePOJOToModel(unit)).toEqual(unitModel);
    });
  });
});
