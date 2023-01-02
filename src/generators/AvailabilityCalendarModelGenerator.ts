import { AvailabilityCalendar, CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityCalendarModelBuilder } from "../builders/AvailabilityCalendarModelBuilder";
import { AvailabilityCalendarModel } from "../models/availability/AvailabilityCalendarModel";

interface AvailabilityCalendarGenerateData {
  availabilityCalendarData: Partial<AvailabilityCalendar>;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class AvailabilityCalendarModelGenerator {
  private readonly availabilityCalendarModelBuilder = new AvailabilityCalendarModelBuilder();

  public generateAvailabilityCalendar = (
    availabilityCalendarGenerateData: AvailabilityCalendarGenerateData
  ): AvailabilityCalendarModel => {
    return this.availabilityCalendarModelBuilder.build({
      availabilityCalendarData: availabilityCalendarGenerateData.availabilityCalendarData,
      pricingPer: availabilityCalendarGenerateData.pricingPer,
      capabilities: availabilityCalendarGenerateData.capabilities,
    });
  };

  public generateMultipleAvailabilityCalendars = (
    availabilityCalendarsGenerateData: AvailabilityCalendarGenerateData[]
  ): AvailabilityCalendarModel[] => {
    return availabilityCalendarsGenerateData.map((availabilityCalendarGenerateData) => {
      return this.generateAvailabilityCalendar(availabilityCalendarGenerateData);
    });
  };
}
