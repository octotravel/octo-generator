import { CapabilityId } from "@octocloud/types";
import { PartialPricing } from "../types/PartialPricing";
import { PricingModelBuilder } from "../builders/PricingModelBuilder";
import { PricingModel } from "../models/pricing/PricingModel";

interface PricingGenerateData {
  pricingData: PartialPricing;
  capabilities?: CapabilityId[];
}

export class PricingModelGenerator {
  private readonly pricingModelBuilder = new PricingModelBuilder();

  public generatePricing(pricingGenerateData: PricingGenerateData): PricingModel {
    return this.pricingModelBuilder.build({
      pricingData: pricingGenerateData.pricingData,
      capabilities: pricingGenerateData.capabilities,
    });
  }
}
