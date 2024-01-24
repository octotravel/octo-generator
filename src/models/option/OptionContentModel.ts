import { DurationUnit, Itinerary, Point } from '@octocloud/types';

export class OptionContentModel {
  public readonly title: string;

  public readonly subtitle: Nullable<string>;

  public readonly language: string;

  public readonly shortDescription: Nullable<string>;

  public readonly duration: string;

  public readonly durationAmount: string;

  public readonly durationUnit: DurationUnit;

  public readonly itinerary: Nullable<Itinerary[]>;

  public readonly coverImageUrl: Nullable<string>;

  public readonly fromPoint: Nullable<Point>;

  public readonly toPoint: Nullable<Point>;

  public constructor({
    title,
    subtitle,
    language,
    shortDescription,
    duration,
    durationAmount,
    durationUnit,
    itinerary,
    coverImageUrl,
    fromPoint,
    toPoint,
  }: {
    title: string;
    subtitle: Nullable<string>;
    language: string;
    shortDescription: Nullable<string>;
    duration: string;
    durationAmount: string;
    durationUnit: DurationUnit;
    itinerary: Nullable<Itinerary[]>;
    coverImageUrl: Nullable<string>;
    fromPoint: Nullable<Point>;
    toPoint: Nullable<Point>;
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.language = language;
    this.shortDescription = shortDescription;
    this.duration = duration;
    this.durationAmount = durationAmount;
    this.durationUnit = durationUnit;
    this.itinerary = itinerary;
    this.coverImageUrl = coverImageUrl;
    this.fromPoint = fromPoint;
    this.toPoint = toPoint;
  }
}
