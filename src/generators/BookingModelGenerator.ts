import { CapabilityId } from '@octocloud/types';
import { BookingModelBuilder } from '../builders/BookingModelBuilder';
import { BookingModel } from '../models/booking/BookingModel';
import { PartialBooking } from '../types/PartialBooking';

interface BookingGenerateData {
	bookingData: PartialBooking;
	capabilities?: CapabilityId[];
}

export class BookingModelGenerator {
	private readonly bookingModelBuilder = new BookingModelBuilder();

	public generateBooking(bookingGenerateData: BookingGenerateData): BookingModel {
		return this.bookingModelBuilder.build({
			bookingData: bookingGenerateData.bookingData,
			capabilities: bookingGenerateData.capabilities,
		});
	}

	public generateMultipleBookings(bookingsData: PartialBooking[], capabilities?: CapabilityId[]): BookingModel[] {
		return bookingsData.map((bookingData) => this.generateBooking({ bookingData, capabilities }));
	}
}
