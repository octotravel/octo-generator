import { OptionModelBuilder } from "../builders/OptionModelBuilder";
import { OptionModel } from "../models/Option/OptionModel";
import { CapabilityId, Option, PricingPer } from "@octocloud/types";

interface OptionGenerateData {
  optionData: Partial<Option>;
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

  public generateMultiple = (optionsGenerateData: OptionGenerateData[]): OptionModel[] => {
    return optionsGenerateData.map((optionGenerateData) => {
      return this.generate(optionGenerateData);
    });
  };
}
