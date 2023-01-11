import { BookingStatus, CapabilityId, Currency, DeliveryMethod, DurationUnit } from "@octocloud/types";
import { BookingModel } from "../models/booking/BookingModel";
import { BookingCartModel } from "../models/booking/BookingCartModel";
import { ProductModelBuilder } from "./ProductModelBuilder";
import { OptionModelBuilder } from "./OptionModelBuilder";
import { BookingContentModel } from "../models/booking/BookingContentModel";
import { BookingPickupsModel } from "../models/booking/BookingPickupsModel";
import { BookingPricingModel } from "../models/booking/BookingPricingModel";
import { PartialBooking } from "../types/PartialBooking";
import { UnitItemModel } from "../models/unitItem/UnitItemModel";
import { UnitItemModelBuilder } from "./UnitItemModelBuilder";

interface BookingModelBuilderData {
  bookingData: PartialBooking;
  capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [
  CapabilityId.Cart,
  CapabilityId.Content,
  CapabilityId.Pickups,
  CapabilityId.Pricing,
];

export class BookingModelBuilder {
  private readonly productModelBuilder = new ProductModelBuilder();
  private readonly optionModelBuilder = new OptionModelBuilder();
  private readonly unitItemModelBuilder = new UnitItemModelBuilder();

  public build(builderData: BookingModelBuilderData): BookingModel {
    builderData.capabilities ??= defaultCapabilities;

    const bookingData = builderData.bookingData;
    const productModel = this.productModelBuilder.build({
      productData: bookingData.product ?? {},
      capabilities: builderData.capabilities,
      sourceModel: BookingModel,
    });
    const optionModel = this.optionModelBuilder.build({
      optionData: bookingData.option ?? {},
      capabilities: builderData.capabilities,
      sourceModel: BookingModel,
    });

    return new BookingModel({
      id: bookingData.id ?? "id",
      uuid: bookingData.uuid ?? "uuid",
      testMode: bookingData.testMode ?? false,
      resellerReference: bookingData.resellerReference ?? null,
      supplierReference: bookingData.supplierReference ?? null,
      status: bookingData.status ?? BookingStatus.CONFIRMED,
      utcCreatedAt: bookingData.utcCreatedAt ?? "2022-11-28T08:43:37Z",
      utcUpdatedAt: bookingData.utcUpdatedAt ?? "2022-11-28T08:43:38Z",
      utcExpiresAt: bookingData.utcExpiresAt ?? null,
      utcRedeemedAt: bookingData.utcRedeemedAt ?? null,
      utcConfirmedAt: bookingData.utcConfirmedAt ?? "2022-11-28T08:43:38Z",
      productModel: productModel,
      optionModel: optionModel,
      cancellable: bookingData.cancellable ?? false,
      cancellation: bookingData.cancellation ?? null,
      freesale: bookingData.freesale ?? false,
      availabilityId: bookingData.availabilityId ?? "2023-01-03T09:15:00+01:00",
      availability: bookingData.availability ?? {
        id: "2023-01-03T09:15:00+01:00",
        localDateTimeStart: "2023-01-03T09:15:00+01:00",
        localDateTimeEnd: "2023-01-03T09:39:00+01:00",
        allDay: false,
        openingHours: [],
      },
      contact: bookingData.contact ?? {
        fullName: null,
        firstName: null,
        lastName: null,
        emailAddress: null,
        phoneNumber: null,
        locales: [],
        postalCode: null,
        country: null,
        notes: null,
      },
      notes: bookingData.notes ?? null,
      deliveryMethods: bookingData.deliveryMethods ?? [DeliveryMethod.TICKET],
      voucher: bookingData.voucher ?? null,
      unitItemModels: this.buildUnitItemModels(builderData),
      bookingCartModel: this.buildCartModel(builderData),
      bookingContentModel: this.buildContentModel(builderData),
      bookingPickupsModel: this.buildPickupModel(builderData),
      bookingPricingModel: this.buildPricingModel(builderData),
    });
  }

  private buildUnitItemModels(builderData: BookingModelBuilderData): UnitItemModel[] {
    if (builderData.bookingData.unitItems === undefined) {
      return [
        this.unitItemModelBuilder.build({
          unitItemData: {},
          capabilities: builderData.capabilities,
          sourceModel: BookingModel,
        }),
      ];
    }

    return builderData.bookingData.unitItems.map((unitItem) => {
      return this.unitItemModelBuilder.build({
        unitItemData: unitItem,
        capabilities: builderData.capabilities,
        sourceModel: BookingModel,
      });
    }, builderData);
  }

  private buildCartModel(builderData: BookingModelBuilderData): BookingCartModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Cart) === false) {
      return undefined;
    }

    const bookingData = builderData.bookingData;

    return new BookingCartModel({
      orderId: bookingData.orderId ?? "orderId",
      orderReference: bookingData.orderReference ?? "orderReference",
      primary: bookingData.primary ?? false,
    });
  }

  private buildContentModel(builderData: BookingModelBuilderData): BookingContentModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
      return undefined;
    }

    const bookingData = builderData.bookingData;

    return new BookingContentModel({
      meetingPoint: bookingData.meetingPoint ?? null,
      meetingPointCoordinates: bookingData.meetingPointCoordinates ?? null,
      meetingLocalDateTime: bookingData.meetingLocalDateTime ?? null,
      duration: bookingData.duration ?? "duration",
      durationAmount: bookingData.duration ?? "durationAmount",
      durationUnit: bookingData.duration ?? DurationUnit.HOUR,
    });
  }

  private buildPickupModel(builderData: BookingModelBuilderData): BookingPickupsModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
      return undefined;
    }

    const bookingData = builderData.bookingData;

    return new BookingPickupsModel({
      pickupRequested: bookingData.pickupRequested ?? false,
      pickupPointId: bookingData.pickupPointId ?? "pickupPointId",
      pickupHotel: bookingData.pickupHotel ?? null,
      pickupHotelRoom: bookingData.pickupHotelRoom ?? null,
      pickupPoint: bookingData.pickupPoint ?? null,
    });
  }

  private buildPricingModel(builderData: BookingModelBuilderData): BookingPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    const bookingData = builderData.bookingData;

    return new BookingPricingModel({
      pricing: bookingData.pricing ?? {
        original: 0,
        retail: 0,
        net: null,
        currency: Currency.EUR,
        currencyPrecision: 0,
        includedTaxes: [],
      },
    });
  }
}
