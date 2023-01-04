import { CapabilityId, DurationUnit, PricingPer } from "@octocloud/types";
import { UnitModelBuilder } from "./UnitModelBuilder";
import { OptionModel } from "../models/option/OptionModel";
import { OptionContentModel } from "../models/option/OptionContentModel";
import { OptionPickupsModel } from "../models/option/./OptionPickupsModel";
import { OptionPricingModel } from "../models/option/OptionPricingModel";
import { PricingDataProvider } from "../dataProviders/PricingDataProvider";
import { UnitModel } from "../models/unit/UnitModel";
import { LocaleDataProvider } from "../dataProviders/LocaleDataProvider";
import { ProductModel } from "../models/product/ProductModel";
import { PartialOption } from "../types/PartialOption";

interface OptionModelBuilderData {
  optionData: PartialOption;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
  sourceModel?: object;
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing];

export class OptionModelBuilder {
  private unitModelBuilder = new UnitModelBuilder();

  public build(builderData: OptionModelBuilderData): OptionModel {
    builderData.pricingPer ??= defaultPricingPer;
    builderData.capabilities ??= defaultCapabilities;

    const optionData = builderData.optionData;

    return new OptionModel({
      id: optionData.id ?? "DEFAULT",
      isDefault: optionData.default ?? true,
      internalName: optionData.internalName ?? "DEFAULT",
      reference: optionData.reference ?? null,
      availabilityLocalStartTimes: optionData.availabilityLocalStartTimes ?? ["00:00"],
      cancellationCutoff: optionData.cancellationCutoff ?? "0 hours",
      cancellationCutoffAmount: optionData.cancellationCutoffAmount ?? 0,
      cancellationCutoffUnit: optionData.cancellationCutoffUnit ?? "hour",
      requiredContactFields: optionData.requiredContactFields ?? [],
      restrictions: optionData.restrictions ?? {
        minUnits: 0,
        maxUnits: null,
      },
      unitModels: this.buildUnitModels(builderData),
      optionContentModel: this.buildContentModel(builderData),
      optionPickupsModel: this.buildPickupsModel(builderData),
      optionPricingModel: this.buildPricingModel(builderData),
    });
  }

  private buildUnitModels(builderData: OptionModelBuilderData): UnitModel[] {
    if (builderData.optionData.units === undefined) {
      return [];
    }

    return builderData.optionData.units.map((unitData) => {
      return this.unitModelBuilder.build({
        unitData: unitData,
        pricingPer: builderData.pricingPer,
        capabilities: builderData.capabilities,
        sourceModel: builderData.sourceModel,
      });
    }, builderData);
  }

  private buildContentModel(builderData: OptionModelBuilderData): OptionContentModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
      return undefined;
    }

    const optionData = builderData.optionData;
    const durationUnit = optionData.durationUnit ?? DurationUnit.HOUR;
    const durationAmount = optionData.durationAmount ?? "0";

    return new OptionContentModel({
      title: optionData.title ?? "title",
      subtitle: optionData.subtitle ?? "subtitle",
      language: optionData.language ?? LocaleDataProvider.en,
      shortDescription: optionData.shortDescription ?? "shortDescription",
      durationUnit: optionData.durationUnit ?? DurationUnit.HOUR,
      durationAmount: optionData.durationAmount ?? "0",
      duration: optionData.duration ?? `${durationAmount} ${durationUnit}`,
      itinerary: optionData.itinerary ?? [],
    });
  }

  private buildPickupsModel(builderData: OptionModelBuilderData): OptionPickupsModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
      return undefined;
    }

    const optionData = builderData.optionData;

    return new OptionPickupsModel({
      pickupRequired: optionData.pickupRequired ?? false,
      pickupAvailable: optionData.pickupAvailable ?? false,
      pickupPoints: optionData.pickupPoints ?? [],
    });
  }

  private buildPricingModel(builderData: OptionModelBuilderData): OptionPricingModel | undefined {
    if (
      builderData.capabilities?.includes(CapabilityId.Pricing) === false ||
      builderData.pricingPer === PricingPer.UNIT
    ) {
      return undefined;
    }

    const optionData = builderData.optionData;
    optionData.pricing ??= [PricingDataProvider.adultPricing];

    if (builderData.sourceModel === ProductModel) {
      return new OptionPricingModel({
        pricingFrom: optionData.pricing,
      });
    }

    return new OptionPricingModel({
      pricing: optionData.pricing,
    });
  }
}
