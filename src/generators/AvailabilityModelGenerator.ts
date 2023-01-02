import { Availability, CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityModelBuilder } from "../builders/AvailabilityModelBuilder";
import { AvailabilityModel } from "../models/availability/AvailabilityModel";

interface AvailabilityGenerateData {
  availabilityData: Partial<Availability>;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class AvailabilityModelGenerator {
  private readonly availabilityModelBuilder = new AvailabilityModelBuilder();

  public generateAvailability = (availabilityGenerateData: AvailabilityGenerateData): AvailabilityModel => {
    return this.availabilityModelBuilder.build({
      availabilityData: availabilityGenerateData.availabilityData,
      pricingPer: availabilityGenerateData.pricingPer,
      capabilities: availabilityGenerateData.capabilities,
    });
  };

  public generateMultipleAvailabilities = (
    availabilitiesGenerateData: AvailabilityGenerateData[]
  ): AvailabilityModel[] => {
    return availabilitiesGenerateData.map((availabilityGenerateData) => {
      return this.generateAvailability(availabilityGenerateData);
    });
  };
}
