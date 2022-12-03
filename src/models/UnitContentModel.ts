import * as R from "ramda";

export class UnitContentModel {
  private readonly _title?: string;
  private readonly _titlePlural?: string;
  private readonly _subtitle?: Nullable<string>;

  constructor({
    title,
    titlePlural,
    subtitle,
  }: {
    title?: string;
    titlePlural?: string;
    subtitle?: Nullable<string>;
  }) {
    if (R.isNil(title) && R.isNil(titlePlural) && R.isNil(subtitle)) {
      throw new Error("At least one property should be set.");
    }

    this._title = title;
    this._titlePlural = titlePlural;
    this._subtitle = subtitle;
  }

  public get title() {
    return this._title;
  }

  public get titlePlural() {
    return this._titlePlural;
  }

  public get subtitle() {
    return this._subtitle;
  }
}
