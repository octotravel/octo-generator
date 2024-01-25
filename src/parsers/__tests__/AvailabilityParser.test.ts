import {
  Availability,
  AvailabilityStatus,
  CapabilityId,
  AvailabilityContent,
  AvailabilityOffers,
  AvailabilityPickup,
  AvailabilityPricing,
  AvailabilityResources,
} from '@octocloud/types';
import { AvailabilityParser } from '../AvailabilityParser';
import { AvailabilityModel } from '../../models/availability/AvailabilityModel';
import { AvailabilityContentModel } from '../../models/availability/AvailabilityContentModel';
import { AvailabilityPricingModel } from '../../models/availability/AvailabilityPricingModel';
import { AvailabilityPickupsModel } from '../../models/availability/AvailabilityPickupsModel';
import { PricingDataProvider } from '../../dataProviders/PricingDataProvider';
import { OfferTestDataProvider } from './dataProviders/OfferTestDataProvider';
import { AvailabilityOffersModel } from '../../models/availability/AvailabilityOffersModel';
import { AvailabilityResourcesModel } from '../../models/availability/AvailabilityResourcesModel';

describe('AvailabilityParser', () => {
  const availabilityParser = new AvailabilityParser();
  const { offerPOJO } = OfferTestDataProvider;
  const availability: Availability = {
    id: '2023-12-01T00:00:00+01:00',
    localDateTimeStart: '2023-12-01T00:00:00+01:00',
    localDateTimeEnd: '2023-12-01T00:00:00+01:00',
    allDay: true,
    available: false,
    status: AvailabilityStatus.SOLD_OUT,
    vacancies: 0,
    capacity: 0,
    maxUnits: 0,
    utcCutoffAt: '2023-11-30T23:00:00Z',
    openingHours: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  };
  const availabilityContent: Required<AvailabilityContent> = {
    meetingPoint: null,
    meetingPointCoordinates: null,
    meetingPointLatitude: null,
    meetingPointLongitude: null,
    meetingLocalDateTime: null,
    tourGroup: null,
    notices: [],
  };
  const availabilityOffers: Required<AvailabilityOffers> = {
    offerCode: 'offerCode',
    offerTitle: 'offerTitle',
    offers: [],
    offer: offerPOJO,
  };
  const availabilityPickups: Required<AvailabilityPickup> = {
    pickupAvailable: false,
    pickupRequired: false,
    pickupPoints: [],
  };
  const availabilityPricing: Required<AvailabilityPricing> = {
    unitPricing: [PricingDataProvider.unitPricing],
    pricing: PricingDataProvider.adultPricing,
  };
  const availabilityResources: Required<AvailabilityResources> = {
    hasResources: false,
  };
  const availabilityPOJO: Required<Availability> = {
    ...availability,
    ...availabilityContent,
    ...availabilityOffers,
    ...availabilityPickups,
    ...availabilityPricing,
    ...availabilityResources,
  };
  const { offerModel } = OfferTestDataProvider;
  const availabilityModel = new AvailabilityModel({
    id: availabilityPOJO.id,
    localDateTimeStart: availabilityPOJO.localDateTimeStart,
    localDateTimeEnd: availabilityPOJO.localDateTimeEnd,
    allDay: availabilityPOJO.allDay,
    available: availabilityPOJO.available,
    status: availabilityPOJO.status,
    vacancies: availabilityPOJO.vacancies,
    capacity: availabilityPOJO.capacity,
    maxUnits: availabilityPOJO.maxUnits,
    utcCutoffAt: availabilityPOJO.utcCutoffAt,
    openingHours: availabilityPOJO.openingHours,
    availabilityContentModel: new AvailabilityContentModel({
      meetingPoint: availabilityPOJO.meetingPoint,
      meetingPointCoordinates: availabilityPOJO.meetingPointCoordinates,
      meetingPointLatitude: availabilityPOJO.meetingPointLatitude,
      meetingPointLongitude: availabilityPOJO.meetingPointLongitude,
      meetingLocalDateTime: availabilityPOJO.meetingLocalDateTime,
      tourGroup: availabilityPOJO.tourGroup,
      notices: availabilityPOJO.notices,
    }),
    availabilityOffersModel: new AvailabilityOffersModel({
      offerCode: availabilityOffers.offerCode,
      offerTitle: availabilityOffers.offerTitle,
      offerModels: [],
      offerModel,
    }),
    availabilityPricingModel: new AvailabilityPricingModel({
      unitPricing: availabilityPOJO.unitPricing,
      pricing: availabilityPOJO.pricing,
    }),
    availabilityResourcesModel: new AvailabilityResourcesModel({
      hasResources: availabilityPOJO.hasResources,
    }),
    availabilityPickupsModel: new AvailabilityPickupsModel({
      pickupAvailable: availabilityPOJO.pickupAvailable,
      pickupRequired: availabilityPOJO.pickupRequired,
      pickupPoints: availabilityPOJO.pickupPoints,
    }),
  });

  describe('parsePOJOToModel', () => {
    it('should return availability model', async () => {
      expect(availabilityParser.parsePOJOToModel(availabilityPOJO)).toStrictEqual(availabilityModel);
    });
  });

  describe('parseModelToPOJO', () => {
    it('should return availability POJO', async () => {
      expect(availabilityParser.parseModelToPOJO(availabilityModel)).toStrictEqual(availabilityPOJO);
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO without any capabilities', async () => {
      expect(availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [])).toStrictEqual(
        availability,
      );
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with content capability', async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Content]),
      ).toStrictEqual({
        ...availability,
        ...availabilityContent,
      });
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with offers capability', async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Offers]),
      ).toStrictEqual({
        ...availability,
        ...availabilityOffers,
      });
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with pickups capability', async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Pickups]),
      ).toStrictEqual({
        ...availability,
        ...availabilityPickups,
      });
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with pricing capability', async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Pricing]),
      ).toStrictEqual({
        ...availability,
        ...availabilityPricing,
      });
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with resources capability', async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Resources]),
      ).toStrictEqual({
        ...availability,
        ...availabilityResources,
      });
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with all capabilities', async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [
          CapabilityId.Content,
          CapabilityId.Offers,
          CapabilityId.Pickups,
          CapabilityId.Pricing,
          CapabilityId.Resources,
        ]),
      ).toStrictEqual(availabilityPOJO);
    });
  });
});
