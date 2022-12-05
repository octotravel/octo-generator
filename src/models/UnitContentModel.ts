import * as R from "ramda";

export class UnitContentModel {
  public readonly title?: string;
  public readonly titlePlural?: string;
  public readonly subtitle?: Nullable<string>;

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

    this.title = title;
    this.titlePlural = titlePlural;
    this.subtitle = subtitle;
  }
}
