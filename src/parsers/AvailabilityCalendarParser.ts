import { AvailabilityCalendar, AvailabilityCalendarPricing, CapabilityId } from "@octocloud/types";
import { AvailabilityCalendarModel } from "../models/availability/AvailabilityCalendarModel";
import { AvailabilityCalendarPricingModel } from "../models/availability/AvailabilityCalendarPricingModel";

export class AvailabilityCalendarParser {
  public parsePOJOToModel(availabilityCalendar: AvailabilityCalendar): AvailabilityCalendarModel {
    return new AvailabilityCalendarModel({
      localDate: availabilityCalendar.localDate,
      available: availabilityCalendar.available,
      status: availabilityCalendar.status,
      vacancies: availabilityCalendar.vacancies,
      capacity: availabilityCalendar.capacity,
      openingHours: availabilityCalendar.openingHours,
      availabilityCalendarPricingModel: this.parsePricingPOJOToModel(availabilityCalendar),
    });
  }

  public parsePricingPOJOToModel(
    availabilityCalendarPricing: AvailabilityCalendarPricing
  ): AvailabilityCalendarPricingModel | undefined {
    if (
      availabilityCalendarPricing.unitPricingFrom === undefined &&
      availabilityCalendarPricing.pricingFrom === undefined
    ) {
      return undefined;
    }

    return new AvailabilityCalendarPricingModel({
      unitPricingFrom: availabilityCalendarPricing.unitPricingFrom,
      pricingFrom: availabilityCalendarPricing.pricingFrom,
    });
  }

  public parseModelToPOJO(availabilityCalendarModel: AvailabilityCalendarModel): AvailabilityCalendar {
    const availabilityCalendar = this.parseMainModelToPojo(availabilityCalendarModel);

    Object.assign(
      availabilityCalendar,
      this.parsePricingModelToPOJO(availabilityCalendarModel.availabilityCalendarPricingModel)
    );

    return availabilityCalendar;
  }

  public parseModelToPOJOWithSpecificCapabilities(
    availabilityCalendarModel: AvailabilityCalendarModel,
    capabilities: CapabilityId[]
  ): AvailabilityCalendar {
    const availabilityCalendar = this.parseMainModelToPojo(availabilityCalendarModel);
    let availabilityCalendarPricing;

    if (capabilities.includes(CapabilityId.Pricing)) {
      availabilityCalendarPricing = this.parsePricingModelToPOJO(
        availabilityCalendarModel.availabilityCalendarPricingModel
      );
    }

    Object.assign(availabilityCalendar, availabilityCalendarPricing);

    return availabilityCalendar;
  }

  private parseMainModelToPojo = (availabilityCalendarModel: AvailabilityCalendarModel): AvailabilityCalendar => ({
    localDate: availabilityCalendarModel.localDate,
    available: availabilityCalendarModel.available,
    status: availabilityCalendarModel.status,
    vacancies: availabilityCalendarModel.vacancies,
    capacity: availabilityCalendarModel.capacity,
    openingHours: availabilityCalendarModel.openingHours,
  });

  public parsePricingModelToPOJO(
    availabilityCalendarPricingModel?: AvailabilityCalendarPricingModel
  ): AvailabilityCalendarPricing {
    if (availabilityCalendarPricingModel === undefined) {
      return {};
    }

    return {
      unitPricingFrom: availabilityCalendarPricingModel.unitPricingFrom,
      pricingFrom: availabilityCalendarPricingModel.pricingFrom,
    };
  }
}
