import { Availability, Booking } from '@octocloud/types';
import { PartialOption } from './PartialOption';
import { PartialProduct } from './PartialProduct';

export type PartialBooking = Partial<
	Omit<Booking, 'product' | 'option' | 'availaiblity'> & {
		product: PartialProduct;
		option: PartialOption;
	}
> & {
	availability: Nullable<Availability>;
};
