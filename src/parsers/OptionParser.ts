import { Option } from "@octocloud/types";
import { OptionModel } from "../models/option/OptionModel";
import { UnitParser } from "./UnitParser";
import { OptionContentModel } from "../models/option/OptionContentModel";
import { OptionPickupModel } from "../models/option/OptionPickupModel";
import { OptionPricingModel } from "../models/option/OptionPricingModel";

export class OptionParser {
  private readonly unitParser = new UnitParser();

  public parsePOJOToModel = (option: Option): OptionModel => {
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
      optionPickupModel: this.parseOptionPickupPOJOToModel(option),
      optionPricingModel: this.parseOptionPricingPOJOToModel(option),
    });
  };

  private parseOptionContentPOJOToModel = (option: Option): OptionContentModel | undefined => {
    if (
      option.title === undefined ||
      option.subtitle === undefined ||
      option.language === undefined ||
      option.shortDescription === undefined ||
      option.duration === undefined ||
      option.durationAmount === undefined ||
      option.durationUnit === undefined ||
      option.itinerary === undefined
    ) {
      return undefined;
    }

    return new OptionContentModel({
      title: option.title,
      subtitle: option.subtitle,
      language: option.language,
      shortDescription: option.shortDescription,
      duration: option.duration,
      durationAmount: option.durationAmount,
      durationUnit: option.durationUnit,
      itinerary: option.itinerary,
    });
  };

  private parseOptionPickupPOJOToModel = (option: Option): OptionPickupModel | undefined => {
    if (
      option.pickupRequired === undefined ||
      option.pickupAvailable === undefined ||
      option.pickupPoints === undefined
    ) {
      return undefined;
    }

    return new OptionPickupModel({
      pickupRequired: option.pickupRequired,
      pickupAvailable: option.pickupAvailable,
      pickupPoints: option.pickupPoints,
    });
  };

  private parseOptionPricingPOJOToModel = (option: Option): OptionPricingModel | undefined => {
    if (option.pricingFrom === undefined && option.pricing === undefined) {
      return undefined;
    }

    return new OptionPricingModel({
      pricingFrom: option.pricingFrom,
      pricing: option.pricing,
    });
  };

  public parseModelToPOJO = (optionModel: OptionModel): Option => {
    const option: Option = {
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
      units: optionModel.unitModels.map((unitModel) => this.unitParser.parseModelToPOJO(unitModel)),
    };

    if (optionModel.optionContentModel !== undefined) {
      const optionContentModel = optionModel.optionContentModel;

      option.title = optionContentModel.title;
      option.subtitle = optionContentModel.subtitle;
      option.language = optionContentModel.language;
      option.shortDescription = optionContentModel.shortDescription;
      option.duration = optionContentModel.duration;
      option.durationAmount = optionContentModel.durationAmount;
      option.durationUnit = optionContentModel.durationUnit;
      option.itinerary = optionContentModel.itinerary;
    }

    if (optionModel.optionPickupModel !== undefined) {
      const optionPickupModel = optionModel.optionPickupModel;

      option.pickupRequired = optionPickupModel.pickupRequired;
      option.pickupAvailable = optionPickupModel.pickupAvailable;
      option.pickupPoints = optionPickupModel.pickupPoints;
    }

    if (optionModel.optionPricingModel !== undefined) {
      const optionPricingModel = optionModel.optionPricingModel;

      option.pricingFrom = optionPricingModel.pricingFrom;
      option.pricing = optionPricingModel.pricing;
    }

    return option;
  };
}
