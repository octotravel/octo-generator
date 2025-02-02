export class BookingCartModel {
	public readonly orderId?: string;

	public readonly orderReference?: string;

	public readonly primary?: boolean;

	public constructor({
		orderId,
		orderReference,
		primary,
	}: {
		orderId?: string;
		orderReference?: string;
		primary?: boolean;
	}) {
		this.orderId = orderId;
		this.orderReference = orderReference;
		this.primary = primary;
	}
}
