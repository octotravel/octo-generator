import { NetDiscount, OfferRestrictions } from '@octocloud/types';

export class OfferModel {
  public readonly title: string;

  public readonly code: string;

  public readonly description: Nullable<string>;

  public readonly netDiscount: Nullable<NetDiscount>;

  public readonly restrictions: OfferRestrictions;

  public constructor({
    title,
    code,
    description,
    netDiscount,
    restrictions,
  }: {
    title: string;
    code: string;
    description: Nullable<string>;
    netDiscount: Nullable<NetDiscount>;
    restrictions: OfferRestrictions;
  }) {
    this.title = title;
    this.code = code;
    this.description = description;
    this.netDiscount = netDiscount;
    this.restrictions = restrictions;
  }
}
