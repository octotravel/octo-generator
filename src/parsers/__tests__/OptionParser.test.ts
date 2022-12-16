import { DurationUnit, UnitType } from "@octocloud/types";
import { UnitModel } from "../../models/Unit/UnitModel";
import { OptionParser } from "../OptionParser";
import { OptionModel } from "../../models/Option/OptionModel";
import { UnitDataProvider } from "../../dataProviders/UnitDataProvider";
import { OptionContentModel } from "../../models/Option/OptionContentModel";
import { OptionPricingModel } from "../../models/Option/OptionPricingModel";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { OptionPickupModel } from "../../models/Option/OptionPickupModel";

describe("OptionParser", () => {
  const optionParser = new OptionParser();

  const option = {
    id: "id",
    default: true,
    internalName: "internalName",
    reference: null,
    availabilityLocalStartTimes: [],
    cancellationCutoff: "cancellationCutoff",
    cancellationCutoffAmount: 0,
    cancellationCutoffUnit: "cancellationCutoffUnit",
    requiredContactFields: [],
    restrictions: {
      minUnits: 0,
      maxUnits: null,
    },
    units: [
      {
        id: "id",
        internalName: "internalName",
        reference: "reference",
        type: UnitType.CHILD,
        restrictions: UnitDataProvider.commonRestrictions,
        requiredContactFields: [],
      },
    ],
    title: "title",
    subtitle: "subtitle",
    language: "language",
    shortDescription: "shortDescription",
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
    itinerary: null,
    pickupRequired: false,
    pickupAvailable: false,
    pickupPoints: [],
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };

  const optionModel = new OptionModel({
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
    unitModels: option.units.map((unit) => new UnitModel(unit)),
    optionContentModel: new OptionContentModel({
      title: option.title,
      subtitle: option.subtitle,
      language: option.language,
      shortDescription: option.shortDescription,
      duration: option.duration,
      durationAmount: option.durationAmount,
      durationUnit: option.durationUnit,
      itinerary: option.itinerary,
    }),
    optionPickupModel: new OptionPickupModel({
      pickupRequired: option.pickupRequired,
      pickupAvailable: option.pickupAvailable,
      pickupPoints: option.pickupPoints,
    }),
    optionPricingModel: new OptionPricingModel({
      pricing: option.pricing,
      pricingFrom: option.pricingFrom,
    }),
  });

  describe("parseModelToPOJO", () => {
    it("should return option POJO", async () => {
      expect(optionParser.parseModelToPOJO(optionModel)).toStrictEqual(option);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return option model", async () => {
      expect(optionParser.parsePOJOToModel(option)).toStrictEqual(optionModel);
    });
  });
});
