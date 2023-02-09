import { CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityCalendarModelBuilder } from "../builders/AvailabilityCalendarModelBuilder";
import { AvailabilityCalendarModel } from "../models/availability/AvailabilityCalendarModel";
import { PartialAvailabilityCalendar } from "../types/PartialAvailabilityCalendar";

interface AvailabilityCalendarGenerateData {
  availabilityCalendarData: PartialAvailabilityCalendar;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

export class AvailabilityCalendarModelGenerator {
  private readonly availabilityCalendarModelBuilder = new AvailabilityCalendarModelBuilder();

  public generateAvailabilityCalendar(
    availabilityCalendarGenerateData: AvailabilityCalendarGenerateData
  ): AvailabilityCalendarModel {
    return this.availabilityCalendarModelBuilder.build({
      availabilityCalendarData: availabilityCalendarGenerateData.availabilityCalendarData,
      pricingPer: availabilityCalendarGenerateData.pricingPer,
      capabilities: availabilityCalendarGenerateData.capabilities,
    });
  }

  public generateMultipleAvailabilityCalendars(
    availabilityCalendarsData: PartialAvailabilityCalendar[],
    pricingPer?: PricingPer,
    capabilities?: CapabilityId[]
  ): AvailabilityCalendarModel[] {
    return availabilityCalendarsData.map((availabilityCalendarData) =>
      this.generateAvailabilityCalendar({ availabilityCalendarData, pricingPer, capabilities })
    );
  }
}
