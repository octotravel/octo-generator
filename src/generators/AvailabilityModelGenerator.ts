import { Availability, CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityModelBuilder } from "../builders/AvailabilityModelBuilder";
import { AvailabilityModel } from "../models/Availability/AvailabilityModel";

interface AvailabilityGenerateData {
  availabilityData: Partial<Availability>;
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
