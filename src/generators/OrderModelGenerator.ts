import { CapabilityId } from "@octocloud/types";
import { PartialOrder } from "../types/PartialOrder";
import OrderModelBuilder from "../builders/OrderModelBuilder";
import OrderModel from "../models/order/OrderModel";

interface OrderGenerateData {
  orderData: PartialOrder;
  capabilities?: CapabilityId[];
}

export default class OrderModelGenerator {
  private readonly orderModelBuilder = new OrderModelBuilder();

  public generateOrder = (orderGenerateData: OrderGenerateData): OrderModel =>
    this.orderModelBuilder.build({
      orderData: orderGenerateData.orderData,
      capabilities: orderGenerateData.capabilities,
    });

  public generateMultipleOptions = (ordersData: PartialOrder[], capabilities?: CapabilityId[]): OrderModel[] =>
    ordersData.map((orderData) => this.generateOrder({ orderData, capabilities }));
}
