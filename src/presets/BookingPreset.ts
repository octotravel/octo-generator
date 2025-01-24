import { AvailabilityStatus, AvailabilityType, Booking, BookingStatus, Product } from '@octocloud/types';
import { BookingModelBuilder } from '../builders/BookingModelBuilder';

import { BookingParser } from '../parsers/BookingParser';

import { ProductPreset } from './ProductPreset';
import { AvailabilityPreset } from './AvailabilityPreset';
import { ProductModelBuilder } from '../builders/ProductModelBuilder';
import { AvailabilityParser } from '../parsers/AvailabilityParser';
import { AvailabilityModelBuilder } from '../builders/AvailabilityModelBuilder';
import { ProductParser } from '../parsers/ProductParser';

export abstract class BookingPreset {
  private static readonly bookingModelBuilder = new BookingModelBuilder();
  private static readonly bookingParser: BookingParser = new BookingParser();
  private static readonly availabilityModelBuilder: AvailabilityModelBuilder = new AvailabilityModelBuilder();
  private static readonly availabilityParser: AvailabilityParser = new AvailabilityParser();
  private static readonly productModelBuilder: ProductModelBuilder = new ProductModelBuilder();
  private static readonly productParser: ProductParser = new ProductParser();

  private static readonly product = this.productModelBuilder.build({
    productData: {
      id: 'firstProductId',
      availabilityType: AvailabilityType.OPENING_HOURS,
      options: [
        {
          id: 'firstOptionId',
        },
      ],
    },
    capabilities: [],
  });

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
      product: this.product,
      availability: this.availability,
      status: BookingStatus.ON_HOLD,
    },
    capabilities: [],
  });

  public static readonly CONFIRMED_BOOKING_MODEL = this.bookingModelBuilder.build({
    bookingData: {
      product: this.product,
      availability: this.availability,
      status: BookingStatus.CONFIRMED,
    },
    capabilities: [],
  });

  public static readonly CANCELLED_BOOKING_MODEL = this.bookingModelBuilder.build({
    bookingData: {
      product: this.product,
      availability: this.availability,
      status: BookingStatus.CANCELLED,
    },
    capabilities: [],
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
