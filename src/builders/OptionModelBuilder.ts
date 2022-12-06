import { CapabilityId, DurationUnit, PricingPer } from "@octocloud/types";
import { UnitModelBuilder } from "./UnitModelBuilder";
import { OptionData } from "../data/OptionData";
import { OptionModel } from "../models/Option/OptionModel";
import { OptionContentModel } from "../models/Option/OptionContentModel";
import { OptionPickupModel } from "../models/Option/OptionPickupModel";
import { OptionPricingModel } from "../models/Option/OptionPricingModel";

interface OptionModelBuilderData {
  optionData: OptionData;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
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
      isDefault: optionData.isDefault ?? true,
      internalName: optionData.internalName ?? "DEFAULT",
      reference: optionData.reference ?? null,
      availabilityLocalStartTimes: optionData.availabilityLocalStartTimes ?? ["00:00"],
      cancellationCutoff: optionData.cancellationCutoff ?? "0 hours",
      cancellationCutoffAmount: optionData.cancellationCutoffAmount ?? 0,
      cancellationCutoffUnit: optionData.cancellationCutoffUnit ?? "hour",
      requiredContactFields: optionData.requiredContactFields ?? [],
      restrictions: optionData.restrictions,
      unitModels: this.unitModelBuilder.buildMultiple(optionData.unitsData, builderData.pricingPer),
      optionContentModel: this.buildContentModel(builderData),
      optionPickupModel: this.buildPickupModel(builderData),
      optionPricingModel: this.buildPricingModel(builderData),
    });
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
      language: optionData.language ?? "en",
      shortDescription: optionData.shortDescription ?? "shortDescription",
      durationUnit: optionData.durationUnit ?? DurationUnit.HOUR,
      durationAmount: optionData.durationAmount ?? "0",
      duration: optionData.duration ?? `${durationAmount} ${durationUnit}`,
      itinerary: optionData.itinerary ?? [],
    });
  }

  private buildPickupModel(builderData: OptionModelBuilderData): OptionPickupModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
      return undefined;
    }

    const optionData = builderData.optionData;

    return new OptionPickupModel({
      pickupRequired: optionData.pickupRequired ?? false,
      pickupAvailable: optionData.pickupAvailable ?? false,
      pickupPoints: optionData.pickupPoints ?? [],
    });
  }

  private buildPricingModel(builderData: OptionModelBuilderData): OptionPricingModel | undefined {
    if (
      builderData.capabilities?.includes(CapabilityId.Pricing) === false ||
      builderData.pricingPer === PricingPer.BOOKING
    ) {
      return undefined;
    }

    const optionData = builderData.optionData;

    // TODO After the product model/related stuff is implemented use pricingFrom or pricing based on the source model
    return new OptionPricingModel({
      pricingFrom: optionData.pricing,
      pricing: optionData.pricing,
    });
  }
}
