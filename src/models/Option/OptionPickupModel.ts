import { PickupPoint } from "@octocloud/types";

export class OptionPickupModel {
  pickupRequired: boolean;
  pickupAvailable: boolean;
  pickupPoints: Array<PickupPoint>;

  constructor({
    pickupRequired,
    pickupAvailable,
    pickupPoints,
  }: {
    pickupRequired: boolean;
    pickupAvailable: boolean;
    pickupPoints: Array<PickupPoint>;
  }) {
    this.pickupRequired = pickupRequired;
    this.pickupAvailable = pickupAvailable;
    this.pickupPoints = pickupPoints;
  }
}
