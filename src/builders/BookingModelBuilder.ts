import { BookingStatus, CapabilityId, DeliveryMethod, DurationUnit, RedemptionMethod } from '@octocloud/types';
import { DeliveryMethodsDataProvider } from '../dataProviders/DeliveryMethodDataProvider';
import { PricingDataProvider } from '../dataProviders/PricingDataProvider';
import { BookingCartModel } from '../models/booking/BookingCartModel';
import { BookingContentModel } from '../models/booking/BookingContentModel';
import { BookingModel } from '../models/booking/BookingModel';
import { BookingOffersModel } from '../models/booking/BookingOffersModel';
import { BookingPickupsModel } from '../models/booking/BookingPickupsModel';
import { BookingPricingModel } from '../models/booking/BookingPricingModel';
import { BookingQuestionsModel } from '../models/booking/BookingQuestionsModel';
import { UnitItemModel } from '../models/unitItem/UnitItemModel';
import { PartialBooking } from '../types/PartialBooking';
import { OfferModelBuilder } from './OfferModelBuilder';
import { OptionModelBuilder } from './OptionModelBuilder';
import { ProductModelBuilder } from './ProductModelBuilder';
import { UnitItemModelBuilder } from './UnitItemModelBuilder';

interface BookingModelBuilderData {
	bookingData: PartialBooking;
	capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [
	CapabilityId.Cart,
	CapabilityId.Content,
	CapabilityId.Offers,
	CapabilityId.Pickups,
	CapabilityId.Pricing,
	CapabilityId.Questions,
];

export class BookingModelBuilder {
	private readonly productModelBuilder = new ProductModelBuilder();

	private readonly offerModelBuilder = new OfferModelBuilder();

	private readonly optionModelBuilder = new OptionModelBuilder();

	private readonly unitItemModelBuilder = new UnitItemModelBuilder();

	public build(builderData: BookingModelBuilderData): BookingModel {
		builderData.capabilities ??= defaultCapabilities;

		const { bookingData } = builderData;
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
		const deliveryMethods = bookingData.deliveryMethods ?? DeliveryMethodsDataProvider.defaultDeliveryMethods;
		let voucher = bookingData.voucher ?? null;

		if ((voucher === undefined || voucher === null) && deliveryMethods.includes(DeliveryMethod.VOUCHER)) {
			voucher = {
				redemptionMethod: RedemptionMethod.DIGITAL,
				utcRedeemedAt: null,
				deliveryOptions: [],
			};
		}

		const status = bookingData.status ?? BookingStatus.CONFIRMED;
		let utcConfirmedAt = bookingData.utcConfirmedAt ?? null;

		if ((utcConfirmedAt === undefined || utcConfirmedAt === null) && status === BookingStatus.CONFIRMED) {
			utcConfirmedAt = '2022-11-28T08:43:38Z';
		}

		if (bookingData.status === BookingStatus.CANCELLED) {
			if (bookingData.cancellation === undefined) {
				bookingData.cancellation = {
					reason: 'product sucks',
					utcCancelledAt: '2022-11-28T08:43:37Z',
					refund: '',
				};
			}
		}

		return new BookingModel({
			id: bookingData.id ?? 'id',
			uuid: bookingData.uuid ?? 'uuid',
			testMode: bookingData.testMode ?? false,
			resellerReference: bookingData.resellerReference ?? null,
			supplierReference: bookingData.supplierReference ?? null,
			status,
			utcCreatedAt: bookingData.utcCreatedAt ?? '2022-11-28T08:43:37Z',
			utcUpdatedAt: bookingData.utcUpdatedAt ?? '2022-11-28T08:43:38Z',
			utcExpiresAt: bookingData.utcExpiresAt ?? null,
			utcRedeemedAt: bookingData.utcRedeemedAt ?? null,
			utcConfirmedAt,
			productModel,
			optionModel,
			cancellable: bookingData.cancellable ?? true,
			cancellation: bookingData.cancellation ?? null,
			freesale: bookingData.freesale ?? false,
			availability: bookingData.availability,
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
			deliveryMethods,
			voucher,
			unitItemModels: this.buildUnitItemModels(builderData),
			bookingCartModel: this.buildCartModel(builderData),
			bookingContentModel: this.buildContentModel(builderData),
			bookingOffersModel: this.buildOffersModel(builderData),
			bookingPickupsModel: this.buildPickupModel(builderData),
			bookingPricingModel: this.buildPricingModel(builderData),
			bookingQuestionsModel: this.buildQuestionsModel(builderData),
		});
	}

	private buildUnitItemModels(builderData: BookingModelBuilderData): UnitItemModel[] {
		if (builderData.bookingData.unitItems === undefined) {
			return [
				this.unitItemModelBuilder.build({
					unitItemData: {
						status: builderData.bookingData.status,
					},
					capabilities: builderData.capabilities,
					sourceModel: BookingModel,
				}),
			];
		}

		return builderData.bookingData.unitItems.map(
			(unitItem) =>
				this.unitItemModelBuilder.build({
					unitItemData: unitItem,
					capabilities: builderData.capabilities,
					sourceModel: BookingModel,
				}),
			builderData,
		);
	}

	private buildCartModel(builderData: BookingModelBuilderData): BookingCartModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Cart) === false) {
			return undefined;
		}

		const { bookingData } = builderData;

		return new BookingCartModel({
			orderId: bookingData.orderId ?? 'orderId',
			orderReference: bookingData.orderReference ?? 'orderReference',
			primary: bookingData.primary ?? false,
		});
	}

	private buildContentModel(builderData: BookingModelBuilderData): BookingContentModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
			return undefined;
		}

		const { bookingData } = builderData;

		return new BookingContentModel({
			meetingPoint: bookingData.meetingPoint ?? null,
			meetingPointCoordinates: bookingData.meetingPointCoordinates ?? null,
			meetingLocalDateTime: bookingData.meetingLocalDateTime ?? null,
			duration: bookingData.duration ?? 'duration',
			durationAmount: bookingData.duration ?? 'durationAmount',
			durationUnit: bookingData.duration ?? DurationUnit.HOUR,
			termsAccepted: bookingData.termsAccepted ?? true,
			notices: bookingData.notices ?? [],
		});
	}

	private buildOffersModel(builderData: BookingModelBuilderData): BookingOffersModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Offers) === false) {
			return undefined;
		}

		const { bookingData } = builderData;

		return new BookingOffersModel({
			offerCode: bookingData.offerCode ?? 'offerCode',
			offerTitle: bookingData.offerTitle ?? 'offerTitle',
			offerComparisons: bookingData.offerComparisons ?? [],
			offerIsCombination: bookingData.offerIsCombination ?? false,
			offerModels:
				builderData.bookingData.offers?.map((offer) => this.offerModelBuilder.build({ offerData: offer })) ?? [],
			offerModel: this.offerModelBuilder.build({ offerData: bookingData.offer ?? {} }),
		});
	}

	private buildPickupModel(builderData: BookingModelBuilderData): BookingPickupsModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
			return undefined;
		}

		const { bookingData } = builderData;

		return new BookingPickupsModel({
			pickupRequested: bookingData.pickupRequested ?? false,
			pickupPointId: bookingData.pickupPointId ?? 'pickupPointId',
			pickupHotel: bookingData.pickupHotel ?? null,
			pickupHotelRoom: bookingData.pickupHotelRoom ?? null,
			pickupPoint: bookingData.pickupPoint ?? null,
		});
	}

	private buildPricingModel(builderData: BookingModelBuilderData): BookingPricingModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
			return undefined;
		}

		const { bookingData } = builderData;

		return new BookingPricingModel({
			pricing: bookingData.pricing ?? PricingDataProvider.emptyPricing,
		});
	}

	private buildQuestionsModel(builderData: BookingModelBuilderData): BookingQuestionsModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Questions) === false) {
			return undefined;
		}

		const { bookingData } = builderData;

		return new BookingQuestionsModel({
			questionAswers: bookingData.questionAnswers ?? [],
		});
	}
}
