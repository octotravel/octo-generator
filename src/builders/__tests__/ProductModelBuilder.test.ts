import { CapabilityId } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { ProductDataProvider } from '../../dataProviders/ProductDataProvider';
import { ProductModel } from '../../models/product/ProductModel';
import { ProductModelBuilder } from '../ProductModelBuilder';

describe('ProductModelBuilder', () => {
	const productModelBuilder = new ProductModelBuilder();
	describe('build', () => {
		it('should build product model without any capabilities', async () => {
			const productModel = productModelBuilder.build({
				productData: ProductDataProvider.defaultProduct,
				capabilities: [],
			});

			expect(productModel).toBeInstanceOf(ProductModel);
			expect(productModel.productContentModel).toBeUndefined();
			expect(productModel.productGoogleModel).toBeUndefined();
			expect(productModel.productPricingModel).toBeUndefined();
			expect(productModel.productQuestionsModel).toBeUndefined();
		});

		it('should build product model with content capability', async () => {
			const productModel = productModelBuilder.build({
				productData: ProductDataProvider.defaultProduct,
				capabilities: [CapabilityId.Content],
			});

			expect(productModel).toBeInstanceOf(ProductModel);
			expect(productModel.productContentModel).toBeDefined();
			expect(productModel.productGoogleModel).toBeUndefined();
			expect(productModel.productPricingModel).toBeUndefined();
			expect(productModel.productQuestionsModel).toBeUndefined();
		});

		it('should build product model with google capability', async () => {
			const productModel = productModelBuilder.build({
				productData: ProductDataProvider.defaultProduct,
				capabilities: [CapabilityId.Google],
			});

			expect(productModel).toBeInstanceOf(ProductModel);
			expect(productModel.productContentModel).toBeUndefined();
			expect(productModel.productGoogleModel).toBeDefined();
			expect(productModel.productPricingModel).toBeUndefined();
			expect(productModel.productQuestionsModel).toBeUndefined();
		});

		it('should build product model with pricing capability', async () => {
			const productModel = productModelBuilder.build({
				productData: ProductDataProvider.defaultProduct,
				capabilities: [CapabilityId.Pricing],
			});

			expect(productModel).toBeInstanceOf(ProductModel);
			expect(productModel.productContentModel).toBeUndefined();
			expect(productModel.productGoogleModel).toBeUndefined();
			expect(productModel.productPricingModel).toBeDefined();
			expect(productModel.productQuestionsModel).toBeUndefined();
		});

		it('should build product model with questions capability', async () => {
			const productModel = productModelBuilder.build({
				productData: ProductDataProvider.defaultProduct,
				capabilities: [CapabilityId.Questions],
			});

			expect(productModel).toBeInstanceOf(ProductModel);
			expect(productModel.productContentModel).toBeUndefined();
			expect(productModel.productGoogleModel).toBeUndefined();
			expect(productModel.productPricingModel).toBeUndefined();
			expect(productModel.productQuestionsModel).toBeDefined();
		});

		it('should build product model with all capabilities', async () => {
			const productModel = productModelBuilder.build({
				productData: ProductDataProvider.defaultProduct,
				capabilities: [CapabilityId.Content, CapabilityId.Google, CapabilityId.Pricing, CapabilityId.Questions],
			});

			expect(productModel).toBeInstanceOf(ProductModel);
			expect(productModel.productContentModel).toBeDefined();
			expect(productModel.productGoogleModel).toBeDefined();
			expect(productModel.productPricingModel).toBeDefined();
			expect(productModel.productQuestionsModel).toBeDefined();
		});
	});
});
