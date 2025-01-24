import {
	AvailabilityType,
	Currency,
	DeliveryFormat,
	DeliveryMethod,
	DurationUnit,
	PricingPer,
	Product,
	ProductContent,
	ProductGoogle,
	ProductPackage,
	ProductPricing,
	ProductQuestions,
	RedemptionMethod,
} from '@octocloud/types';
import { LocaleDataProvider } from '../../../dataProviders/LocaleDataProvider';
import { TimeZoneDataProvider } from '../../../dataProviders/TimeZoneDataProvider';
import { OptionModel } from '../../../models/option/OptionModel';
import { ProductContentModel } from '../../../models/product/ProductContentModel';
import { ProductGoogleModel } from '../../../models/product/ProductGoogleModel';
import { ProductModel } from '../../../models/product/ProductModel';
import { ProductPackageModel } from '../../../models/product/ProductPackageModel';
import { ProductPricingModel } from '../../../models/product/ProductPricingModel';
import { ProductQuestionsModel } from '../../../models/product/ProductQuestionsModel';
import { UnitModel } from '../../../models/unit/UnitModel';

export class ProductTestDataProvider {
	public static product: Product = {
		id: 'id',
		internalName: 'internalName',
		reference: null,
		locale: LocaleDataProvider.en,
		timeZone: TimeZoneDataProvider.europeLondon,
		allowFreesale: false,
		instantConfirmation: true,
		instantDelivery: true,
		availabilityRequired: true,
		availabilityType: AvailabilityType.START_TIME,
		deliveryFormats: [DeliveryFormat.PDF_URL, DeliveryFormat.QRCODE],
		deliveryMethods: [DeliveryMethod.TICKET, DeliveryMethod.VOUCHER],
		redemptionMethod: RedemptionMethod.DIGITAL,
		freesaleDurationAmount: 0,
		freesaleDurationUnit: '',
		options: [
			{
				id: 'id',
				default: true,
				internalName: 'internalName',
				reference: null,
				availabilityLocalStartTimes: [],
				cancellationCutoff: 'cancellationCutoff',
				cancellationCutoffAmount: 0,
				cancellationCutoffUnit: DurationUnit.HOUR,
				requiredContactFields: [],
				visibleContactFields: [],
				restrictions: {
					minUnits: 0,
					maxUnits: null,
					minPaxCount: 0,
					maxPaxCount: null,
				},
				units: [],
			},
		],
	};

	public static productContent: Required<ProductContent> = {
		title: 'title',
		country: 'country',
		location: 'location',
		subtitle: 'subtitle',
		shortDescription: 'shortDescription',
		description: 'description',
		highlights: [],
		inclusions: [],
		exclusions: [],
		bookingTerms: null,
		redemptionInstructions: null,
		cancellationPolicy: null,
		destination: {
			id: 'id',
			default: true,
			name: 'name',
			country: 'country',
			contact: {
				website: null,
				email: null,
				telephone: null,
				address: null,
			},
			latitude: 0.0,
			longitude: 0.0,
		},
		categories: [],
		faqs: [],
		coverImageUrl: null,
		bannerImageUrl: null,
		videoUrl: null,
		galleryImages: [],
		bannerImages: [],
		pointToPoint: false,
		privacyTerms: null,
		alert: null,
	};

	public static productGoogle: Required<ProductGoogle> = {
		googleOptions: {
			rating: {
				average_value: null,
				rating_count: null,
			},
			operator: {
				name: '',
				google_business_profile_name: {
					localized_texts: [],
				},
				phone_number: '',
				locations: [],
			},
			landing_page: {
				url: null,
			},
			inventory_type: '',
			landing_page_list_view: {
				url: null,
			},
			option_categories: [],
			related_locations: [],
		},
	};

	public static productPricing: Required<ProductPricing> = {
		defaultCurrency: Currency.EUR,
		availableCurrencies: [Currency.EUR],
		pricingPer: PricingPer.UNIT,
		includeTax: true,
	};

	public static productQuestions: Required<ProductQuestions> = {
		questions: [],
	};

	public static productPackage: Required<ProductPackage> = {
		isPackage: false,
	};

	public static productPOJO: Required<Product> = {
		...this.product,
		...this.productContent,
		...this.productGoogle,
		...this.productPricing,
		...this.productQuestions,
		...this.productPackage,
	};

	public static productModel = new ProductModel({
		id: this.productPOJO.id,
		internalName: this.productPOJO.internalName,
		reference: this.productPOJO.reference,
		locale: this.productPOJO.locale,
		timeZone: this.productPOJO.timeZone,
		allowFreesale: this.productPOJO.allowFreesale,
		instantConfirmation: this.productPOJO.instantConfirmation,
		instantDelivery: this.productPOJO.instantDelivery,
		availabilityRequired: this.productPOJO.availabilityRequired,
		availabilityType: this.productPOJO.availabilityType,
		deliveryFormats: this.productPOJO.deliveryFormats,
		deliveryMethods: this.productPOJO.deliveryMethods,
		redemptionMethod: this.productPOJO.redemptionMethod,
		freesaleDurationAmount: this.productPOJO.freesaleDurationAmount,
		freesaleDurationUnit: this.productPOJO.freesaleDurationUnit,
		optionModels: this.productPOJO.options.map(
			(option) =>
				new OptionModel({
					id: option.id,
					isDefault: option.default,
					internalName: option.internalName,
					reference: option.reference,
					availabilityLocalStartTimes: option.availabilityLocalStartTimes,
					cancellationCutoff: option.cancellationCutoff,
					cancellationCutoffAmount: option.cancellationCutoffAmount,
					cancellationCutoffUnit: option.cancellationCutoffUnit,
					requiredContactFields: option.requiredContactFields,
					visibleContactFields: option.visibleContactFields,
					restrictions: option.restrictions,
					unitModels: option.units.map((unit) => new UnitModel(unit)),
				}),
		),
		productContentModel: new ProductContentModel({
			title: this.productPOJO.title,
			country: this.productPOJO.country,
			location: this.productPOJO.location,
			subtitle: this.productPOJO.subtitle,
			shortDescription: this.productPOJO.shortDescription,
			description: this.productPOJO.description,
			highlights: this.productPOJO.highlights,
			inclusions: this.productPOJO.inclusions,
			exclusions: this.productPOJO.exclusions,
			bookingTerms: this.productPOJO.bookingTerms,
			redemptionInstructions: this.productPOJO.redemptionInstructions,
			cancellationPolicy: this.productPOJO.cancellationPolicy,
			destination: this.productPOJO.destination,
			categories: this.productPOJO.categories,
			faqs: this.productPOJO.faqs,
			coverImageUrl: this.productPOJO.coverImageUrl,
			bannerImageUrl: this.productPOJO.bannerImageUrl,
			videoUrl: this.productPOJO.videoUrl,
			galleryImages: this.productPOJO.galleryImages,
			bannerImages: this.productPOJO.bannerImages,
			pointToPoint: this.productPOJO.pointToPoint,
			privacyTerms: this.productPOJO.privacyTerms,
			alert: this.productPOJO.privacyTerms,
		}),
		productGoogleModel: new ProductGoogleModel({
			googleOptions: this.productGoogle.googleOptions,
		}),
		productPricingModel: new ProductPricingModel({
			defaultCurrency: this.productPOJO.defaultCurrency,
			availableCurrencies: this.productPOJO.availableCurrencies,
			pricingPer: this.productPOJO.pricingPer,
			includeTax: this.productPOJO.includeTax,
		}),
		productQuestionsModel: new ProductQuestionsModel({
			questions: this.productPOJO.questions,
		}),
		productPackageModel: new ProductPackageModel({
			isPackage: this.productPOJO.isPackage,
		}),
	});
}
