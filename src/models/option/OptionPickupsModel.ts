import { PickupPoint } from '@octocloud/types';

export class OptionPickupsModel {
  public readonly pickupRequired: boolean;

  public readonly pickupAvailable: boolean;

  public readonly pickupPoints: PickupPoint[];

  public constructor({
    pickupRequired,
    pickupAvailable,
    pickupPoints,
  }: {
    pickupRequired: boolean;
    pickupAvailable: boolean;
    pickupPoints: PickupPoint[];
  }) {
    this.pickupRequired = pickupRequired;
    this.pickupAvailable = pickupAvailable;
    this.pickupPoints = pickupPoints;
  }
}
