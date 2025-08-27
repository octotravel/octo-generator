import { DeliveryFormat } from '@octocloud/types';

export abstract class DeliveryOptionPreset {
	public static readonly DELIVERY_OPTION_PDF = {
		deliveryFormat: DeliveryFormat.PDF_URL,
		deliveryValue: 'pdf',
	};
	public static readonly DELIVERY_OPTION_QRCODE = {
		deliveryFormat: DeliveryFormat.QRCODE,
		deliveryValue: 'qrcode',
	};
	public static readonly DELIVERY_OPTION_PKPASS = {
		deliveryFormat: DeliveryFormat.PKPASS_URL,
		deliveryValue: 'PKPASS',
	};
}
