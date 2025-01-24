import { Contact, OfferCombination, OrderStatus, Pricing } from '@octocloud/types';
import { BookingModel } from '../booking/BookingModel';

export class OrderModel {
	public readonly id: string;

	public readonly testMode: boolean;

	public readonly supplierReference: string;

	public readonly settlementMethod: string;

	protected _status: OrderStatus;

	protected _utcExpiresAt: Nullable<string>;

	protected _utcConfirmedAt: Nullable<string>;

	protected _cancellable: boolean;

	protected _bookingModels: BookingModel[];

	protected _contact: Contact;

	public readonly termsAccepted?: boolean;

	public readonly pricing?: Pricing;

	public readonly offerCombinations?: any[];

	public readonly cardPayment?: any;

	public readonly returnUrl?: string;

	public constructor({
		id,
		testMode,
		supplierReference,
		settlementMethod,
		status,
		utcExpiresAt,
		utcConfirmedAt,
		cancellable,
		bookingModels,
		contact,
		termsAccepted,
		pricing,
		offerCombinations,
		cardPayment,
		returnUrl,
	}: {
		id: string;
		testMode: boolean;
		supplierReference: string;
		settlementMethod: string;
		status: OrderStatus;
		utcExpiresAt: Nullable<string>;
		utcConfirmedAt: Nullable<string>;
		cancellable: boolean;
		bookingModels: BookingModel[];
		contact: Contact;
		termsAccepted?: boolean;
		pricing?: Pricing;
		offerCombinations?: OfferCombination[];
		cardPayment?: unknown;
		returnUrl?: string;
	}) {
		this.id = id;
		this.testMode = testMode;
		this.supplierReference = supplierReference;
		this.settlementMethod = settlementMethod;
		this._status = status;
		this._utcExpiresAt = utcExpiresAt;
		this._utcConfirmedAt = utcConfirmedAt;
		this._cancellable = cancellable;
		this._bookingModels = bookingModels;
		this._contact = contact;
		this.termsAccepted = termsAccepted;
		this.pricing = pricing;
		this.offerCombinations = offerCombinations;
		this.cardPayment = cardPayment;
		this.returnUrl = returnUrl;
	}

	public get status(): OrderStatus {
		return this._status;
	}

	public set status(status: OrderStatus) {
		this._status = status;
	}

	public get utcExpiresAt(): Nullable<string> {
		return this._utcExpiresAt;
	}

	public set utcExpiresAt(utcExpiresAt: Nullable<string>) {
		this._utcExpiresAt = utcExpiresAt;
	}

	public get utcConfirmedAt(): Nullable<string> {
		return this._utcConfirmedAt;
	}

	public set utcConfirmedAt(utcConfirmedAt: Nullable<string>) {
		this._utcConfirmedAt = utcConfirmedAt;
	}

	public get cancellable(): boolean {
		return this._cancellable;
	}

	public set cancellable(cancellable: boolean) {
		this._cancellable = cancellable;
	}

	public get contact(): Contact {
		return this._contact;
	}

	public set contact(contact: Contact) {
		this._contact = contact;
	}

	public get bookingModels(): BookingModel[] {
		return this._bookingModels;
	}

	public set bookingModels(bookingModels: BookingModel[]) {
		this._bookingModels = bookingModels;
	}

	public findBookingModelByBookingId(bookingId: string): Nullable<BookingModel> {
		return this.bookingModels.find((bookingModel) => bookingModel.id === bookingId) ?? null;
	}
}
