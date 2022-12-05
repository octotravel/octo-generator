import { DurationUnit, Itinerary } from "@octocloud/types";

export class OptionContentModel {
  public readonly title: string;
  public readonly subtitle: Nullable<string>;
  public readonly language: string;
  public readonly shortDescription: Nullable<string>;
  public readonly duration: string;
  public readonly durationAmount: string;
  public readonly durationUnit: DurationUnit;
  public readonly itinerary: Nullable<Itinerary[]>;

  constructor({
    title,
    subtitle,
    language,
    shortDescription,
    duration,
    durationAmount,
    durationUnit,
    itinerary,
  }: {
    title: string;
    subtitle: Nullable<string>;
    language: string;
    shortDescription: Nullable<string>;
    duration: string;
    durationAmount: string;
    durationUnit: DurationUnit;
    itinerary: Nullable<Itinerary[]>;
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.language = language;
    this.shortDescription = shortDescription;
    this.duration = duration;
    this.durationAmount = durationAmount;
    this.durationUnit = durationUnit;
    this.itinerary = itinerary;
  }
}
