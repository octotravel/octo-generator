export class BookingCartModel {
  protected _orderId?: string;

  public readonly orderReference?: string;

  protected _primary?: boolean;

  constructor({ orderId, orderReference, primary }: { orderId?: string; orderReference?: string; primary?: boolean }) {
    this._orderId = orderId;
    this.orderReference = orderReference;
    this._primary = primary;
  }

  get orderId(): string | undefined {
    return this._orderId;
  }

  set orderId(orderId: string | undefined) {
    this._orderId = orderId;
  }

  get primary(): boolean | undefined {
    return this._primary;
  }

  set primary(primary: boolean | undefined) {
    this._primary = primary;
  }
}
