import { CapabilityId, OrderStatus } from "@octocloud/types";
import BookingModelBuilder from "./BookingModelBuilder";
import { PartialOrder } from "../types/PartialOrder";
import OrderModel from "../models/order/OrderModel";
import DateFormatter from "../common/DateFormatter";
import BookingModel from "../models/booking/BookingModel";

interface OrderModelBuilderData {
  orderData: PartialOrder;
  capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [];

export default class OrderModelBuilder {
  private readonly bookingModelBuilder = new BookingModelBuilder();

  public build(builderData: OrderModelBuilderData): OrderModel {
    builderData.capabilities ??= defaultCapabilities;

    const { orderData } = builderData;

    return new OrderModel({
      id: orderData.id ?? "orderId",
      testMode: orderData.testMode ?? false,
      supplierReference: orderData.supplierReference ?? "supplierReference",
      settlementMethod: orderData.settlementMethod ?? "settlementMethod",
      status: orderData.status ?? OrderStatus.ON_HOLD,
      utcExpiresAt: orderData.utcExpiresAt ?? DateFormatter.formatToUtcDate(new Date()),
      utcConfirmedAt: orderData.utcConfirmedAt ?? null,
      cancellable: orderData.cancellable ?? true,
      bookingModels: this.buildBookingModels(builderData),
      contact: orderData.contact ?? {
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
      termsAccepted: orderData.termsAccepted,
      pricing: orderData.pricing,
      offerCombinations: orderData.offerCombinations,
      cardPayment: orderData.cardPayment,
      returnUrl: orderData.returnUrl,
    });
  }

  private buildBookingModels(builderData: OrderModelBuilderData): BookingModel[] {
    if (builderData.orderData.bookings === undefined) {
      return [];
    }

    return builderData.orderData.bookings.map(
      (bookingData) =>
        this.bookingModelBuilder.build({
          bookingData: bookingData,
          capabilities: builderData.capabilities,
        }),
      builderData
    );
  }
}
