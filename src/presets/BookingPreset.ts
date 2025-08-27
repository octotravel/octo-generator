import { Booking, BookingStatus, CapabilityId } from '@octocloud/types';
import { AvailabilityModelBuilder } from '../builders/AvailabilityModelBuilder';
import { BookingModelBuilder } from '../builders/BookingModelBuilder';
import { ProductModelBuilder } from '../builders/ProductModelBuilder';
import { AvailabilityParser } from '../parsers/AvailabilityParser';
import { BookingParser } from '../parsers/BookingParser';
import { ProductParser } from '../parsers/ProductParser';
import { AvailabilityPreset } from './AvailabilityPreset';
import { OptionPreset } from './OptionPreset';
import { ProductPreset } from './ProductPreset';
import { UnitItemPreset } from './UnitItemPreset';

export abstract class BookingPreset {
	private static readonly bookingModelBuilder = new BookingModelBuilder();
	private static readonly bookingParser: BookingParser = new BookingParser();
	private static readonly availabilityModelBuilder: AvailabilityModelBuilder = new AvailabilityModelBuilder();
	private static readonly availabilityParser: AvailabilityParser = new AvailabilityParser();
	private static readonly productModelBuilder: ProductModelBuilder = new ProductModelBuilder();
	private static readonly productParser: ProductParser = new ProductParser();

	public static readonly ON_HOLD_BOOKING_MODEL = this.bookingModelBuilder.build({
		bookingData: {
			product: ProductPreset.OPENINGHOURS_PRODUCT_POJO,
			option: OptionPreset.OPTION_POJO,
			availability: AvailabilityPreset.TODAY_FULL_DAY_AVAILABILITY_POJO,
			status: BookingStatus.ON_HOLD,
			unitItems: [
				UnitItemPreset.UNIT_ITEM_ADULT_PDF_POJO,
				UnitItemPreset.UNIT_ITEM_ADULT_PKPASS_POJO,
				UnitItemPreset.UNIT_ITEM_ADULT_QRCODE_POJO,
			],
		},
		capabilities: [CapabilityId.Pricing],
	});

	public static readonly CONFIRMED_BOOKING_MODEL = this.bookingModelBuilder.build({
		bookingData: {
			product: ProductPreset.OPENINGHOURS_PRODUCT_POJO,
			option: OptionPreset.OPTION_POJO,
			availability: AvailabilityPreset.TODAY_FULL_DAY_AVAILABILITY_POJO,
			status: BookingStatus.CONFIRMED,
			unitItems: [
				UnitItemPreset.UNIT_ITEM_ADULT_PDF_POJO,
				UnitItemPreset.UNIT_ITEM_ADULT_PKPASS_POJO,
				UnitItemPreset.UNIT_ITEM_ADULT_QRCODE_POJO,
			],
		},
		capabilities: [CapabilityId.Pricing],
	});

	public static readonly CANCELLED_BOOKING_MODEL = this.bookingModelBuilder.build({
		bookingData: {
			product: ProductPreset.OPENINGHOURS_PRODUCT_POJO,
			option: OptionPreset.OPTION_POJO,
			availability: AvailabilityPreset.TODAY_FULL_DAY_AVAILABILITY_POJO,
			status: BookingStatus.CANCELLED,
			unitItems: [
				UnitItemPreset.UNIT_ITEM_ADULT_PDF_POJO,
				UnitItemPreset.UNIT_ITEM_ADULT_PKPASS_POJO,
				UnitItemPreset.UNIT_ITEM_ADULT_QRCODE_POJO,
			],
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
