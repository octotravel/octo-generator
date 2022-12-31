import { PickupPoint } from "@octocloud/types/src/types/PickupPoint";

export class BookingPickupModel {
  public readonly pickupRequested?: boolean;
  public readonly pickupPointId?: Nullable<string>;
  public readonly pickupHotel?: Nullable<string>;
  public readonly pickupHotelRoom?: Nullable<string>;
  public readonly pickupPoint?: Nullable<PickupPoint>;

  constructor({
    pickupRequested,
    pickupPointId,
    pickupHotel,
    pickupHotelRoom,
    pickupPoint,
  }: {
    pickupRequested?: boolean;
    pickupPointId?: Nullable<string>;
    pickupHotel?: Nullable<string>;
    pickupHotelRoom?: Nullable<string>;
    pickupPoint?: Nullable<PickupPoint>;
  }) {
    this.pickupRequested = pickupRequested;
    this.pickupPointId = pickupPointId;
    this.pickupHotel = pickupHotel;
    this.pickupHotelRoom = pickupHotelRoom;
    this.pickupPoint = pickupPoint;
  }
}
