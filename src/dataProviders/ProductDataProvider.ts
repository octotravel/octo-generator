import { Currency, DeliveryMethod, PricingPer } from "@octocloud/types";
import { OptionDataProvider } from "./OptionDataProvider";

export class ProductDataProvider {
  public static defaultProduct = {
    id: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
    internalName: "Edinburgh Hop-On Hop-Off Bus Tour",
    deliveryMethods: [DeliveryMethod.TICKET, DeliveryMethod.VOUCHER],
    optionsData: [OptionDataProvider.defaultOption],
    defaultCurrency: Currency.EUR,
    availableCurrencies: [Currency.EUR],
    pricingPer: PricingPer.UNIT,
    questions: [],
  };
}
