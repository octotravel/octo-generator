import { AvailabilityStatus, AvailabilityType, Booking, BookingStatus, CapabilityId, Product } from '@octocloud/types';
import { BookingModelBuilder } from '../builders/BookingModelBuilder';

import { BookingParser } from '../parsers/BookingParser';

import { AvailabilityModelBuilder } from '../builders/AvailabilityModelBuilder';
import { ProductModelBuilder } from '../builders/ProductModelBuilder';
import { AvailabilityParser } from '../parsers/AvailabilityParser';
import { ProductParser } from '../parsers/ProductParser';
import { AvailabilityPreset } from './AvailabilityPreset';
import { OptionPreset } from './OptionPreset';
import { ProductPreset } from './ProductPreset';

export abstract class BookingPreset {
	private static readonly bookingModelBuilder = new BookingModelBuilder();
	private static readonly bookingParser: BookingParser = new BookingParser();
	private static readonly availabilityModelBuilder: AvailabilityModelBuilder = new AvailabilityModelBuilder();
	private static readonly availabilityParser: AvailabilityParser = new AvailabilityParser();
	private static readonly productModelBuilder: ProductModelBuilder = new ProductModelBuilder();
	private static readonly productParser: ProductParser = new ProductParser();

	private static readonly availability = this.availabilityModelBuilder.build({
		availabilityData: {
			id: 'firstAvailabilityId',
			allDay: true,
			available: true,
			status: AvailabilityStatus.AVAILABLE,
			vacancies: null,
			capacity: null,
			maxUnits: null,
			utcCutoffAt: '',
			openingHours: [],
		},
		capabilities: [],
	});

	public static readonly ON_HOLD_BOOKING_MODEL = this.bookingModelBuilder.build({
		bookingData: {
			product: ProductPreset.OPENINGHOURS_PRODUCT_POJO,
			option: OptionPreset.OPTION_POJO,
			availability: this.availability,
			status: BookingStatus.ON_HOLD,
		},
		capabilities: [CapabilityId.Pricing],
	});

	public static readonly CONFIRMED_BOOKING_MODEL = this.bookingModelBuilder.build({
		bookingData: {
			product: ProductPreset.OPENINGHOURS_PRODUCT_POJO,
			option: OptionPreset.OPTION_POJO,
			availability: this.availability,
			status: BookingStatus.CONFIRMED,
		},
		capabilities: [CapabilityId.Pricing],
	});

	public static readonly CANCELLED_BOOKING_MODEL = this.bookingModelBuilder.build({
		bookingData: {
			product: ProductPreset.OPENINGHOURS_PRODUCT_POJO,
			option: OptionPreset.OPTION_POJO,
			availability: this.availability,
			status: BookingStatus.CANCELLED,
		},
		capabilities: [CapabilityId.Pricing],
	});

	public static readonly ON_HOLD_BOOKING_MODEL_POJO: Booking = this.bookingParser.parseModelToPOJO(
		this.ON_HOLD_BOOKING_MODEL,
	);

	public static readonly CONFIRMED_BOOKING_MODEL_POJO: Booking = this.bookingParser.parseModelToPOJO(
		this.CONFIRMED_BOOKING_MODEL,
	);

	public static readonly CANCELLED_BOOKING_MODEL_POJO: Booking = this.bookingParser.parseModelToPOJO(
		this.CANCELLED_BOOKING_MODEL,
	);
}
