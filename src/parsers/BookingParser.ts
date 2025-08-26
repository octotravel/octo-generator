import {
	Booking,
	BookingCart,
	BookingContent,
	BookingOffers,
	BookingPickup,
	BookingPricing,
	BookingQuestions,
	CapabilityId,
	Option,
	Product,
} from '@octocloud/types';
import { BookingCartModel } from '../models/booking/BookingCartModel';
import { BookingContentModel } from '../models/booking/BookingContentModel';
import { BookingModel } from '../models/booking/BookingModel';
import { BookingOffersModel } from '../models/booking/BookingOffersModel';
import { BookingPickupsModel } from '../models/booking/BookingPickupsModel';
import { BookingPricingModel } from '../models/booking/BookingPricingModel';
import { BookingQuestionsModel } from '../models/booking/BookingQuestionsModel';
import { OfferParser } from './OfferParser';
import { OptionParser } from './OptionParser';
import { ProductParser } from './ProductParser';
import { UnitItemParser } from './UnitItemParser';

export class BookingParser {
	private readonly productParser = new ProductParser();

	private readonly offerParser = new OfferParser();

	private readonly optionParser = new OptionParser();

	private readonly unitItemParser = new UnitItemParser();

	public parsePOJOToModel(booking: Booking): BookingModel {
		return new BookingModel({
			id: booking.id,
			uuid: booking.uuid,
			testMode: booking.testMode,
			resellerReference: booking.resellerReference,
			supplierReference: booking.supplierReference,
			status: booking.status,
			utcCreatedAt: booking.utcCreatedAt,
			utcUpdatedAt: booking.utcUpdatedAt,
			utcExpiresAt: booking.utcExpiresAt,
			utcRedeemedAt: booking.utcRedeemedAt,
			utcConfirmedAt: booking.utcConfirmedAt,
			productModel: this.productParser.parsePOJOToModel(booking.product!),
			optionModel: this.optionParser.parsePOJOToModel(booking.option!),
			cancellable: booking.cancellable,
			cancellation: booking.cancellation,
			freesale: booking.freesale,
			availability: booking.availability,
			contact: booking.contact,
			notes: booking.notes,
			deliveryMethods: booking.deliveryMethods,
			voucher: booking.voucher,
			unitItemModels: booking.unitItems.map((unitItem) => this.unitItemParser.parsePOJOToModel(unitItem)),
			bookingCartModel: this.parseCartPOJOToModel(booking),
			bookingContentModel: this.parseContentPOJOToModel(booking),
			bookingOffersModel: this.parseOffersPOJOToModel(booking),
			bookingPickupsModel: this.parsePickupsPOJOToModel(booking),
			bookingPricingModel: this.parsePricingPOJOToModel(booking),
			bookingQuestionsModel: this.parseQuestionsPOJOToModel(booking),
		});
	}

	public parseCartPOJOToModel(bookingCart: BookingCart): BookingCartModel | undefined {
		if (
			bookingCart.orderId === undefined ||
			bookingCart.orderReference === undefined ||
			bookingCart.primary === undefined
		) {
			return undefined;
		}

		return new BookingCartModel({
			orderId: bookingCart.orderId,
			orderReference: bookingCart.orderReference,
			primary: bookingCart.primary,
		});
	}

	public parseContentPOJOToModel(bookingContent: BookingContent): BookingContentModel | undefined {
		if (
			bookingContent.meetingPoint === undefined ||
			bookingContent.meetingPointCoordinates === undefined ||
			bookingContent.meetingLocalDateTime === undefined ||
			bookingContent.duration === undefined ||
			bookingContent.durationAmount === undefined ||
			bookingContent.durationUnit === undefined ||
			bookingContent.termsAccepted === undefined ||
			bookingContent.notices === undefined
		) {
			return undefined;
		}

		return new BookingContentModel({
			meetingPoint: bookingContent.meetingPoint,
			meetingPointCoordinates: bookingContent.meetingPointCoordinates,
			meetingLocalDateTime: bookingContent.meetingLocalDateTime,
			duration: bookingContent.duration,
			durationAmount: bookingContent.durationAmount,
			durationUnit: bookingContent.durationUnit,
			termsAccepted: bookingContent.termsAccepted,
			notices: bookingContent.notices,
		});
	}

	public parseOffersPOJOToModel(bookingOffers: BookingOffers): BookingOffersModel | undefined {
		if (
			bookingOffers.offerCode === undefined ||
			bookingOffers.offerTitle === undefined ||
			bookingOffers.offerComparisons === undefined ||
			bookingOffers.offerIsCombination === undefined ||
			bookingOffers.offers === undefined ||
			bookingOffers.offer === undefined
		) {
			return undefined;
		}

		return new BookingOffersModel({
			offerCode: bookingOffers.offerCode,
			offerTitle: bookingOffers.offerTitle,
			offerComparisons: bookingOffers.offerComparisons,
			offerIsCombination: bookingOffers.offerIsCombination,
			offerModels: bookingOffers.offers.map((offer) => this.offerParser.parsePOJOToModel(offer)),
			offerModel: this.offerParser.parsePOJOToModel(bookingOffers.offer),
		});
	}

	public parsePickupsPOJOToModel(bookingPickups: BookingPickup): BookingPickupsModel | undefined {
		if (
			bookingPickups.pickupRequested === undefined ||
			bookingPickups.pickupPointId === undefined ||
			bookingPickups.pickupHotel === undefined ||
			bookingPickups.pickupHotelRoom === undefined ||
			bookingPickups.pickupPoint === undefined
		) {
			return undefined;
		}

		return new BookingPickupsModel({
			pickupRequested: bookingPickups.pickupRequested,
			pickupPointId: bookingPickups.pickupPointId,
			pickupHotel: bookingPickups.pickupHotel,
			pickupHotelRoom: bookingPickups.pickupHotelRoom,
			pickupPoint: bookingPickups.pickupPoint,
		});
	}

	public parsePricingPOJOToModel(bookingPricing: BookingPricing): BookingPricingModel | undefined {
		if (bookingPricing.pricing === undefined) {
			return undefined;
		}

		return new BookingPricingModel({
			pricing: bookingPricing.pricing,
		});
	}

	public parseQuestionsPOJOToModel(bookingQuestions: BookingQuestions): BookingQuestionsModel | undefined {
		if (bookingQuestions.questionAnswers === undefined) {
			return undefined;
		}

		return new BookingQuestionsModel({
			questionAswers: bookingQuestions.questionAnswers,
		});
	}

	public parseModelToPOJO(bookingModel: BookingModel): Booking {
		return Object.assign(
			this.parseMainModelToPojo(bookingModel),
			this.parseCartModelToPOJO(bookingModel.bookingCartModel),
			this.parseContentModelToPOJO(bookingModel.bookingContentModel),
			this.parseOffersModelToPOJO(bookingModel.bookingOffersModel),
			this.parsePickupsModelToPOJO(bookingModel.bookingPickupsModel),
			this.parsePricingModelToPOJO(bookingModel.bookingPricingModel),
			this.parseQuestionsModelToPOJO(bookingModel.bookingQuestionsModel),
		);
	}

	public parseModelToPOJOWithSpecificCapabilities(bookingModel: BookingModel, capabilities: CapabilityId[]): Booking {
		let bookingCart: BookingCart = {};
		let bookingContent: BookingContent = {};
		let bookingOffers: BookingOffers = {};
		let bookingPickups: BookingPickup = {};
		let bookingPricing: BookingPricing = {};
		let bookingQuestions: BookingQuestions = {};

		if (capabilities.includes(CapabilityId.Cart)) {
			bookingCart = this.parseCartModelToPOJO(bookingModel.bookingCartModel);
		}

		if (capabilities.includes(CapabilityId.Content)) {
			bookingContent = this.parseContentModelToPOJO(bookingModel.bookingContentModel);
		}

		if (capabilities.includes(CapabilityId.Offers)) {
			bookingOffers = this.parseOffersModelToPOJO(bookingModel.bookingOffersModel);
		}

		if (capabilities.includes(CapabilityId.Pickups)) {
			bookingPickups = this.parsePickupsModelToPOJO(bookingModel.bookingPickupsModel);
		}

		if (capabilities.includes(CapabilityId.Pricing)) {
			bookingPricing = this.parsePricingModelToPOJO(bookingModel.bookingPricingModel);
		}

		if (capabilities.includes(CapabilityId.Questions)) {
			bookingQuestions = this.parseQuestionsModelToPOJO(bookingModel.bookingQuestionsModel);
		}

		return Object.assign(
			this.parseMainModelToPojo(bookingModel, capabilities),
			bookingCart,
			bookingContent,
			bookingOffers,
			bookingPickups,
			bookingPricing,
			bookingQuestions,
		);
	}

	private parseMainModelToPojo(bookingModel: BookingModel, capabilities?: CapabilityId[]): Booking {
		let product: Product;
		let option: Option;

		if (capabilities === undefined) {
			product = this.productParser.parseModelToPOJO(bookingModel.productModel);
			option = this.optionParser.parseModelToPOJO(bookingModel.optionModel);
		} else {
			product = this.productParser.parseModelToPOJOWithSpecificCapabilities(bookingModel.productModel, capabilities);
			option = this.optionParser.parseModelToPOJOWithSpecificCapabilities(bookingModel.optionModel, capabilities);
		}

		const unitItems = bookingModel.unitItemModels.map((unitItemModel) => {
			if (capabilities === undefined) {
				return this.unitItemParser.parseModelToPOJO(unitItemModel);
			}
			return this.unitItemParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel, capabilities);
		});

		return {
			id: bookingModel.id,
			uuid: bookingModel.uuid,
			testMode: bookingModel.testMode,
			resellerReference: bookingModel.resellerReference,
			supplierReference: bookingModel.supplierReference,
			status: bookingModel.status,
			utcCreatedAt: bookingModel.utcCreatedAt,
			utcUpdatedAt: bookingModel.utcUpdatedAt,
			utcExpiresAt: bookingModel.utcExpiresAt,
			utcRedeemedAt: bookingModel.utcRedeemedAt,
			utcConfirmedAt: bookingModel.utcConfirmedAt,
			productId: bookingModel.productModel.id,
			product,
			optionId: bookingModel.optionModel.id,
			option,
			cancellable: bookingModel.cancellable,
			cancellation: bookingModel.cancellation,
			freesale: bookingModel.freesale,
			availabilityId: bookingModel.availability?.id ?? null,
			availability: bookingModel.availability,
			contact: bookingModel.contact,
			notes: bookingModel.notes,
			deliveryMethods: bookingModel.deliveryMethods,
			voucher: bookingModel.voucher,
			unitItems,
		};
	}

	public parseCartModelToPOJO(bookingCartModel?: BookingCartModel): BookingCart {
		if (bookingCartModel === undefined) {
			return {};
		}

		return {
			orderId: bookingCartModel.orderId,
			orderReference: bookingCartModel.orderReference,
			primary: bookingCartModel.primary,
		};
	}

	public parseContentModelToPOJO(bookingContentModel?: BookingContentModel): BookingContent {
		if (bookingContentModel === undefined) {
			return {};
		}

		return {
			meetingPoint: bookingContentModel.meetingPoint,
			meetingPointCoordinates: bookingContentModel.meetingPointCoordinates,
			meetingLocalDateTime: bookingContentModel.meetingLocalDateTime,
			duration: bookingContentModel.duration,
			durationAmount: bookingContentModel.durationAmount,
			durationUnit: bookingContentModel.durationUnit,
			termsAccepted: bookingContentModel.termsAccepted,
			notices: bookingContentModel.notices,
		};
	}

	public parseOffersModelToPOJO(bookingOffersModel?: BookingOffersModel): BookingOffers {
		if (bookingOffersModel === undefined) {
			return {};
		}

		return {
			offerCode: bookingOffersModel.offerCode,
			offerTitle: bookingOffersModel.offerTitle,
			offerComparisons: bookingOffersModel.offerComparisons,
			offerIsCombination: bookingOffersModel.offerIsCombination,
			offers: bookingOffersModel.offerModels.map((offerModel) => this.offerParser.parseModelToPOJO(offerModel)),
			offer: this.offerParser.parseModelToPOJO(bookingOffersModel.offerModel),
		};
	}

	public parsePickupsModelToPOJO(bookingPickupsModel?: BookingPickupsModel): BookingPickup {
		if (bookingPickupsModel === undefined) {
			return {};
		}

		return {
			pickupRequested: bookingPickupsModel.pickupRequested,
			pickupPointId: bookingPickupsModel.pickupPointId,
			pickupHotel: bookingPickupsModel.pickupHotel,
			pickupHotelRoom: bookingPickupsModel.pickupHotelRoom,
			pickupPoint: bookingPickupsModel.pickupPoint,
		};
	}

	public parsePricingModelToPOJO(bookingPricingModel?: BookingPricingModel): BookingPricing {
		if (bookingPricingModel === undefined) {
			return {};
		}

		return {
			pricing: bookingPricingModel.pricing,
		};
	}

	public parseQuestionsModelToPOJO(bookingQuestionsModel?: BookingQuestionsModel): BookingQuestions {
		if (bookingQuestionsModel === undefined) {
			return {};
		}

		return {
			questionAnswers: bookingQuestionsModel.questionAswers,
		};
	}
}
