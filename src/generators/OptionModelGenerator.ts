import { OptionModelBuilder } from "../builders/OptionModelBuilder";
import { OptionModel } from "../models/option/OptionModel";
import { OptionData } from "../data/OptionData";
import { CapabilityId, PricingPer } from "@octocloud/types";

interface OptionGenerateData {
  optionData: OptionData;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class OptionModelGenerator {
  private readonly optionModelBuilder = new OptionModelBuilder();

  public generate = (optionGenerateData: OptionGenerateData): OptionModel => {
    return this.optionModelBuilder.build({
      optionData: optionGenerateData.optionData,
      pricingPer: optionGenerateData.pricingPer,
      capabilities: optionGenerateData.capabilities,
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
