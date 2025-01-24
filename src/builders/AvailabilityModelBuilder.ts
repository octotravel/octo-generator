import { AvailabilityStatus, CapabilityId, PricingPer } from '@octocloud/types';
import { addDays } from 'date-fns';
import { DateFormatter } from '../common/DateFormatter';
import { PricingDataProvider } from '../dataProviders/PricingDataProvider';
import { TimeZoneDataProvider } from '../dataProviders/TimeZoneDataProvider';
import { AvailabilityPricingModelFactory } from '../factories/AvailabilityPricingModelFactory';
import { AvailabilityContentModel } from '../models/availability/AvailabilityContentModel';
import { AvailabilityModel } from '../models/availability/AvailabilityModel';
import { AvailabilityOffersModel } from '../models/availability/AvailabilityOffersModel';
import { AvailabilityPickupsModel } from '../models/availability/AvailabilityPickupsModel';
import { AvailabilityPricingModel } from '../models/availability/AvailabilityPricingModel';
import { AvailabilityResourcesModel } from '../models/availability/AvailabilityResourcesModel';
import { PartialAvailability } from '../types/PartialAvailability';
import { OfferModelBuilder } from './OfferModelBuilder';

interface AvailabilityModelBuilderData {
	availabilityData: PartialAvailability;
	pricingPer?: PricingPer;
	capabilities?: CapabilityId[];
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [
	CapabilityId.Content,
	CapabilityId.Pricing,
	CapabilityId.Offers,
	CapabilityId.Pickups,
];

export class AvailabilityModelBuilder {
	private readonly offerModelBuilder = new OfferModelBuilder();

	public build(builderData: AvailabilityModelBuilderData): AvailabilityModel {
		builderData.pricingPer ??= defaultPricingPer;
		builderData.capabilities ??= defaultCapabilities;

		const { availabilityData } = builderData;
		const date = new Date();
		const dateAsString = DateFormatter.formatForAvailability(date);
		const time = '00:00:00';
		const datetime = new Date(`${dateAsString}T${time}`);

		const localDateTimeStart =
			availabilityData.localDateTimeStart ??
			DateFormatter.formatAsAvailabilityId(datetime, TimeZoneDataProvider.europeLondon);
		const localDateTimeEnd =
			availabilityData.localDateTimeEnd ??
			DateFormatter.formatAsAvailabilityId(addDays(datetime, 5), TimeZoneDataProvider.europeLondon);

		return new AvailabilityModel({
			id: availabilityData.id ?? localDateTimeStart,
			localDateTimeStart,
			localDateTimeEnd,
			allDay: availabilityData.allDay ?? true,
			available: availabilityData.available ?? true,
			status: availabilityData.status ?? AvailabilityStatus.AVAILABLE,
			vacancies: availabilityData.vacancies ?? 10,
			capacity: availabilityData.capacity ?? 10,
			maxUnits: availabilityData.maxUnits ?? 5,
			utcCutoffAt: availabilityData.utcCutoffAt ?? DateFormatter.formatToUtcDate(date),
			openingHours: availabilityData.openingHours ?? [],
			availabilityContentModel: this.buildContentModel(builderData),
			availabilityOffersModel: this.buildOffersModel(builderData),
			availabilityPickupsModel: this.buildPickupModel(builderData),
			availabilityPricingModel: this.buildPricingModel(builderData),
			availabilityResourcesModel: this.buildResourcesModel(builderData),
		});
	}

	private buildContentModel(builderData: AvailabilityModelBuilderData): AvailabilityContentModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
			return undefined;
		}

		const { availabilityData } = builderData;

		return new AvailabilityContentModel({
			meetingPoint: availabilityData.meetingPoint ?? null,
			meetingPointCoordinates: availabilityData.meetingPointCoordinates ?? null,
			meetingPointLatitude: availabilityData.meetingPointLatitude ?? null,
			meetingPointLongitude: availabilityData.meetingPointLongitude ?? null,
			meetingLocalDateTime: availabilityData.meetingLocalDateTime ?? null,
			tourGroup: availabilityData.tourGroup ?? null,
			notices: availabilityData.notices ?? [],
		});
	}

	private buildOffersModel(builderData: AvailabilityModelBuilderData): AvailabilityOffersModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Offers) === false) {
			return undefined;
		}

		const { availabilityData } = builderData;

		return new AvailabilityOffersModel({
			offerCode: availabilityData.offerCode ?? 'offerCode',
			offerTitle: availabilityData.offerTitle ?? 'offerTitle',
			offerModels:
				builderData.availabilityData.offers?.map((offer) => this.offerModelBuilder.build({ offerData: offer })) ?? [],
			offerModel: this.offerModelBuilder.build({ offerData: availabilityData.offer ?? {} }),
		});
	}

	private buildPickupModel(builderData: AvailabilityModelBuilderData): AvailabilityPickupsModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
			return undefined;
		}

		const { availabilityData } = builderData;

		return new AvailabilityPickupsModel({
			pickupRequired: availabilityData.pickupRequired ?? false,
			pickupAvailable: availabilityData.pickupAvailable ?? false,
			pickupPoints: availabilityData.pickupPoints ?? [],
		});
	}

	private buildPricingModel(builderData: AvailabilityModelBuilderData): AvailabilityPricingModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
			return undefined;
		}

		return AvailabilityPricingModelFactory.create({
			unitPricing: builderData.availabilityData.unitPricing ?? [PricingDataProvider.unitPricing],
			pricing: builderData.availabilityData.pricing ?? PricingDataProvider.adultPricing,
			pricingPer: builderData.pricingPer!,
		});
	}

	private buildResourcesModel(builderData: AvailabilityModelBuilderData): AvailabilityResourcesModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Resources) === false) {
			return undefined;
		}

		const { availabilityData } = builderData;

		return new AvailabilityResourcesModel({
			hasResources: availabilityData.hasResources ?? false,
		});
	}
}
