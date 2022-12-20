import { AvailabilityCalendar } from "@octocloud/types";
import { AvailabilityCalendarModel } from "../models/Availability/AvailabilityCalendarModel";
import { AvailabilityCalendarPricingModel } from "../models/Availability/AvailabilityCalendarPricingModel";

export class AvailabilityCalendarParser {
  public parsePOJOToModel = (availabilityCalendar: AvailabilityCalendar): AvailabilityCalendarModel => {
    return new AvailabilityCalendarModel({
      localDate: availabilityCalendar.localDate,
      available: availabilityCalendar.available,
      status: availabilityCalendar.status,
      vacancies: availabilityCalendar.vacancies,
      capacity: availabilityCalendar.capacity,
      openingHours: availabilityCalendar.openingHours,
      availabilityCalendarPricingModel: this.parsePricingPOJOToModel(availabilityCalendar),
    });
  };

  private parsePricingPOJOToModel = (
    availabilityCalendar: AvailabilityCalendar
  ): AvailabilityCalendarPricingModel | undefined => {
    if (availabilityCalendar.unitPricingFrom === undefined && availabilityCalendar.pricingFrom === undefined) {
      return undefined;
    }

    return new AvailabilityCalendarPricingModel({
      unitPricingFrom: availabilityCalendar.unitPricingFrom,
      pricingFrom: availabilityCalendar.pricingFrom,
    });
  };

  public parseModelToPOJO = (availabilityCalendarModel: AvailabilityCalendarModel): AvailabilityCalendar => {
    const availabilityCalendar: AvailabilityCalendar = {
      localDate: availabilityCalendarModel.localDate,
      available: availabilityCalendarModel.available,
      status: availabilityCalendarModel.status,
      vacancies: availabilityCalendarModel.vacancies,
      capacity: availabilityCalendarModel.capacity,
      openingHours: availabilityCalendarModel.openingHours,
    };

    if (availabilityCalendarModel.availabilityCalendarPricingModel !== undefined) {
      const availabilityCalendarPricingModel = availabilityCalendarModel.availabilityCalendarPricingModel;

      availabilityCalendar.unitPricingFrom = availabilityCalendarPricingModel.unitPricingFrom;
      availabilityCalendar.pricingFrom = availabilityCalendarPricingModel.pricingFrom;
    }

    return availabilityCalendar;
  };
}
