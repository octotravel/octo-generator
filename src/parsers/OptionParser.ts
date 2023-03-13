import { CapabilityId, Option, OptionContent, OptionPickup, OptionPricing } from "@octocloud/types";
import { OptionModel } from "../models/option/OptionModel";
import { UnitParser } from "./UnitParser";
import { OptionContentModel } from "../models/option/OptionContentModel";
import { OptionPickupsModel } from "../models/option/OptionPickupsModel";
import { OptionPricingModel } from "../models/option/OptionPricingModel";

export class OptionParser {
  private readonly unitParser = new UnitParser();

  public parsePOJOToModel(option: Option): OptionModel {
    return new OptionModel({
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
      unitModels: option.units.map((unit) => this.unitParser.parsePOJOToModel(unit)),
      optionContentModel: this.parseOptionContentPOJOToModel(option),
      optionPickupsModel: this.parseOptionPickupsPOJOToModel(option),
      optionPricingModel: this.parseOptionPricingPOJOToModel(option),
    });
  }

  public parseOptionContentPOJOToModel(optionContent: OptionContent): OptionContentModel | undefined {
    if (
      optionContent.title === undefined ||
      optionContent.subtitle === undefined ||
      optionContent.language === undefined ||
      optionContent.shortDescription === undefined ||
      optionContent.duration === undefined ||
      optionContent.durationAmount === undefined ||
      optionContent.durationUnit === undefined ||
      optionContent.itinerary === undefined
    ) {
      return undefined;
    }

    return new OptionContentModel({
      title: optionContent.title,
      subtitle: optionContent.subtitle,
      language: optionContent.language,
      shortDescription: optionContent.shortDescription,
      duration: optionContent.duration,
      durationAmount: optionContent.durationAmount,
      durationUnit: optionContent.durationUnit,
      itinerary: optionContent.itinerary,
    });
  }

  public parseOptionPickupsPOJOToModel(optionPickups: OptionPickup): OptionPickupsModel | undefined {
    if (
      optionPickups.pickupRequired === undefined ||
      optionPickups.pickupAvailable === undefined ||
      optionPickups.pickupPoints === undefined
    ) {
      return undefined;
    }

    return new OptionPickupsModel({
      pickupRequired: optionPickups.pickupRequired,
      pickupAvailable: optionPickups.pickupAvailable,
      pickupPoints: optionPickups.pickupPoints,
    });
  }

  public parseOptionPricingPOJOToModel(optionPricing: OptionPricing): OptionPricingModel | undefined {
    if (optionPricing.pricingFrom === undefined && optionPricing.pricing === undefined) {
      return undefined;
    }

    return new OptionPricingModel({
      pricingFrom: optionPricing.pricingFrom,
      pricing: optionPricing.pricing,
    });
  }

  public parseModelToPOJO(optionModel: OptionModel): Option {
    return Object.assign(
      this.parseMainModelToPojo(optionModel),
      this.parseContentModelToPOJO(optionModel.optionContentModel),
      this.parsePickupsModelToPOJO(optionModel.optionPickupsModel),
      this.parsePricingModelToPOJO(optionModel.optionPricingModel)
    );
  }

  public parseModelToPOJOWithSpecificCapabilities(optionModel: OptionModel, capabilities: CapabilityId[]): Option {
    let optionContent;
    let optionGoogle;
    let optionPickups;
    let optionPricing;

    if (capabilities?.includes(CapabilityId.Content)) {
      optionContent = this.parseContentModelToPOJO(optionModel.optionContentModel);
    }

    if (capabilities?.includes(CapabilityId.Pickups)) {
      optionPickups = this.parsePickupsModelToPOJO(optionModel.optionPickupsModel);
    }

    if (capabilities?.includes(CapabilityId.Pricing)) {
      optionPricing = this.parsePricingModelToPOJO(optionModel.optionPricingModel);
    }

    return Object.assign(
      this.parseMainModelToPojo(optionModel, capabilities),
      optionContent,
      optionGoogle,
      optionPickups,
      optionPricing
    );
  }

  private parseMainModelToPojo(optionModel: OptionModel, capabilities?: CapabilityId[]): Option {
    const units = optionModel.unitModels.map((unitModel) => {
      if (capabilities === undefined) {
        return this.unitParser.parseModelToPOJO(unitModel);
      }
      return this.unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, capabilities);
    });

    return {
      id: optionModel.id,
      default: optionModel.isDefault,
      internalName: optionModel.internalName,
      reference: optionModel.reference,
      availabilityLocalStartTimes: optionModel.availabilityLocalStartTimes,
      cancellationCutoff: optionModel.cancellationCutoff,
      cancellationCutoffAmount: optionModel.cancellationCutoffAmount,
      cancellationCutoffUnit: optionModel.cancellationCutoffUnit,
      requiredContactFields: optionModel.requiredContactFields,
      restrictions: optionModel.restrictions,
      units,
    };
  }

  public parseContentModelToPOJO(optionContentModel?: OptionContentModel): OptionContent {
    if (optionContentModel === undefined) {
      return {};
    }

    return {
      title: optionContentModel.title,
      subtitle: optionContentModel.subtitle,
      language: optionContentModel.language,
      shortDescription: optionContentModel.shortDescription,
      duration: optionContentModel.duration,
      durationAmount: optionContentModel.durationAmount,
      durationUnit: optionContentModel.durationUnit,
      itinerary: optionContentModel.itinerary,
    };
  }

  public parsePickupsModelToPOJO(optionPickupsModel?: OptionPickupsModel): OptionPickup {
    if (optionPickupsModel === undefined) {
      return {};
    }

    return {
      pickupRequired: optionPickupsModel.pickupRequired,
      pickupAvailable: optionPickupsModel.pickupAvailable,
      pickupPoints: optionPickupsModel.pickupPoints,
    };
  }

  public parsePricingModelToPOJO(optionPricingModel?: OptionPricingModel): OptionPricing {
    if (optionPricingModel === undefined) {
      return {};
    }

    return {
      pricingFrom: optionPricingModel.pricingFrom,
      pricing: optionPricingModel.pricing,
    };
  }
}
