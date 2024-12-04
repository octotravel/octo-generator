import { DurationUnit, UnitType, Option, OptionContent, OptionPickup, OptionPricing } from '@octocloud/types';
import { UnitDataProvider } from '../../../dataProviders/UnitDataProvider';
import { PricingDataProvider } from '../../../dataProviders/PricingDataProvider';
import { OptionModel } from '../../../models/option/OptionModel';
import { UnitModel } from '../../../models/unit/UnitModel';
import { OptionContentModel } from '../../../models/option/OptionContentModel';
import { OptionPickupsModel } from '../../../models/option/OptionPickupsModel';
import { OptionPricingModel } from '../../../models/option/OptionPricingModel';

export class OptionTestDataProvider {
  public static option: Option = {
    id: 'id',
    default: true,
    internalName: 'internalName',
    reference: null,
    availabilityLocalStartTimes: [],
    cancellationCutoff: 'cancellationCutoff',
    cancellationCutoffAmount: 0,
    cancellationCutoffUnit: 'cancellationCutoffUnit',
    requiredContactFields: [],
    visibleContactFields: [],
    restrictions: {
      minUnits: 0,
      maxUnits: null,
      minPaxCount: 0,
      maxPaxCount: null,
    },
    units: [
      {
        id: 'id',
        internalName: 'internalName',
        reference: 'reference',
        type: UnitType.CHILD,
        restrictions: UnitDataProvider.commonRestrictions,
        requiredContactFields: [],
        visibleContactFields: [],
      },
    ],
  };

  public static optionContent: Required<OptionContent> = {
    title: 'title',
    subtitle: 'subtitle',
    language: 'language',
    shortDescription: 'shortDescription',
    duration: 'duration',
    durationAmount: 'durationAmount',
    durationUnit: DurationUnit.HOUR,
    itinerary: null,
    coverImageUrl: null,
    fromPoint: null,
    toPoint: null,
  };

  public static optionPickups: Required<OptionPickup> = {
    pickupRequired: false,
    pickupAvailable: false,
    pickupPoints: [],
  };

  public static optionPricing: OptionPricing = {
    pricingFrom: [PricingDataProvider.adultPricing],
  };

  public static optionPOJO: Option = {
    ...this.option,
    ...this.optionContent,
    ...this.optionPickups,
    ...this.optionPricing,
  };

  public static optionModel = new OptionModel({
    id: this.optionPOJO.id,
    isDefault: this.optionPOJO.default,
    internalName: this.optionPOJO.internalName,
    reference: this.optionPOJO.reference,
    availabilityLocalStartTimes: this.optionPOJO.availabilityLocalStartTimes,
    cancellationCutoff: this.optionPOJO.cancellationCutoff,
    cancellationCutoffAmount: this.optionPOJO.cancellationCutoffAmount,
    cancellationCutoffUnit: this.optionPOJO.cancellationCutoffUnit,
    requiredContactFields: this.optionPOJO.requiredContactFields,
    visibleContactFields: this.optionPOJO.visibleContactFields,
    restrictions: this.optionPOJO.restrictions,
    unitModels: this.optionPOJO.units.map((unit) => new UnitModel(unit)),
    optionContentModel: new OptionContentModel({
      title: this.optionContent.title,
      subtitle: this.optionContent.subtitle,
      language: this.optionContent.language,
      shortDescription: this.optionContent.shortDescription,
      duration: this.optionContent.duration,
      durationAmount: this.optionContent.durationAmount,
      durationUnit: this.optionContent.durationUnit,
      itinerary: this.optionContent.itinerary,
      coverImageUrl: this.optionContent.coverImageUrl,
      fromPoint: this.optionContent.fromPoint,
      toPoint: this.optionContent.toPoint,
    }),
    optionPickupsModel: new OptionPickupsModel({
      pickupRequired: this.optionPickups.pickupRequired,
      pickupAvailable: this.optionPickups.pickupAvailable,
      pickupPoints: this.optionPickups.pickupPoints,
    }),
    optionPricingModel: new OptionPricingModel({
      pricing: this.optionPricing.pricingFrom,
    }),
  });
}
