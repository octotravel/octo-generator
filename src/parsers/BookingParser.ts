import { Booking, CapabilityId } from "@octocloud/types";
import { BookingModel } from "../models/booking/BookingModel";
import { ProductParser } from "./ProductParser";
import { OptionParser } from "./OptionParser";
import { BookingCartModel } from "../models/booking/BookingCartModel";
import { BookingContentModel } from "../models/booking/BookingContentModel";
import { BookingPickupsModel } from "../models/booking/BookingPickupsModel";
import { BookingPricingModel } from "../models/booking/BookingPricingModel";
import { UnitItemParser } from "./UnitItemParser";
import { OfferParser } from "./OfferParser";
import { BookingOffersModel } from "../models/booking/BookingOffersModel";

export class BookingParser {
  private readonly productParser = new ProductParser();

  private readonly offerParser = new OfferParser();

  private readonly optionParser = new OptionParser();

  private readonly unitItemParser = new UnitItemParser();

  public parsePOJOToModel = (booking: Booking): BookingModel =>
    new BookingModel({
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
      productModel: this.productParser.parsePOJOToModel(booking.product),
      optionModel: this.optionParser.parsePOJOToModel(booking.option),
      cancellable: booking.cancellable,
      cancellation: booking.cancellation,
      freesale: booking.freesale,
      availability: booking.availability,
      contact: booking.contact,
      notes: booking.notes,
      deliveryMethods: booking.deliveryMethods,
      voucher: booking.voucher,
      unitItemModels: booking.unitItems.map((unitItem) => this.unitItemParser.parsePOJOToModel(unitItem)),
      bookingCartModel: this.parseCartPOJOToModel(booking),
      bookingContentModel: this.parseContentPOJOToModel(booking),
      bookingOffersModel: this.parseOffersPOJOToModel(booking),
      bookingPickupsModel: this.parsePickupsPOJOToModel(booking),
      bookingPricingModel: this.parsePricingPOJOToModel(booking),
    });

  private parseCartPOJOToModel = (booking: Booking): BookingCartModel | undefined => {
    if (booking.orderId === undefined || booking.orderReference === undefined || booking.primary === undefined) {
      return undefined;
    }

    return new BookingCartModel({
      orderId: booking.orderId,
      orderReference: booking.orderReference,
      primary: booking.primary,
    });
  };

  private parseContentPOJOToModel = (booking: Booking): BookingContentModel | undefined => {
    if (
      booking.meetingPoint === undefined ||
      booking.meetingPointCoordinates === undefined ||
      booking.meetingLocalDateTime === undefined ||
      booking.duration === undefined ||
      booking.durationAmount === undefined ||
      booking.durationUnit === undefined
    ) {
      return undefined;
    }

    return new BookingContentModel({
      meetingPoint: booking.meetingPoint,
      meetingPointCoordinates: booking.meetingPointCoordinates,
      meetingLocalDateTime: booking.meetingLocalDateTime,
      duration: booking.duration,
      durationAmount: booking.durationAmount,
      durationUnit: booking.durationUnit,
    });
  };

  private parseOffersPOJOToModel = (booking: Booking): BookingOffersModel | undefined => {
    if (
      booking.offerCode === undefined ||
      booking.offerTitle === undefined ||
      booking.offerComparisons === undefined ||
      booking.offerIsCombination === undefined ||
      booking.offers === undefined ||
      booking.offer === undefined
    ) {
      return undefined;
    }

    return new BookingOffersModel({
      offerCode: booking.offerCode,
      offerTitle: booking.offerTitle,
      offerComparisons: booking.offerComparisons,
      offerIsCombination: booking.offerIsCombination,
      offerModels: booking.offers.map((offer) => this.offerParser.parsePOJOToModel(offer)),
      offerModel: this.offerParser.parsePOJOToModel(booking.offer),
    });
  };

  private parsePickupsPOJOToModel = (booking: Booking): BookingPickupsModel | undefined => {
    if (
      booking.pickupRequested === undefined ||
      booking.pickupPointId === undefined ||
      booking.pickupHotel === undefined ||
      booking.pickupHotelRoom === undefined ||
      booking.pickupPoint === undefined
    ) {
      return undefined;
    }

    return new BookingPickupsModel({
      pickupRequested: booking.pickupRequested,
      pickupPointId: booking.pickupPointId,
      pickupHotel: booking.pickupHotel,
      pickupHotelRoom: booking.pickupHotelRoom,
      pickupPoint: booking.pickupPoint,
    });
  };

  private parsePricingPOJOToModel = (booking: Booking): BookingPricingModel | undefined => {
    if (booking.pricing === undefined) {
      return undefined;
    }

    return new BookingPricingModel({
      pricing: booking.pricing,
    });
  };

  public parseModelToPOJO = (bookingModel: BookingModel): Booking => {
    const booking = this.parseMainModelToPojo(bookingModel);

    this.parseCartModelToPOJO(booking, bookingModel);
    this.parseContentModelToPOJO(booking, bookingModel);
    this.parseOffersModelToPOJO(booking, bookingModel);
    this.parsePickupsModelToPOJO(booking, bookingModel);
    this.parsePricingModelToPOJO(booking, bookingModel);

    return booking;
  };

  public parseModelToPOJOWithSpecificCapabilities = (
    bookingModel: BookingModel,
    capabilities: CapabilityId[]
  ): Booking => {
    const booking = this.parseMainModelToPojo(bookingModel, capabilities);

    if (capabilities.includes(CapabilityId.Cart)) {
      this.parseCartModelToPOJO(booking, bookingModel);
    }

    if (capabilities.includes(CapabilityId.Content)) {
      this.parseContentModelToPOJO(booking, bookingModel);
    }

    if (capabilities.includes(CapabilityId.Offers)) {
      this.parseOffersModelToPOJO(booking, bookingModel);
    }

    if (capabilities.includes(CapabilityId.Pickups)) {
      this.parsePickupsModelToPOJO(booking, bookingModel);
    }

    if (capabilities.includes(CapabilityId.Pricing)) {
      this.parsePricingModelToPOJO(booking, bookingModel);
    }

    return booking;
  };

  private parseMainModelToPojo = (bookingModel: BookingModel, capabilities?: CapabilityId[]): Booking => {
    let product;
    let option;

    if (capabilities === undefined) {
      product = this.productParser.parseModelToPOJO(bookingModel.productModel);
      option = this.optionParser.parseModelToPOJO(bookingModel.optionModel);
    } else {
      product = this.productParser.parseModelToPOJOWithSpecificCapabilities(bookingModel.productModel, capabilities);
      option = this.optionParser.parseModelToPOJOWithSpecificCapabilities(bookingModel.optionModel, capabilities);
    }

    const unitItems = bookingModel.unitItemModels.map((unitItemModel) => {
      if (capabilities === undefined) {
        return this.unitItemParser.parseModelToPOJO(unitItemModel);
      }
      return this.unitItemParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel, capabilities);
    });

    return {
      id: bookingModel.id,
      uuid: bookingModel.uuid,
      testMode: bookingModel.testMode,
      resellerReference: bookingModel.resellerReference,
      supplierReference: bookingModel.supplierReference,
      status: bookingModel.status,
      utcCreatedAt: bookingModel.utcCreatedAt,
      utcUpdatedAt: bookingModel.utcUpdatedAt,
      utcExpiresAt: bookingModel.utcExpiresAt,
      utcRedeemedAt: bookingModel.utcRedeemedAt,
      utcConfirmedAt: bookingModel.utcConfirmedAt,
      productId: bookingModel.productModel.id,
      product,
      optionId: bookingModel.optionModel.id,
      option,
      cancellable: bookingModel.cancellable,
      cancellation: bookingModel.cancellation,
      freesale: bookingModel.freesale,
      availabilityId: bookingModel.availability.id,
      availability: bookingModel.availability,
      contact: bookingModel.contact,
      notes: bookingModel.notes,
      deliveryMethods: bookingModel.deliveryMethods,
      voucher: bookingModel.voucher,
      unitItems,
    };
  };

  private parseCartModelToPOJO = (booking: Booking, bookingModel: BookingModel) => {
    if (bookingModel.bookingCartModel === undefined) {
      return;
    }

    const { bookingCartModel } = bookingModel;

    booking.orderId = bookingCartModel.orderId;
    booking.orderReference = bookingCartModel.orderReference;
    booking.primary = bookingCartModel.primary;
  };

  private parseContentModelToPOJO = (booking: Booking, bookingModel: BookingModel) => {
    if (bookingModel.bookingContentModel === undefined) {
      return;
    }

    const { bookingContentModel } = bookingModel;

    booking.meetingPoint = bookingContentModel.meetingPoint;
    booking.meetingPointCoordinates = bookingContentModel.meetingPointCoordinates;
    booking.meetingLocalDateTime = bookingContentModel.meetingLocalDateTime;
    booking.duration = bookingContentModel.duration;
    booking.durationAmount = bookingContentModel.durationAmount;
    booking.durationUnit = bookingContentModel.durationUnit;
  };

  private parseOffersModelToPOJO = (booking: Booking, bookingModel: BookingModel) => {
    if (bookingModel.bookingOffersModel === undefined) {
      return;
    }

    const { bookingOffersModel } = bookingModel;

    booking.offerCode = bookingOffersModel.offerCode;
    booking.offerTitle = bookingOffersModel.offerTitle;
    booking.offerComparisons = bookingOffersModel.offerComparisons;
    booking.offerIsCombination = bookingOffersModel.offerIsCombination;
    booking.offers = bookingOffersModel.offerModels.map((offerModel) => this.offerParser.parseModelToPOJO(offerModel));
    booking.offer = this.offerParser.parseModelToPOJO(bookingOffersModel.offerModel);
  };

  private parsePickupsModelToPOJO = (booking: Booking, bookingModel: BookingModel) => {
    if (bookingModel.bookingPickupsModel === undefined) {
      return;
    }

    const { bookingPickupsModel } = bookingModel;

    booking.pickupRequested = bookingPickupsModel.pickupRequested;
    booking.pickupPointId = bookingPickupsModel.pickupPointId;
    booking.pickupHotel = bookingPickupsModel.pickupHotel;
    booking.pickupHotelRoom = bookingPickupsModel.pickupHotelRoom;
    booking.pickupHotelRoom = bookingPickupsModel.pickupHotelRoom;
    booking.pickupPoint = bookingPickupsModel.pickupPoint;
  };

  private parsePricingModelToPOJO = (booking: Booking, bookingModel: BookingModel) => {
    if (bookingModel.bookingPricingModel === undefined) {
      return;
    }

    booking.pricing = bookingModel.bookingPricingModel.pricing;
  };
}
