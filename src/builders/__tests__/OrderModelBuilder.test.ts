import { describe, expect, it } from 'vitest';
import { OrderModel } from '../../models/order/OrderModel';
import { OrderModelBuilder } from '../OrderModelBuilder';

describe('OrderModelBuilder', () => {
	const orderModelBuilder = new OrderModelBuilder();

	describe('build', () => {
		it('should build order model without any capabilities', async () => {
			const generatedOrderModel = orderModelBuilder.build({
				orderData: {},
				capabilities: [],
			});

			expect(generatedOrderModel).toBeInstanceOf(OrderModel);
		});
	});
});
