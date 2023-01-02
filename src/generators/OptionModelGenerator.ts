import { OptionModelBuilder } from "../builders/OptionModelBuilder";
import { OptionModel } from "../models/option/OptionModel";
import { CapabilityId, Option, PricingPer } from "@octocloud/types";

interface OptionGenerateData {
  optionData: Partial<Option>;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class OptionModelGenerator {
  private readonly optionModelBuilder = new OptionModelBuilder();

  public generateOption = (optionGenerateData: OptionGenerateData): OptionModel => {
    return this.optionModelBuilder.build({
      optionData: optionGenerateData.optionData,
      pricingPer: optionGenerateData.pricingPer,
      capabilities: optionGenerateData.capabilities,
    });
  };

  public generateMultipleOptions = (optionsGenerateData: OptionGenerateData[]): OptionModel[] => {
    return optionsGenerateData.map((optionGenerateData) => {
      return this.generateOption(optionGenerateData);
    });
  };
}
