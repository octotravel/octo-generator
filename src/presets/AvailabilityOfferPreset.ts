import { AvailabilityOffers } from "@octocloud/types";
import { AvailabilityOffersModel } from "../models/availability/AvailabilityOffersModel";
import { OfferPreset } from "./OfferPreset";
import { AvailabilityParser } from "../parsers/AvailabilityParser";

export abstract class AvailabilityOfferPreset {
  private static readonly availabilityOfferParser: AvailabilityParser = new AvailabilityParser();

  private static readonly offerModel = OfferPreset.TEN_PERCENT_OFF_MODEL;

  public static TEN_PERCENT_OFF_MODEL: AvailabilityOffersModel = new AvailabilityOffersModel({
    offerCode: this.offerModel.code,
    offerTitle: this.offerModel.title,
    offerModels: [this.offerModel],
    offerModel: this.offerModel,
  });

  public static TEN_PERCENT_OFF_POJO: AvailabilityOffers = this.availabilityOfferParser.parseOffersModelToPOJO(
    this.TEN_PERCENT_OFF_MODEL
  );
}
