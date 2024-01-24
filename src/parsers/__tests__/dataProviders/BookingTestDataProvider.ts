import { AvailabilityStatus, Booking, BookingStatus, Currency, DeliveryMethod, DurationUnit } from '@octocloud/types';
import { OptionTestDataProvider } from './OptionTestDataProvider';
import { ProductTestDataProvider } from './ProductTestDataProvider';
import { BookingCartModel } from '../../../models/booking/BookingCartModel';
import { BookingContentModel } from '../../../models/booking/BookingContentModel';
import { BookingModel } from '../../../models/booking/BookingModel';
import { BookingPickupsModel } from '../../../models/booking/BookingPickupsModel';
import { BookingPricingModel } from '../../../models/booking/BookingPricingModel';

export class BookingTestDataProvider {
  public static booking: Booking = {
    id: 'be9c948c-e170-4de2-8367-053830ce4a40',
    uuid: '45464f1d-e958-4bb4-921f-43afcb71004a',
    testMode: false,
    resellerReference: null,
    supplierReference: null,
    status: BookingStatus.CONFIRMED,
    utcCreatedAt: '2022-11-28T08:43:37Z',
    utcUpdatedAt: null,
    utcExpiresAt: null,
    utcRedeemedAt: null,
    utcConfirmedAt: null,
    productId: ProductTestDataProvider.productPOJO.id,
    product: ProductTestDataProvider.productPOJO,
    optionId: OptionTestDataProvider.optionPOJO.id,
    option: OptionTestDataProvider.optionPOJO,
    cancellable: true,
    cancellation: null,
    freesale: false,
    availabilityId: 'availabilityId',
    availability: {
      id: 'availabilityId',
      localDateTimeStart: '2023-01-03T09:15:00+01:00',
      localDateTimeEnd: '2023-01-03T09:39:00+01:00',
      allDay: false,
      available: true,
      status: AvailabilityStatus.AVAILABLE,
      vacancies: null,
      capacity: null,
      maxUnits: null,
      utcCutoffAt: '18:00',
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

  public static bookingCart = {
    orderId: 'orderId',
    orderReference: 'orderReference',
    primary: false,
  };

  public static bookingContent = {
    meetingPoint: null,
    meetingPointCoordinates: null,
    meetingLocalDateTime: null,
    duration: 'duration',
    durationAmount: 'durationAmount',
    durationUnit: DurationUnit.HOUR,
    termsAccepted: true,
    notices: [],
  };

  public static bookingPickups = {
    pickupRequested: false,
    pickupPointId: null,
    pickupHotel: null,
    pickupHotelRoom: null,
    pickupPoint: null,
  };

  public static bookingPricing = {
    pricing: {
      original: 0,
      retail: 0,
      net: null,
      currency: Currency.EUR,
      currencyPrecision: 0,
      includedTaxes: [],
    },
  };

  public static bookingPOJO = {
    ...this.booking,
    ...this.bookingCart,
    ...this.bookingContent,
    ...this.bookingPickups,
    ...this.bookingPricing,
  };

  public static bookingModel = new BookingModel({
    id: this.bookingPOJO.id,
    uuid: this.bookingPOJO.uuid,
    testMode: this.bookingPOJO.testMode,
    resellerReference: this.bookingPOJO.resellerReference,
    supplierReference: this.bookingPOJO.supplierReference,
    status: this.bookingPOJO.status,
    utcCreatedAt: this.bookingPOJO.utcCreatedAt,
    utcUpdatedAt: this.bookingPOJO.utcUpdatedAt,
    utcExpiresAt: this.bookingPOJO.utcExpiresAt,
    utcRedeemedAt: this.bookingPOJO.utcRedeemedAt,
    utcConfirmedAt: this.bookingPOJO.utcConfirmedAt,
    productModel: ProductTestDataProvider.productModel,
    optionModel: OptionTestDataProvider.optionModel,
    cancellable: this.bookingPOJO.cancellable,
    cancellation: this.bookingPOJO.cancellation,
    freesale: this.bookingPOJO.freesale,
    availability: this.bookingPOJO.availability,
    contact: this.bookingPOJO.contact,
    notes: this.bookingPOJO.notes,
    deliveryMethods: this.bookingPOJO.deliveryMethods,
    voucher: this.bookingPOJO.voucher,
    unitItemModels: [],
    bookingCartModel: new BookingCartModel({
      orderId: this.bookingPOJO.orderId,
      orderReference: this.bookingPOJO.orderReference,
      primary: this.bookingPOJO.primary,
    }),
    bookingContentModel: new BookingContentModel({
      meetingPoint: this.bookingPOJO.meetingPoint,
      meetingPointCoordinates: this.bookingPOJO.meetingPointCoordinates,
      meetingLocalDateTime: this.bookingPOJO.meetingLocalDateTime,
      duration: this.bookingPOJO.duration,
      durationAmount: this.bookingPOJO.durationAmount,
      durationUnit: this.bookingPOJO.durationUnit,
      termsAccepted: this.bookingPOJO.termsAccepted,
      notices: this.bookingPOJO.notices,
    }),
    bookingPickupsModel: new BookingPickupsModel({
      pickupRequested: this.bookingPOJO.pickupRequested,
      pickupPointId: this.bookingPOJO.pickupPointId,
      pickupHotel: this.bookingPOJO.pickupHotel,
      pickupHotelRoom: this.bookingPOJO.pickupHotelRoom,
      pickupPoint: this.bookingPOJO.pickupPoint,
    }),
    bookingPricingModel: new BookingPricingModel({
      pricing: this.bookingPOJO.pricing,
    }),
  });
}
