import { BookingParser } from "../BookingParser";
import { BookingModel } from "../../models/booking/BookingModel";
import { ProductTestDataProvider } from "./dataProviders/ProductTestDataProvider";
import { OptionTestDataProvider } from "./dataProviders/OptionTestDataProvider";
import { Currency, DurationUnit, DeliveryMethod, BookingStatus } from "@octocloud/types";
import { BookingCartModel } from "../../models/booking/BookingCartModel";
import { BookingContentModel } from "../../models/booking/BookingContentModel";
import { BookingPickupModel } from "../../models/booking/BookingPickupModel";
import { BookingPricingModel } from "../../models/booking/BookingPricingModel";

describe("UnitParser", () => {
  const bookingParser = new BookingParser();
  const product = ProductTestDataProvider.product;
  const option = OptionTestDataProvider.option;
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
    productId: product.id,
    product: product,
    optionId: option.id,
    option: option,
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
    orderId: "orderId",
    orderReference: "orderReference",
    primary: false,
    meetingPoint: null,
    meetingPointCoordinates: null,
    meetingLocalDateTime: null,
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
    pickupRequested: false,
    pickupPointId: null,
    pickupHotel: null,
    pickupHotelRoom: null,
    pickupPoint: null,
    pricing: {
      original: 0,
      retail: 0,
      net: null,
      currency: Currency.EUR,
      currencyPrecision: 0,
      includedTaxes: [],
    },
  };

  const productModel = ProductTestDataProvider.productModel;
  const optionModel = OptionTestDataProvider.optionModel;
  const bookingModel = new BookingModel({
    id: booking.id,
    uuid: booking.uuid,
    testMode: booking.testMode,
    resellerReference: booking.resellerReference,
    supplierReference: booking.supplierReference,
    status: booking.status,
    utcCreatedAt: booking.utcCreatedAt,
    utcUpdatedAt: booking.utcUpdatedAt,
    utcExpiresAt: booking.utcExpiresAt,
    utcRedeemedAt: booking.utcRedeemedAt,
    utcConfirmedAt: booking.utcConfirmedAt,
    productId: productModel.id,
    productModel: productModel,
    optionId: optionModel.id,
    optionModel: optionModel,
    cancellable: booking.cancellable,
    cancellation: booking.cancellation,
    freesale: booking.freesale,
    availabilityId: booking.availabilityId,
    availability: booking.availability,
    contact: booking.contact,
    notes: booking.notes,
    deliveryMethods: booking.deliveryMethods,
    voucher: booking.voucher,
    unitItems: booking.unitItems,
    bookingCartModel: new BookingCartModel({
      orderId: booking.orderId,
      orderReference: booking.orderReference,
      primary: booking.primary,
    }),
    bookingContentModel: new BookingContentModel({
      meetingPoint: booking.meetingPoint,
      meetingPointCoordinates: booking.meetingPointCoordinates,
      meetingLocalDateTime: booking.meetingLocalDateTime,
      duration: booking.duration,
      durationAmount: booking.durationAmount,
      durationUnit: booking.durationUnit,
    }),
    bookingPickupModel: new BookingPickupModel({
      pickupRequested: booking.pickupRequested,
      pickupPointId: booking.pickupPointId,
      pickupHotel: booking.pickupHotel,
      pickupHotelRoom: booking.pickupHotelRoom,
      pickupPoint: booking.pickupPoint,
    }),
    bookingPricingModel: new BookingPricingModel({
      pricing: booking.pricing,
    }),
  });

  describe("parseModelToPOJO", () => {
    it("should return unit POJO", async () => {
      expect(bookingParser.parseModelToPOJO(bookingModel)).toStrictEqual(booking);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return unit model", async () => {
      expect(bookingParser.parsePOJOToModel(booking)).toStrictEqual(bookingModel);
    });
  });
});
