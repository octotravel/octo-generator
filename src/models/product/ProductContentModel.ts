import { Category, Destination, FAQ, Image } from '@octocloud/types';

export class ProductContentModel {
	public readonly title: string;

	public readonly country: string;

	public readonly location: Nullable<string>;

	public readonly subtitle: Nullable<string>;

	public readonly shortDescription: Nullable<string>;

	public readonly description: Nullable<string>;

	public readonly highlights: string[];

	public readonly inclusions: string[];

	public readonly exclusions: string[];

	public readonly bookingTerms: Nullable<string>;

	public readonly redemptionInstructions: Nullable<string>;

	public readonly cancellationPolicy: Nullable<string>;

	public readonly destination: Destination;

	public readonly categories: Category[];

	public readonly faqs: FAQ[];

	public readonly coverImageUrl: Nullable<string>;

	public readonly bannerImageUrl: Nullable<string>;

	public readonly videoUrl: Nullable<string>;

	public readonly galleryImages: Image[];

	public readonly bannerImages: Image[];

	public readonly pointToPoint: boolean;

	public readonly privacyTerms: Nullable<string>;

	public readonly alert: Nullable<string>;

	public constructor({
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
		pointToPoint,
		privacyTerms,
		alert,
	}: {
		title: string;
		country: string;
		location: Nullable<string>;
		subtitle: Nullable<string>;
		shortDescription: Nullable<string>;
		description: Nullable<string>;
		highlights: string[];
		inclusions: string[];
		exclusions: string[];
		bookingTerms: Nullable<string>;
		redemptionInstructions: Nullable<string>;
		cancellationPolicy: Nullable<string>;
		destination: Destination;
		categories: Category[];
		faqs: FAQ[];
		coverImageUrl: Nullable<string>;
		bannerImageUrl: Nullable<string>;
		videoUrl: Nullable<string>;
		galleryImages: Image[];
		bannerImages: Image[];
		pointToPoint: boolean;
		privacyTerms: Nullable<string>;
		alert: Nullable<string>;
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
		this.pointToPoint = pointToPoint;
		this.privacyTerms = privacyTerms;
		this.alert = alert;
	}
}
