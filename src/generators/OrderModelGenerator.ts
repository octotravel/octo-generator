import { CapabilityId } from '@octocloud/types';
import { OrderModelBuilder } from '../builders/OrderModelBuilder';
import { OrderModel } from '../models/order/OrderModel';
import { PartialOrder } from '../types/PartialOrder';

interface OrderGenerateData {
	orderData: PartialOrder;
	capabilities?: CapabilityId[];
}

export class OrderModelGenerator {
	private readonly orderModelBuilder = new OrderModelBuilder();

	public generateOrder(orderGenerateData: OrderGenerateData): OrderModel {
		return this.orderModelBuilder.build({
			orderData: orderGenerateData.orderData,
			capabilities: orderGenerateData.capabilities,
		});
	}

	public generateMultipleOrders(ordersData: PartialOrder[], capabilities?: CapabilityId[]): OrderModel[] {
		return ordersData.map((orderData) => this.generateOrder({ orderData, capabilities }));
	}
}
