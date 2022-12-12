import { OptionModelBuilder } from "../builders/OptionModelBuilder";
import { OptionModel } from "../models/Option/OptionModel";
import { OptionData } from "../data/OptionData";
import { PricingPer } from "@octocloud/types";

export class OptionModelGenerator {
  private readonly optionModelBuilder = new OptionModelBuilder();

  public generate = (optionData: OptionData, pricingPer?: PricingPer): OptionModel => {
    return this.optionModelBuilder.build({
      optionData: optionData,
      pricingPer: pricingPer,
    });
  };

  public generateMultiple = (optionsData: OptionData[]): OptionModel[] => {
    return optionsData.map((optionData) => {
      return this.optionModelBuilder.build({
        optionData: optionData,
      });
    });
  };
}
