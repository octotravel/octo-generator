import { ResellerStatus } from "@octocloud/types";

export class MappingModel {
  public readonly id: string;

  public readonly resellerReference: string;

  public readonly resellerStatus: ResellerStatus;

  public readonly title: string;

  public readonly url: string;

  public readonly webhookUrl: Nullable<string>;

  public readonly optionRequired: boolean;

  public readonly unitRequired: boolean;

  public readonly productId: Nullable<string>;

  public readonly optionId: Nullable<string>;

  public readonly unitId: Nullable<string>;

  public readonly connected: boolean;

  constructor({
    id,
    resellerReference,
    resellerStatus,
    title,
    url,
    webhookUrl,
    optionRequired,
    unitRequired,
    productId,
    optionId,
    unitId,
    connected,
  }: {
    id: string;
    resellerReference: string;
    resellerStatus: ResellerStatus;
    title: string;
    url: string;
    webhookUrl: Nullable<string>;
    optionRequired: boolean;
    unitRequired: boolean;
    productId: Nullable<string>;
    optionId: Nullable<string>;
    unitId: Nullable<string>;
    connected: boolean;
  }) {
    this.id = id;
    this.resellerReference = resellerReference;
    this.resellerStatus = resellerStatus;
    this.title = title;
    this.url = url;
    this.webhookUrl = webhookUrl;
    this.optionRequired = optionRequired;
    this.unitRequired = unitRequired;
    this.productId = productId;
    this.optionId = optionId;
    this.unitId = unitId;
    this.connected = connected;
  }
}
