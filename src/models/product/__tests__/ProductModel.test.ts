import { describe, expect, it } from 'vitest';
import { OptionDataProvider } from '../../../dataProviders/OptionDataProvider';
import { ProductModelGenerator } from '../../../generators/ProductModelGenerator';
import { OptionModel } from '../../option/OptionModel';

describe('ProductModel', () => {
	const productModelGenerator = new ProductModelGenerator();

	describe('findOptionModelByOptionId', () => {
		it('should return option model', async () => {
			const productModel = productModelGenerator.generateProduct({
				productData: {
					id: 'id',
					internalName: 'internalName',
					deliveryMethods: [],
					options: [OptionDataProvider.defaultOption],
				},
			});

			expect(productModel.findOptionModelByOptionId(OptionDataProvider.defaultOption.id)).toBeInstanceOf(OptionModel);
		});

		it('should return null', async () => {
			const productModel = productModelGenerator.generateProduct({
				productData: {
					id: 'id',
					internalName: 'internalName',
					deliveryMethods: [],
					options: [],
				},
			});

			expect(productModel.findOptionModelByOptionId('nonExistingId')).toStrictEqual(null);
		});
	});
});
