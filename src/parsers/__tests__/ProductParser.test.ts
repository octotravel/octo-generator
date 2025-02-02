import { CapabilityId } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { ProductParser } from '../ProductParser';
import { ProductTestDataProvider } from './dataProviders/ProductTestDataProvider';

describe('ProductParser', () => {
	const productParser = new ProductParser();
	const { product } = ProductTestDataProvider;
	const { productContent } = ProductTestDataProvider;
	const { productGoogle } = ProductTestDataProvider;
	const { productPricing } = ProductTestDataProvider;
	const { productQuestions } = ProductTestDataProvider;
	const { productPackage } = ProductTestDataProvider;
	const { productPOJO } = ProductTestDataProvider;
	const { productModel } = ProductTestDataProvider;

	describe('parsePOJOToModel', () => {
		it('should return option model', async () => {
			expect(productParser.parsePOJOToModel(productPOJO)).toStrictEqual(productModel);
		});
	});

	describe('parseModelToPOJO', () => {
		it('should return product POJO', async () => {
			expect(productParser.parseModelToPOJO(productModel)).toStrictEqual(productPOJO);
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO without any capabilities', async () => {
			expect(productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [])).toStrictEqual(product);
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with content capability', async () => {
			expect(
				productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Content]),
			).toStrictEqual({
				...product,
				...productContent,
			});
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with google capability', async () => {
			expect(productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Google])).toStrictEqual(
				{
					...product,
					...productGoogle,
				},
			);
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with pricing capability', async () => {
			expect(
				productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Pricing]),
			).toStrictEqual({
				...product,
				...productPricing,
			});
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with questions capability', async () => {
			expect(
				productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Questions]),
			).toStrictEqual({
				...product,
				...productQuestions,
			});
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with packages capability', async () => {
			expect(
				productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Packages]),
			).toStrictEqual({
				...product,
				...productPackage,
			});
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with all capabilities', async () => {
			expect(
				productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [
					CapabilityId.Content,
					CapabilityId.Google,
					CapabilityId.Pricing,
					CapabilityId.Questions,
					CapabilityId.Packages,
				]),
			).toStrictEqual(productPOJO);
		});
	});
});
