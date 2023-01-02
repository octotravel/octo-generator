import { Category, Destination, FAQ, Image } from "@octocloud/types";

export class ProductContentModel {
  public readonly title: string;
  public readonly country: string;
  public readonly location: Nullable<string>;
  public readonly subtitle: Nullable<string>;
  public readonly shortDescription: Nullable<string>;
  public readonly description: Nullable<string>;
  public readonly highlights: Array<string>;
  public readonly inclusions: Array<string>;
  public readonly exclusions: Array<string>;
  public readonly bookingTerms: Nullable<string>;
  public readonly redemptionInstructions: Nullable<string>;
  public readonly cancellationPolicy: Nullable<string>;
  public readonly destination: Destination;
  public readonly categories: Array<Category>;
  public readonly faqs: Array<FAQ>;
  public readonly coverImageUrl: Nullable<string>;
  public readonly bannerImageUrl: Nullable<string>;
  public readonly videoUrl: Nullable<string>;
  public readonly galleryImages: Array<Image>;
  public readonly bannerImages: Array<Image>;

  constructor({
    title,
    country,
    location,
    subtitle,
    shortDescription,
    description,
    highlights,
    inclusions,
    exclusions,
    bookingTerms,
    redemptionInstructions,
    cancellationPolicy,
    destination,
    categories,
    faqs,
    coverImageUrl,
    bannerImageUrl,
    videoUrl,
    galleryImages,
    bannerImages,
  }: {
    title: string;
    country: string;
    location: Nullable<string>;
    subtitle: Nullable<string>;
    shortDescription: Nullable<string>;
    description: Nullable<string>;
    highlights: Array<string>;
    inclusions: Array<string>;
    exclusions: Array<string>;
    bookingTerms: Nullable<string>;
    redemptionInstructions: Nullable<string>;
    cancellationPolicy: Nullable<string>;
    destination: Destination;
    categories: Array<Category>;
    faqs: Array<FAQ>;
    coverImageUrl: Nullable<string>;
    bannerImageUrl: Nullable<string>;
    videoUrl: Nullable<string>;
    galleryImages: Array<Image>;
    bannerImages: Array<Image>;
  }) {
    this.title = title;
    this.country = country;
    this.location = location;
    this.subtitle = subtitle;
    this.shortDescription = shortDescription;
    this.description = description;
    this.highlights = highlights;
    this.inclusions = inclusions;
    this.exclusions = exclusions;
    this.bookingTerms = bookingTerms;
    this.redemptionInstructions = redemptionInstructions;
    this.cancellationPolicy = cancellationPolicy;
    this.destination = destination;
    this.categories = categories;
    this.faqs = faqs;
    this.coverImageUrl = coverImageUrl;
    this.bannerImageUrl = bannerImageUrl;
    this.videoUrl = videoUrl;
    this.galleryImages = galleryImages;
    this.bannerImages = bannerImages;
  }
}
