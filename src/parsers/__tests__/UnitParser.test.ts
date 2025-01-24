import { CapabilityId } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { ProductModel } from '../../models/product/ProductModel';
import { UnitParser } from '../UnitParser';
import { UnitTestDataProvider } from './dataProviders/UnitTestDataProvider';

describe('UnitParser', () => {
	const unitParser = new UnitParser();

	const { unit } = UnitTestDataProvider;
	const { unitContent } = UnitTestDataProvider;
	const { unitPricingFrom } = UnitTestDataProvider;
	const { unitPOJO } = UnitTestDataProvider;
	const { unitModel } = UnitTestDataProvider;

	describe('parsePOJOToModel', () => {
		it('should return unit model', async () => {
			expect(unitParser.parsePOJOToModel(unitPOJO)).toStrictEqual(unitModel);
		});
	});

	describe('parseModelToPOJO', () => {
		it('should return unit POJO', async () => {
			expect(unitParser.parseModelToPOJO(unitModel, { sourceModel: ProductModel })).toStrictEqual(unitPOJO);
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO without any capabilities', async () => {
			expect(unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [])).toStrictEqual(unit);
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with content capability', async () => {
			expect(unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [CapabilityId.Content])).toStrictEqual({
				...unit,
				...unitContent,
			});
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with pricing capability', async () => {
			expect(
				unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [CapabilityId.Pricing], {
					sourceModel: ProductModel,
				}),
			).toStrictEqual({
				...unit,
				...unitPricingFrom,
			});
		});
	});

	describe('parseModelToPOJOWithSpecificCapabilities', () => {
		it('should return unit POJO with all capabilities', async () => {
			expect(
				unitParser.parseModelToPOJOWithSpecificCapabilities(unitModel, [CapabilityId.Content, CapabilityId.Pricing], {
					sourceModel: ProductModel,
				}),
			).toStrictEqual(unitPOJO);
		});
	});
});
