import { AvailabilityCalendar, CapabilityId } from "@octocloud/types";
import AvailabilityCalendarModel from "../models/availability/AvailabilityCalendarModel";
import AvailabilityCalendarPricingModel from "../models/availability/AvailabilityCalendarPricingModel";

export default class AvailabilityCalendarParser {
  public parsePOJOToModel = (availabilityCalendar: AvailabilityCalendar): AvailabilityCalendarModel =>
    new AvailabilityCalendarModel({
      localDate: availabilityCalendar.localDate,
      available: availabilityCalendar.available,
      status: availabilityCalendar.status,
      vacancies: availabilityCalendar.vacancies,
      capacity: availabilityCalendar.capacity,
      openingHours: availabilityCalendar.openingHours,
      availabilityCalendarPricingModel: this.parsePricingPOJOToModel(availabilityCalendar),
    });

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
    const availabilityCalendar = this.parseMainModelToPojo(availabilityCalendarModel);

    this.parsePricingModelToPOJO(availabilityCalendar, availabilityCalendarModel);

    return availabilityCalendar;
  };

  public parseModelToPOJOWithSpecificCapabilities = (
    availabilityCalendarModel: AvailabilityCalendarModel,
    capabilities: CapabilityId[]
  ): AvailabilityCalendar => {
    const availabilityCalendar = this.parseMainModelToPojo(availabilityCalendarModel);

    if (capabilities.includes(CapabilityId.Pricing)) {
      this.parsePricingModelToPOJO(availabilityCalendar, availabilityCalendarModel);
    }

    return availabilityCalendar;
  };

  private parseMainModelToPojo = (availabilityCalendarModel: AvailabilityCalendarModel): AvailabilityCalendar => ({
    localDate: availabilityCalendarModel.localDate,
    available: availabilityCalendarModel.available,
    status: availabilityCalendarModel.status,
    vacancies: availabilityCalendarModel.vacancies,
    capacity: availabilityCalendarModel.capacity,
    openingHours: availabilityCalendarModel.openingHours,
  });

  private parsePricingModelToPOJO = (
    availabilityCalendar: AvailabilityCalendar,
    availabilityCalendarModel: AvailabilityCalendarModel
  ) => {
    if (availabilityCalendarModel.availabilityCalendarPricingModel === undefined) {
      return;
    }

    const { availabilityCalendarPricingModel } = availabilityCalendarModel;

    availabilityCalendar.unitPricingFrom = availabilityCalendarPricingModel.unitPricingFrom;
    availabilityCalendar.pricingFrom = availabilityCalendarPricingModel.pricingFrom;
  };
}
