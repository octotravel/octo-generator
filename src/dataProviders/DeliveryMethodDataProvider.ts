import { DeliveryMethod } from "@octocloud/types";

export default class DeliveryMethodsDataProvider {
  public static defaultDeliveryMethods = [DeliveryMethod.TICKET, DeliveryMethod.VOUCHER];
}
