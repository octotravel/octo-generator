import { PickupPoint } from "@octocloud/types";

export class AvailabilityPickupsModel {
  public readonly pickupRequired: boolean;

  public readonly pickupAvailable: boolean;

  public readonly pickupPoints: Array<PickupPoint> = [];

  constructor({
    pickupRequired,
    pickupAvailable,
    pickupPoints,
  }: {
    pickupAvailable: boolean;
    pickupRequired: boolean;
    pickupPoints: PickupPoint[];
  }) {
    this.pickupRequired = pickupRequired;
    this.pickupAvailable = pickupAvailable;
    this.pickupPoints = pickupPoints;
  }
}
