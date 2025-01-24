import { CapabilityId, BookingStatus, UnitItem, UnitItemPricing } from '@octocloud/types';
import { UnitItemParser } from '../UnitItemParser';
import { UnitTestDataProvider } from './dataProviders/UnitTestDataProvider';
import { UnitItemModel } from '../../models/unitItem/UnitItemModel';
import { UnitItemPricingModel } from '../../models/unitItem/UnitItemPricingModel';

describe('UnitItemParser', () => {
  const unitItemParser = new UnitItemParser();
  const { unitPOJOonBooking } = UnitTestDataProvider;
  const { unitModel } = UnitTestDataProvider;
  const unitItem: UnitItem = {
    uuid: '10ea9ebd-a4f2-419e-808d-b0e111137a96',
    id: '',
    resellerReference: null,
    supplierReference: null,
    unitId: unitPOJOonBooking.id,
    unit: unitPOJOonBooking,
    status: BookingStatus.CANCELLED,
    utcRedeemedAt: null,
    contact: {
      fullName: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      locales: [],
      country: null,
      notes: null,
      postalCode: null,
    },
    ticket: null,
  };
  const unitItemPricing: Required<UnitItemPricing> = {
    pricing: unitPOJOonBooking.pricing![0],
  };
  const unitItemPOJO = {
    ...unitItem,
    ...unitItemPricing,
  } as Required<UnitItem>;

  const unitItemModel = new UnitItemModel({
    uuid: unitItemPOJO.uuid,
    id: unitItemPOJO.id,
    resellerReference: unitItemPOJO.resellerReference,
    supplierReference: unitItemPOJO.supplierReference,
    unitModel,
    status: unitItemPOJO.status,
    utcRedeemedAt: unitItemPOJO.utcRedeemedAt,
    contact: unitItemPOJO.contact,
    ticket: unitItemPOJO.ticket,
    unitItemPricingModel: new UnitItemPricingModel({
      pricing: unitItemPOJO.pricing,
    }),
  });

  describe('parsePOJOToModel', () => {
    it('should return unit item model', async () => {
      expect(unitItemParser.parsePOJOToModel(unitItemPOJO)).toStrictEqual(unitItemModel);
    });
  });

  describe('parseModelToPOJO', () => {
    it('should return unit item POJO', async () => {
      expect(unitItemParser.parseModelToPOJO(unitItemModel)).toStrictEqual(unitItemPOJO);
    });
  });

  describe('parseModelToPOJOWithPricingCapatibility', () => {
    it('should return unit item POJO without pricing capability', async () => {
      expect(unitItemParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel, [])).toStrictEqual(
        expect.objectContaining({
          ...unitItem,
          ...{
            unit: expect.anything(),
          },
        }),
      );
    });
  });

  describe('parseModelToPOJOWithSpecificCapabilities', () => {
    it('should return unit POJO with pricing capability', async () => {
      expect(
        unitItemParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel, [CapabilityId.Pricing]),
      ).toStrictEqual(
        expect.objectContaining({
          ...{
            ...unitItem,
            ...unitItemPricing,
          },
          ...{
            unit: expect.anything(),
          },
        }),
      );
    });
  });
});
