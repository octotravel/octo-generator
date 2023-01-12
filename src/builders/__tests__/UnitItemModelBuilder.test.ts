import { CapabilityId } from "@octocloud/types";
import { UnitItemModel } from "../../models/unitItem/UnitItemModel";
import { UnitItemModelBuilder } from "../UnitItemModelBuilder";

describe("UnitItemModelBuilder", () => {
  const unitItemModelBuilder = new UnitItemModelBuilder();

  describe("build", () => {
    it("should build unit item model without pricing capability", async () => {
      const generatedUnitItemModel = unitItemModelBuilder.build({
        unitItemData: {},
        capabilities: [],
      });

      expect(generatedUnitItemModel).toBeInstanceOf(UnitItemModel);
      expect(generatedUnitItemModel.unitItemPricingModel).toBeUndefined();
    });

    it("should build unit item model with pricing capability", async () => {
      const generatedUnitItemModel = unitItemModelBuilder.build({
        unitItemData: {},
        capabilities: [CapabilityId.Pricing],
      });

      expect(generatedUnitItemModel).toBeInstanceOf(UnitItemModel);
      expect(generatedUnitItemModel.unitItemPricingModel).toBeDefined();
    });
  });
});
