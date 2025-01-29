import { NetDiscount, OfferRestrictions } from '@octocloud/types';

export class OfferModel {
	public readonly title: string;

	public readonly code: string;

	public readonly description: Nullable<string>;

	public readonly netDiscount: Nullable<NetDiscount>;

	public readonly restrictions: OfferRestrictions;

	public readonly usable: boolean;

	public constructor({
		title,
		code,
		description,
		netDiscount,
		restrictions,
		usable,
	}: {
		title: string;
		code: string;
		description: Nullable<string>;
		netDiscount: Nullable<NetDiscount>;
		restrictions: OfferRestrictions;
		usable: boolean;
	}) {
		this.title = title;
		this.code = code;
		this.description = description;
		this.netDiscount = netDiscount;
		this.restrictions = restrictions;
		this.usable = usable;
	}
}
