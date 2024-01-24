import { CapabilityId, PricingPer } from '@octocloud/types';
import { AvailabilityModelBuilder } from '../builders/AvailabilityModelBuilder';
import { AvailabilityModel } from '../models/availability/AvailabilityModel';
import { PartialAvailability } from '../types/PartialAvailability';

interface AvailabilityGenerateData {
  availabilityData: PartialAvailability;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class AvailabilityModelGenerator {
  private readonly availabilityModelBuilder = new AvailabilityModelBuilder();

  public generateAvailability(availabilityGenerateData: AvailabilityGenerateData): AvailabilityModel {
    return this.availabilityModelBuilder.build({
      availabilityData: availabilityGenerateData.availabilityData,
      pricingPer: availabilityGenerateData.pricingPer,
      capabilities: availabilityGenerateData.capabilities,
    });
  }

  public generateMultipleAvailabilities(
    availabilitiesData: PartialAvailability[],
    pricingPer?: PricingPer,
    capabilities?: CapabilityId[],
  ): AvailabilityModel[] {
    return availabilitiesData.map((availabilityData) =>
      this.generateAvailability({ availabilityData, pricingPer, capabilities }),
    );
  }
}
