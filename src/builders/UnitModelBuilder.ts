import { UnitModel } from "../models/unit/UnitModel";
import { CapabilityId, PricingPer } from "@octocloud/types";
import { UnitData } from "../data/UnitData";
import { UnitDataProvider } from "../dataProviders/UnitDataProvider";
import { UnitContentModel } from "../models/unit/UnitContentModel";
import { UnitPricingModel } from "../models/unit/UnitPricingModel";
import { PricingDataProvider } from "../dataProviders/PricingDataProvider";
import { ProductModel } from "../models/product/ProductModel";
import { OptionPricingModel } from "../models/option/OptionPricingModel";

interface UnitModelBuilderData {
  unitData: UnitData;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
  sourceModel?: object;
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Content, CapabilityId.Pricing];

export class UnitModelBuilder {
  public build(builderData: UnitModelBuilderData): UnitModel {
    builderData.pricingPer ??= defaultPricingPer;
    builderData.capabilities ??= defaultCapabilities;

    const unitData = builderData.unitData;

    return new UnitModel({
      id: unitData.id,
      internalName: unitData.internalName ?? unitData.id,
      reference: unitData.reference ?? unitData.id.toLowerCase(),
      type: unitData.type,
      restrictions: unitData.restrictions ?? UnitDataProvider.commonRestrictions,
      requiredContactFields: unitData.requiredContactFields ?? [],
      unitContentModel: this.buildContentModel(builderData),
      unitPricingModel: this.buildPricingModel(builderData),
    });
  }

  private buildContentModel(builderData: UnitModelBuilderData): UnitContentModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
      return undefined;
    }

    const unitData = builderData.unitData;

    return new UnitContentModel({
      title: unitData.title ?? unitData.id,
      titlePlural: unitData.titlePlural ?? `${unitData.id}'s subtitle`,
      subtitle: unitData.subtitle ?? `${unitData.id}'s subtitle`,
    });
  }

  private buildPricingModel(builderData: UnitModelBuilderData): UnitPricingModel | undefined {
    if (
      builderData.capabilities?.includes(CapabilityId.Pricing) === false ||
      builderData.pricingPer === PricingPer.BOOKING
    ) {
      return undefined;
    }

    const unitData = builderData.unitData;
    unitData.pricing ??= [PricingDataProvider.adultPricing];

    if (builderData.sourceModel === ProductModel) {
      return new OptionPricingModel({
        pricingFrom: unitData.pricing,
      });
    }

    return new OptionPricingModel({
      pricing: unitData.pricing,
    });
  }
}
