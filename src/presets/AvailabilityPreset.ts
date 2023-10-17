import { Availability, AvailabilityStatus } from "@octocloud/types";
import { AvailabilityModelBuilder } from "../builders/AvailabilityModelBuilder";
import { AvailabilityParser } from "../parsers/AvailabilityParser";
import { AvailabilityModel } from "../models/availability/AvailabilityModel";

export abstract class AvailabilityPreset {
  private static readonly availabilityModelBuilder: AvailabilityModelBuilder = new AvailabilityModelBuilder();

  private static readonly availabilityParser: AvailabilityParser = new AvailabilityParser();

  public static readonly TODAY_FULL_DAY_AVAILABILITY_MODEL: AvailabilityModel = this.availabilityModelBuilder.build({
    availabilityData: {
      id: "firstAvailabilityId",
      allDay: true,
      available: true,
      status: AvailabilityStatus.AVAILABLE,
      vacancies: null,
      capacity: null,
      maxUnits: null,
      utcCutoffAt: "",
      openingHours: [],
    },
  });

  public static readonly TODAY_FULL_DAY_AVAILABILITY_POJO: Availability = this.availabilityParser.parseModelToPOJO(
    this.TODAY_FULL_DAY_AVAILABILITY_MODEL
  );
}
