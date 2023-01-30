import { OrderStatus } from "@octocloud/types";
import OrderParser from "../OrderParser";
import OrderModel from "../../models/order/OrderModel";
import BookingTestDataProvider from "./dataProviders/BookingTestDataProvider";

describe("OrderParser", () => {
  const orderParser = new OrderParser();

  const orderPOJO = {
    id: "orderId",
    testMode: true,
    supplierReference: "supplierReference",
    settlementMethod: "settlementMethod",
    status: OrderStatus.CONFIRMED,
    utcExpiresAt: "2023-01-03T00:00:00+01:00",
    utcConfirmedAt: "2023-02-03T00:00:00+01:00",
    cancellable: true,
    bookings: [BookingTestDataProvider.booking],
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
    termsAccepted: undefined,
    pricing: undefined,
    offerCombinations: undefined,
    cardPayment: undefined,
    returnUrl: undefined,
  };

  const orderModel = new OrderModel({
    id: orderPOJO.id,
    testMode: orderPOJO.testMode,
    supplierReference: orderPOJO.supplierReference,
    settlementMethod: orderPOJO.settlementMethod,
    status: orderPOJO.status,
    utcExpiresAt: orderPOJO.utcExpiresAt,
    utcConfirmedAt: orderPOJO.utcConfirmedAt,
    cancellable: orderPOJO.cancellable,
    bookingModels: [BookingTestDataProvider.bookingModel],
    contact: orderPOJO.contact,
    termsAccepted: orderPOJO.termsAccepted,
    pricing: orderPOJO.pricing,
    offerCombinations: orderPOJO.offerCombinations,
    cardPayment: orderPOJO.cardPayment,
    returnUrl: orderPOJO.returnUrl,
  });

  describe("parsePOJOToModel", () => {
    it("should return order model", async () => {
      expect(orderParser.parsePOJOToModel(orderPOJO)).toStrictEqual(orderModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return order POJO", async () => {
      expect(orderParser.parseModelToPOJO(orderModel)).toStrictEqual(orderPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(orderParser.parseModelToPOJOWithSpecificCapabilities(orderModel, [])).toStrictEqual(orderPOJO);
    });
  });
});
