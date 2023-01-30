import { CapabilityId, Option } from "@octocloud/types";
import OptionModel from "../models/option/OptionModel";
import UnitParser from "./UnitParser";
import OptionContentModel from "../models/option/OptionContentModel";
import OptionPickupsModel from "../models/option/OptionPickupsModel";
import OptionPricingModel from "../models/option/OptionPricingModel";

export default class OptionParser {
  private readonly unitParser = new UnitParser();

  public parsePOJOToModel = (option: Option): OptionModel =>
    new OptionModel({
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

  private parseOptionPickupsPOJOToModel = (option: Option): OptionPickupsModel | undefined => {
    if (
      option.pickupRequired === undefined ||
      option.pickupAvailable === undefined ||
      option.pickupPoints === undefined
    ) {
      return undefined;
    }

    return new OptionPickupsModel({
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
    const option = this.parseMainModelToPojo(optionModel);

    this.parseContentModelToPOJO(option, optionModel);
    this.parsePickupsModelToPOJO(option, optionModel);
    this.parsePricingModelToPOJO(option, optionModel);

    return option;
  };

  public parseModelToPOJOWithSpecificCapabilities = (
    optionModel: OptionModel,
    capabilities: CapabilityId[]
  ): Option => {
    const option = this.parseMainModelToPojo(optionModel, capabilities);

    if (capabilities?.includes(CapabilityId.Content)) {
      this.parseContentModelToPOJO(option, optionModel);
    }

    if (capabilities?.includes(CapabilityId.Pickups)) {
      this.parsePickupsModelToPOJO(option, optionModel);
    }

    if (capabilities?.includes(CapabilityId.Pricing)) {
      this.parsePricingModelToPOJO(option, optionModel);
    }

    return option;
  };

  private parseMainModelToPojo = (optionModel: OptionModel, capabilities?: CapabilityId[]): Option => {
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
  };

  private parseContentModelToPOJO = (option: Option, optionModel: OptionModel) => {
    if (optionModel.optionContentModel === undefined) {
      return;
    }

    const { optionContentModel } = optionModel;

    option.title = optionContentModel.title;
    option.subtitle = optionContentModel.subtitle;
    option.language = optionContentModel.language;
    option.shortDescription = optionContentModel.shortDescription;
    option.duration = optionContentModel.duration;
    option.durationAmount = optionContentModel.durationAmount;
    option.durationUnit = optionContentModel.durationUnit;
    option.itinerary = optionContentModel.itinerary;
  };

  private parsePickupsModelToPOJO = (option: Option, optionModel: OptionModel) => {
    if (optionModel.optionPickupsModel === undefined) {
      return;
    }

    const optionPickupModel = optionModel.optionPickupsModel;

    option.pickupRequired = optionPickupModel.pickupRequired;
    option.pickupAvailable = optionPickupModel.pickupAvailable;
    option.pickupPoints = optionPickupModel.pickupPoints;
  };

  private parsePricingModelToPOJO = (option: Option, optionModel: OptionModel) => {
    if (optionModel.optionPricingModel === undefined) {
      return;
    }

    const { optionPricingModel } = optionModel;

    option.pricingFrom = optionPricingModel.pricingFrom;
    option.pricing = optionPricingModel.pricing;
  };
}
