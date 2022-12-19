import { CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityModelBuilder } from "../builders/AvailabilityModelBuilder";
import { AvailabilityData } from "../data/AvailabilityData";
import { AvailabilityModel } from "../models/availability/AvailabilityModel";

interface AvailabilityGenerateData {
  availabilityData: AvailabilityData;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class AvailabilityModelGenerator {
  private readonly availabilityModelBuilder = new AvailabilityModelBuilder();

  public generate = (availabilityGenerateData: AvailabilityGenerateData): AvailabilityModel => {
    return this.availabilityModelBuilder.build({
      availabilityData: availabilityGenerateData.availabilityData,
      pricingPer: availabilityGenerateData.pricingPer,
      capabilities: availabilityGenerateData.capabilities,
    });
  };

  public generateMultiple = (
    availabilitiesGenerateData: AvailabilityGenerateData[]
  ): AvailabilityModel[] => {
    return availabilitiesGenerateData.map((availabilityGenerateData) => {
      return this.generate(availabilityGenerateData);
    });
  };
}
