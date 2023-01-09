import { BookingParser } from "../BookingParser";
import { BookingModel } from "../../models/booking/BookingModel";
import { ProductTestDataProvider } from "./dataProviders/ProductTestDataProvider";
import { OptionTestDataProvider } from "./dataProviders/OptionTestDataProvider";
import { Currency, DurationUnit, DeliveryMethod, BookingStatus, CapabilityId } from "@octocloud/types";
import { BookingCartModel } from "../../models/booking/BookingCartModel";
import { BookingContentModel } from "../../models/booking/BookingContentModel";
import { BookingPickupsModel } from "../../models/booking/BookingPickupsModel";
import { BookingPricingModel } from "../../models/booking/BookingPricingModel";

describe("BookingParser", () => {
  const bookingParser = new BookingParser();
  const productPOJO = ProductTestDataProvider.productPOJO;
  const optionPOJO = OptionTestDataProvider.optionPOJO;
  const booking = {
    id: "be9c948c-e170-4de2-8367-053830ce4a40",
    uuid: "45464f1d-e958-4bb4-921f-43afcb71004a",
    testMode: false,
    resellerReference: null,
    supplierReference: null,
    status: BookingStatus.CONFIRMED,
    utcCreatedAt: "2022-11-28T08:43:37Z",
    utcUpdatedAt: null,
    utcExpiresAt: null,
    utcRedeemedAt: null,
    utcConfirmedAt: null,
    productId: productPOJO.id,
    product: productPOJO,
    optionId: optionPOJO.id,
    option: optionPOJO,
    cancellable: true,
    cancellation: null,
    freesale: false,
    availabilityId: "availabilityId",
    availability: {
      id: "availabilityId",
      localDateTimeStart: "2023-01-03T09:15:00+01:00",
      localDateTimeEnd: "2023-01-03T09:39:00+01:00",
      allDay: false,
      openingHours: [],
    },
    contact: {
      fullName: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      locales: [],
      postalCode: null,
      country: null,
      notes: null,
    },
    notes: null,
    deliveryMethods: [DeliveryMethod.TICKET],
    voucher: null,
    unitItems: [],
  };
  const bookingCart = {
    orderId: "orderId",
    orderReference: "orderReference",
    primary: false,
  };
  const bookingContent = {
    meetingPoint: null,
    meetingPointCoordinates: null,
    meetingLocalDateTime: null,
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
  };
  const bookingPickups = {
    pickupRequested: false,
    pickupPointId: null,
    pickupHotel: null,
    pickupHotelRoom: null,
    pickupPoint: null,
  };
  const bookingPricing = {
    pricing: {
      original: 0,
      retail: 0,
      net: null,
      currency: Currency.EUR,
      currencyPrecision: 0,
      includedTaxes: [],
    },
  };
  const bookingPOJO = {
    ...booking,
    ...bookingCart,
    ...bookingContent,
    ...bookingPickups,
    ...bookingPricing,
  };

  const productModel = ProductTestDataProvider.productModel;
  const optionModel = OptionTestDataProvider.optionModel;
  const bookingModel = new BookingModel({
    id: bookingPOJO.id,
    uuid: bookingPOJO.uuid,
    testMode: bookingPOJO.testMode,
    resellerReference: bookingPOJO.resellerReference,
    supplierReference: bookingPOJO.supplierReference,
    status: bookingPOJO.status,
    utcCreatedAt: bookingPOJO.utcCreatedAt,
    utcUpdatedAt: bookingPOJO.utcUpdatedAt,
    utcExpiresAt: bookingPOJO.utcExpiresAt,
    utcRedeemedAt: bookingPOJO.utcRedeemedAt,
    utcConfirmedAt: bookingPOJO.utcConfirmedAt,
    productId: productModel.id,
    productModel: productModel,
    optionId: optionModel.id,
    optionModel: optionModel,
    cancellable: bookingPOJO.cancellable,
    cancellation: bookingPOJO.cancellation,
    freesale: bookingPOJO.freesale,
    availabilityId: bookingPOJO.availabilityId,
    availability: bookingPOJO.availability,
    contact: bookingPOJO.contact,
    notes: bookingPOJO.notes,
    deliveryMethods: bookingPOJO.deliveryMethods,
    voucher: bookingPOJO.voucher,
    unitItemModels: [],
    bookingCartModel: new BookingCartModel({
      orderId: bookingPOJO.orderId,
      orderReference: bookingPOJO.orderReference,
      primary: bookingPOJO.primary,
    }),
    bookingContentModel: new BookingContentModel({
      meetingPoint: bookingPOJO.meetingPoint,
      meetingPointCoordinates: bookingPOJO.meetingPointCoordinates,
      meetingLocalDateTime: bookingPOJO.meetingLocalDateTime,
      duration: bookingPOJO.duration,
      durationAmount: bookingPOJO.durationAmount,
      durationUnit: bookingPOJO.durationUnit,
    }),
    bookingPickupsModel: new BookingPickupsModel({
      pickupRequested: bookingPOJO.pickupRequested,
      pickupPointId: bookingPOJO.pickupPointId,
      pickupHotel: bookingPOJO.pickupHotel,
      pickupHotelRoom: bookingPOJO.pickupHotelRoom,
      pickupPoint: bookingPOJO.pickupPoint,
    }),
    bookingPricingModel: new BookingPricingModel({
      pricing: bookingPOJO.pricing,
    }),
  });

  describe("parsePOJOToModel", () => {
    it("should return unit model", async () => {
      expect(bookingParser.parsePOJOToModel(bookingPOJO)).toStrictEqual(bookingModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return unit POJO", async () => {
      expect(bookingParser.parseModelToPOJO(bookingModel)).toStrictEqual(bookingPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, [])).toStrictEqual(
        expect.objectContaining({
          ...booking,
          ...{
            product: expect.anything(),
            option: expect.anything(),
          },
        })
      );
    });

    describe("parseModelToPOJOWithSpecificCapabilities", () => {
      it("should return unit POJO with cart capability", async () => {
        expect(bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, [CapabilityId.Cart])).toStrictEqual(
          expect.objectContaining({
            ...{
              ...booking,
              ...bookingCart,
            },
            ...{
              product: expect.anything(),
              option: expect.anything(),
            },
          })
        );
      });
    });

    describe("parseModelToPOJOWithSpecificCapabilities", () => {
      it("should return unit POJO with pickups capability", async () => {
        expect(
          bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, [CapabilityId.Content])
        ).toStrictEqual(
          expect.objectContaining({
            ...{
              ...booking,
              ...bookingContent,
            },
            ...{
              product: expect.anything(),
              option: expect.anything(),
            },
          })
        );
      });
    });

    describe("parseModelToPOJOWithSpecificCapabilities", () => {
      it("should return unit POJO with pickups capability", async () => {
        expect(
          bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, [CapabilityId.Pickups])
        ).toStrictEqual(
          expect.objectContaining({
            ...{
              ...booking,
              ...bookingPickups,
            },
            ...{
              product: expect.anything(),
              option: expect.anything(),
            },
          })
        );
      });
    });

    describe("parseModelToPOJOWithSpecificCapabilities", () => {
      it("should return unit POJO with pricing capability", async () => {
        expect(
          bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, [CapabilityId.Pricing])
        ).toStrictEqual(
          expect.objectContaining({
            ...{
              ...booking,
              ...bookingPricing,
            },
            ...{
              product: expect.anything(),
              option: expect.anything(),
            },
          })
        );
      });
    });

    describe("parseModelToPOJOWithSpecificCapabilities", () => {
      it("should return unit POJO with all capabilities", async () => {
        expect(
          bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, [
            CapabilityId.Cart,
            CapabilityId.Content,
            CapabilityId.Pickups,
            CapabilityId.Pricing,
          ])
        ).toStrictEqual(bookingPOJO);
      });
    });
  });
});
