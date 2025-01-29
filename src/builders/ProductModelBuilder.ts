import {
	AvailabilityType,
	CapabilityId,
	Currency,
	DeliveryFormat,
	PricingPer,
	RedemptionMethod,
} from '@octocloud/types';
import { DeliveryMethodsDataProvider } from '../dataProviders/DeliveryMethodDataProvider';
import { LocaleDataProvider } from '../dataProviders/LocaleDataProvider';
import { TimeZoneDataProvider } from '../dataProviders/TimeZoneDataProvider';
import { OptionModel } from '../models/option/OptionModel';
import { ProductContentModel } from '../models/product/ProductContentModel';
import { ProductGoogleModel } from '../models/product/ProductGoogleModel';
import { ProductModel } from '../models/product/ProductModel';
import { ProductPackageModel } from '../models/product/ProductPackageModel';
import { ProductPricingModel } from '../models/product/ProductPricingModel';
import { ProductQuestionsModel } from '../models/product/ProductQuestionsModel';
import { PartialProduct } from '../types/PartialProduct';
import { OptionModelBuilder } from './OptionModelBuilder';

interface ProductModelBuilderData {
	productData: PartialProduct;
	capabilities?: CapabilityId[];
	sourceModel?: object;
}

const defaultCapabilities: CapabilityId[] = [
	CapabilityId.Content,
	CapabilityId.Google,
	CapabilityId.Pricing,
	CapabilityId.Pickups,
	CapabilityId.Questions,
];
const defaultSourceModel: object = ProductModel;

export class ProductModelBuilder {
	private readonly optionModelBuilder = new OptionModelBuilder();

	public build(builderData: ProductModelBuilderData): ProductModel {
		builderData.capabilities ??= defaultCapabilities;
		builderData.sourceModel ??= defaultSourceModel;

		const { productData } = builderData;

		return new ProductModel({
			id: productData.id ?? 'id',
			internalName: productData.internalName ?? 'internalName',
			reference: productData.reference ?? null,
			locale: productData.locale ?? LocaleDataProvider.en,
			timeZone: productData.timeZone ?? TimeZoneDataProvider.europeLondon,
			allowFreesale: productData.allowFreesale ?? false,
			instantConfirmation: productData.instantConfirmation ?? true,
			instantDelivery: productData.instantDelivery ?? true,
			availabilityRequired: productData.availabilityRequired ?? true,
			availabilityType: productData.availabilityType ?? AvailabilityType.START_TIME,
			deliveryFormats: productData.deliveryFormats ?? [DeliveryFormat.PDF_URL, DeliveryFormat.QRCODE],
			deliveryMethods: productData.deliveryMethods ?? DeliveryMethodsDataProvider.defaultDeliveryMethods,
			redemptionMethod: productData.redemptionMethod ?? RedemptionMethod.DIGITAL,
			freesaleDurationAmount: productData.freesaleDurationAmount ?? 0,
			freesaleDurationUnit: productData.freesaleDurationUnit ?? '',
			optionModels: this.buildOptionModels(builderData),
			productContentModel: this.buildContentModel(builderData),
			productGoogleModel: this.buildGoogleModel(builderData),
			productPricingModel: this.buildPricingModel(builderData),
			productQuestionsModel: this.buildQuestionsModel(builderData),
			productPackageModel: this.buildPackageModel(builderData),
		});
	}

	private buildOptionModels(builderData: ProductModelBuilderData): OptionModel[] {
		if (builderData.productData.options === undefined) {
			return [
				this.optionModelBuilder.build({
					optionData: {},
					pricingPer: builderData.productData.pricingPer,
					capabilities: builderData.capabilities,
					sourceModel: builderData.sourceModel,
				}),
			];
		}

		return builderData.productData.options.map((optionData, index) => {
			optionData.default ??= index === 0;

			return this.optionModelBuilder.build({
				optionData,
				pricingPer: builderData.productData.pricingPer,
				capabilities: builderData.capabilities,
				sourceModel: builderData.sourceModel,
			});
		}, builderData);
	}

	private buildGoogleModel(builderData: ProductModelBuilderData): ProductGoogleModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Google) === false) {
			return undefined;
		}

		const { productData } = builderData;

		return new ProductGoogleModel({
			googleOptions: productData.googleOptions ?? {
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
		});
	}

	private buildContentModel(builderData: ProductModelBuilderData): ProductContentModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
			return undefined;
		}

		const { productData } = builderData;
		const destination = productData.destination ?? {
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
		};

		return new ProductContentModel({
			title: productData.title ?? 'title',
			country: productData.country ?? 'country',
			location: productData.location ?? 'location',
			subtitle: productData.subtitle ?? 'subtitle',
			shortDescription: productData.shortDescription ?? 'shortDescription',
			description: productData.description ?? 'description',
			highlights: productData.highlights ?? [],
			inclusions: productData.inclusions ?? [],
			exclusions: productData.exclusions ?? [],
			bookingTerms: productData.bookingTerms ?? null,
			redemptionInstructions: productData.redemptionInstructions ?? null,
			cancellationPolicy: productData.cancellationPolicy ?? null,
			destination: productData.destination ?? destination,
			categories: productData.categories ?? [],
			faqs: productData.faqs ?? [],
			coverImageUrl: productData.coverImageUrl ?? null,
			bannerImageUrl: productData.bannerImageUrl ?? null,
			videoUrl: productData.videoUrl ?? null,
			galleryImages: productData.galleryImages ?? [],
			bannerImages: productData.bannerImages ?? [],
			pointToPoint: productData.pointToPoint ?? false,
			privacyTerms: productData.privacyTerms ?? null,
			alert: productData.alert ?? null,
		});
	}

	private buildPricingModel(builderData: ProductModelBuilderData): ProductPricingModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
			return undefined;
		}

		const { productData } = builderData;

		return new ProductPricingModel({
			defaultCurrency: productData.defaultCurrency ?? Currency.EUR,
			availableCurrencies: productData.availableCurrencies ?? [Currency.EUR],
			pricingPer: productData.pricingPer ?? PricingPer.UNIT,
			includeTax: productData.includeTax ?? true,
		});
	}

	private buildQuestionsModel(builderData: ProductModelBuilderData): ProductQuestionsModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Questions) === false) {
			return undefined;
		}

		const { productData } = builderData;

		return new ProductQuestionsModel({
			questions: productData.questions ?? [],
		});
	}

	private buildPackageModel(builderData: ProductModelBuilderData): ProductPackageModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Packages) === false) {
			return undefined;
		}

		const { productData } = builderData;

		return new ProductPackageModel({
			isPackage: productData.isPackage ?? false,
		});
	}
}
