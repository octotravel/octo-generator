import { Booking, CapabilityId } from "@octocloud/types";
import { BookingModelBuilder } from "../builders/BookingModelBuilder";
import { BookingModel } from "../models/booking/BookingModel";

interface BookingGenerateData {
  bookingData: Partial<Booking>;
  capabilities?: CapabilityId[];
}

export class BookingModelGenerator {
  private readonly bookingModelBuilder = new BookingModelBuilder();

  public generateBooking = (bookingGenerateData: BookingGenerateData): BookingModel => {
    return this.bookingModelBuilder.build({
      bookingData: bookingGenerateData.bookingData,
      capabilities: bookingGenerateData.capabilities,
    });
  };

  public generateMultipleBookings = (bookingsGenerateData: BookingGenerateData[]): BookingModel[] => {
    return bookingsGenerateData.map((bookingGenerateData) => {
      return this.generateBooking(bookingGenerateData);
    });
  };
}
