import { Pricing } from '@octocloud/types';

export class UnitPricingModel {
	public readonly pricing?: Pricing[];

	public constructor({ pricing }: { pricing?: Pricing[] }) {
		this.pricing = pricing;
	}
}
