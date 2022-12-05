export class UnitContentModel {
  public readonly title: string;
  public readonly titlePlural: string;
  public readonly subtitle: Nullable<string>;

  constructor({ title, titlePlural, subtitle }: { title: string; titlePlural: string; subtitle: Nullable<string> }) {
    this.title = title;
    this.titlePlural = titlePlural;
    this.subtitle = subtitle;
  }
}
