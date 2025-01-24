import { Pricing } from '@octocloud/types';

export class OptionPricingModel {
	public readonly pricing?: Pricing[];

	public constructor({ pricing }: { pricing?: Pricing[] }) {
		this.pricing = pricing;
	}
}
