import { CapabilityId, Order } from "@octocloud/types";
import BookingParser from "./BookingParser";
import OrderModel from "../models/order/OrderModel";

export default class OrderParser {
  private readonly bookingParser = new BookingParser();

  public parsePOJOToModel = (order: Order): OrderModel =>
    new OrderModel({
      id: order.id,
      testMode: order.testMode,
      supplierReference: order.supplierReference,
      settlementMethod: order.settlementMethod,
      status: order.status,
      utcExpiresAt: order.utcExpiresAt,
      utcConfirmedAt: order.utcConfirmedAt,
      cancellable: order.cancellable,
      bookingModels: order.bookings.map((booking) => this.bookingParser.parsePOJOToModel(booking)),
      contact: order.contact,
      termsAccepted: order.termsAccepted,
      pricing: order.pricing,
      offerCombinations: order.offerCombinations,
      cardPayment: order.cardPayment,
      returnUrl: order.returnUrl,
    });

  public parseModelToPOJO(orderModel: OrderModel): Order {
    return this.parseMainModelToPojo(orderModel);
  }

  public parseModelToPOJOWithSpecificCapabilities(orderModel: OrderModel, capabilities: CapabilityId[]): Order {
    return this.parseMainModelToPojo(orderModel, capabilities);
  }

  private parseMainModelToPojo = (orderModel: OrderModel, capabilities?: CapabilityId[]): Order => {
    const bookings = orderModel.bookingModels.map((bookingModel) => {
      if (capabilities === undefined) {
        return this.bookingParser.parseModelToPOJO(bookingModel);
      }
      return this.bookingParser.parseModelToPOJOWithSpecificCapabilities(bookingModel, capabilities);
    });

    return {
      id: orderModel.id,
      testMode: orderModel.testMode,
      supplierReference: orderModel.supplierReference,
      settlementMethod: orderModel.settlementMethod,
      status: orderModel.status,
      utcExpiresAt: orderModel.utcExpiresAt,
      utcConfirmedAt: orderModel.utcConfirmedAt,
      cancellable: orderModel.cancellable,
      bookings: bookings,
      contact: orderModel.contact,
      termsAccepted: orderModel.termsAccepted,
      pricing: orderModel.pricing,
      offerCombinations: orderModel.offerCombinations,
      cardPayment: orderModel.cardPayment,
      returnUrl: orderModel.returnUrl,
    };
  };
}
