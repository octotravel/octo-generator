import {
	CapabilityId,
	Product,
	ProductContent,
	ProductGoogle,
	ProductPackage,
	ProductPricing,
	ProductQuestions,
} from '@octocloud/types';
import { ParserOptions } from '../common/ParserOptions';
import { ProductContentModel } from '../models/product/ProductContentModel';
import { ProductGoogleModel } from '../models/product/ProductGoogleModel';
import { ProductModel } from '../models/product/ProductModel';
import { ProductPackageModel } from '../models/product/ProductPackageModel';
import { ProductPricingModel } from '../models/product/ProductPricingModel';
import { ProductQuestionsModel } from '../models/product/ProductQuestionsModel';
import { OptionParser } from './OptionParser';

export class ProductParser {
	private readonly optionParser = new OptionParser();

	public parsePOJOToModel(product: Product): ProductModel {
		return new ProductModel({
			id: product.id,
			internalName: product.internalName,
			reference: product.reference,
			locale: product.locale,
			timeZone: product.timeZone,
			allowFreesale: product.allowFreesale,
			instantConfirmation: product.instantConfirmation,
			instantDelivery: product.instantDelivery,
			availabilityRequired: product.availabilityRequired,
			availabilityType: product.availabilityType,
			deliveryFormats: product.deliveryFormats,
			deliveryMethods: product.deliveryMethods,
			redemptionMethod: product.redemptionMethod,
			freesaleDurationAmount: product.freesaleDurationAmount,
			freesaleDurationUnit: product.freesaleDurationUnit,
			optionModels: product.options.map((option) => this.optionParser.parsePOJOToModel(option)),
			productContentModel: this.parseContentPOJOToModel(product),
			productGoogleModel: this.parseProductGooglePOJOToModel(product),
			productPricingModel: this.parsePricingPOJOToModel(product),
			productQuestionsModel: this.parseQuestionsPOJOToModel(product),
			productPackageModel: this.parsePackagePOJOToModel(product),
		});
	}

	public parseContentPOJOToModel(productContent: ProductContent): ProductContentModel | undefined {
		if (
			productContent.title === undefined ||
			productContent.country === undefined ||
			productContent.location === undefined ||
			productContent.subtitle === undefined ||
			productContent.shortDescription === undefined ||
			productContent.description === undefined ||
			productContent.highlights === undefined ||
			productContent.inclusions === undefined ||
			productContent.exclusions === undefined ||
			productContent.bookingTerms === undefined ||
			productContent.redemptionInstructions === undefined ||
			productContent.cancellationPolicy === undefined ||
			productContent.destination === undefined ||
			productContent.categories === undefined ||
			productContent.faqs === undefined ||
			productContent.coverImageUrl === undefined ||
			productContent.bannerImageUrl === undefined ||
			productContent.videoUrl === undefined ||
			productContent.galleryImages === undefined ||
			productContent.bannerImages === undefined ||
			productContent.pointToPoint === undefined ||
			productContent.privacyTerms === undefined ||
			productContent.alert === undefined
		) {
			return undefined;
		}

		return new ProductContentModel({
			title: productContent.title,
			country: productContent.country,
			location: productContent.location,
			subtitle: productContent.subtitle,
			shortDescription: productContent.shortDescription,
			description: productContent.description,
			highlights: productContent.highlights,
			inclusions: productContent.inclusions,
			exclusions: productContent.exclusions,
			bookingTerms: productContent.bookingTerms,
			redemptionInstructions: productContent.redemptionInstructions,
			cancellationPolicy: productContent.cancellationPolicy,
			destination: productContent.destination,
			categories: productContent.categories,
			faqs: productContent.faqs,
			coverImageUrl: productContent.coverImageUrl,
			bannerImageUrl: productContent.bannerImageUrl,
			videoUrl: productContent.videoUrl,
			galleryImages: productContent.galleryImages,
			bannerImages: productContent.bannerImages,
			pointToPoint: productContent.pointToPoint,
			privacyTerms: productContent.privacyTerms,
			alert: productContent.alert,
		});
	}

	public parseProductGooglePOJOToModel(productGoogle: ProductGoogle): ProductGoogleModel | undefined {
		if (productGoogle.googleOptions === undefined) {
			return undefined;
		}

		return new ProductGoogleModel({
			googleOptions: productGoogle.googleOptions,
		});
	}

	public parsePricingPOJOToModel(productPricing: ProductPricing): ProductPricingModel | undefined {
		if (
			productPricing.defaultCurrency === undefined ||
			productPricing.availableCurrencies === undefined ||
			productPricing.pricingPer === undefined
		) {
			return undefined;
		}

		return new ProductPricingModel({
			defaultCurrency: productPricing.defaultCurrency,
			availableCurrencies: productPricing.availableCurrencies,
			pricingPer: productPricing.pricingPer,
			includeTax: true,
		});
	}

	public parseQuestionsPOJOToModel(productQuestions: ProductQuestions): ProductQuestionsModel | undefined {
		if (productQuestions.questions === undefined) {
			return undefined;
		}

		return new ProductQuestionsModel({
			questions: productQuestions.questions,
		});
	}

	public parsePackagePOJOToModel(productPackage: ProductPackage): ProductPackageModel | undefined {
		if (productPackage.isPackage === undefined) {
			return undefined;
		}

		return new ProductPackageModel({
			isPackage: productPackage.isPackage,
		});
	}

	public parseModelToPOJO(productModel: ProductModel, options: ParserOptions = { sourceModel: ProductModel }): Product {
		return Object.assign(
			this.parseMainModelToPojo(productModel, undefined, options),
			this.parseContentModelToPOJO(productModel.productContentModel),
			this.parseGoogleModelToPOJO(productModel.productGoogleModel),
			this.parsePricingModelToPOJO(productModel.productPricingModel),
			this.parseQuestionsModelToPOJO(productModel.productQuestionsModel),
			this.parsePackageModelToPOJO(productModel.productPackageModel),
		);
	}

	public parseModelToPOJOWithSpecificCapabilities(productModel: ProductModel, capabilities: CapabilityId[]): Product {
		let productContent: ProductContent = {};
		let productGoogle: ProductGoogle = {};
		let productPricing: ProductPricing = {};
		let productQuestion: ProductQuestions = {};
		let productPackage: ProductPackage = {};

		if (capabilities?.includes(CapabilityId.Content)) {
			productContent = this.parseContentModelToPOJO(productModel.productContentModel);
		}

		if (capabilities?.includes(CapabilityId.Google)) {
			productGoogle = this.parseGoogleModelToPOJO(productModel.productGoogleModel);
		}

		if (capabilities?.includes(CapabilityId.Pricing)) {
			productPricing = this.parsePricingModelToPOJO(productModel.productPricingModel);
		}

		if (capabilities?.includes(CapabilityId.Questions)) {
			productQuestion = this.parseQuestionsModelToPOJO(productModel.productQuestionsModel);
		}

		if (capabilities?.includes(CapabilityId.Packages)) {
			productPackage = this.parsePackageModelToPOJO(productModel.productPackageModel);
		}

		return Object.assign(
			this.parseMainModelToPojo(productModel, capabilities),
			productContent,
			productGoogle,
			productPricing,
			productQuestion,
			productPackage,
		);
	}

	private parseMainModelToPojo(
		productModel: ProductModel,
		capabilities?: CapabilityId[],
		options?: ParserOptions,
	): Product {
		const optionPOJOs = productModel.optionModels.map((optionModel) => {
			if (capabilities === undefined) {
				return this.optionParser.parseModelToPOJO(optionModel, options);
			}
			return this.optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, capabilities, options);
		});

		return {
			id: productModel.id,
			internalName: productModel.internalName,
			reference: productModel.reference,
			locale: productModel.locale,
			timeZone: productModel.timeZone,
			allowFreesale: productModel.allowFreesale,
			instantConfirmation: productModel.instantConfirmation,
			instantDelivery: productModel.instantDelivery,
			availabilityRequired: productModel.availabilityRequired,
			availabilityType: productModel.availabilityType,
			deliveryFormats: productModel.deliveryFormats,
			deliveryMethods: productModel.deliveryMethods,
			redemptionMethod: productModel.redemptionMethod,
			freesaleDurationAmount: productModel.freesaleDurationAmount,
			freesaleDurationUnit: productModel.freesaleDurationUnit,
			options: optionPOJOs,
		};
	}

	public parseContentModelToPOJO(productContentModel?: ProductContentModel): ProductContent {
		if (productContentModel === undefined) {
			return {};
		}

		return {
			title: productContentModel.title,
			country: productContentModel.country,
			location: productContentModel.location,
			subtitle: productContentModel.subtitle,
			shortDescription: productContentModel.shortDescription,
			description: productContentModel.description,
			highlights: productContentModel.highlights,
			inclusions: productContentModel.inclusions,
			exclusions: productContentModel.exclusions,
			bookingTerms: productContentModel.bookingTerms,
			redemptionInstructions: productContentModel.redemptionInstructions,
			cancellationPolicy: productContentModel.cancellationPolicy,
			destination: productContentModel.destination,
			categories: productContentModel.categories,
			faqs: productContentModel.faqs,
			coverImageUrl: productContentModel.coverImageUrl,
			bannerImageUrl: productContentModel.bannerImageUrl,
			videoUrl: productContentModel.videoUrl,
			galleryImages: productContentModel.galleryImages,
			bannerImages: productContentModel.bannerImages,
			pointToPoint: productContentModel.pointToPoint,
			privacyTerms: productContentModel.privacyTerms,
			alert: productContentModel.alert,
		};
	}

	public parseGoogleModelToPOJO(productGoogleModel?: ProductGoogleModel): ProductGoogle {
		if (productGoogleModel === undefined) {
			return {};
		}

		return {
			googleOptions: productGoogleModel.googleOptions,
		};
	}

	public parsePricingModelToPOJO(productPricingModel?: ProductPricingModel): ProductPricing {
		if (productPricingModel === undefined) {
			return {};
		}

		return {
			defaultCurrency: productPricingModel.defaultCurrency,
			availableCurrencies: productPricingModel.availableCurrencies,
			pricingPer: productPricingModel.pricingPer,
			includeTax: productPricingModel.includeTax,
		};
	}

	private parseQuestionsModelToPOJO(productQuestionsModel?: ProductQuestionsModel): ProductQuestions {
		if (productQuestionsModel === undefined) {
			return {};
		}

		return {
			questions: productQuestionsModel?.questions,
		};
	}

	private parsePackageModelToPOJO(ProductPackageModel?: ProductPackageModel): ProductPackage {
		if (ProductPackageModel === undefined) {
			return {};
		}

		return {
			isPackage: ProductPackageModel?.isPackage,
		};
	}
}
