import { AvailabilityStatus, CapabilityId, PricingPer } from '@octocloud/types';
import { DateFormatter } from '../common/DateFormatter';
import { PricingDataProvider } from '../dataProviders/PricingDataProvider';
import { AvailabilityCalendarPricingModelFactory } from '../factories/AvailabilityCalendarPricingModelFactory';
import { AvailabilityCalendarModel } from '../models/availability/AvailabilityCalendarModel';
import { AvailabilityCalendarPricingModel } from '../models/availability/AvailabilityCalendarPricingModel';
import { PartialAvailabilityCalendar } from '../types/PartialAvailabilityCalendar';

interface AvailabilityCalendarModelBuilderData {
	availabilityCalendarData: PartialAvailabilityCalendar;
	pricingPer?: PricingPer;
	capabilities?: CapabilityId[];
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Pricing];

export class AvailabilityCalendarModelBuilder {
	public build(builderData: AvailabilityCalendarModelBuilderData): AvailabilityCalendarModel {
		builderData.pricingPer ??= defaultPricingPer;
		builderData.capabilities ??= defaultCapabilities;

		const { availabilityCalendarData } = builderData;
		const date = new Date();

		return new AvailabilityCalendarModel({
			localDate: availabilityCalendarData.localDate ?? DateFormatter.formatForAvailability(date),
			available: availabilityCalendarData.available ?? false,
			status: availabilityCalendarData.status ?? AvailabilityStatus.CLOSED,
			vacancies: availabilityCalendarData.vacancies ?? 0,
			capacity: availabilityCalendarData.capacity ?? 20,
			paxCount: availabilityCalendarData.paxCount ?? 0,
			utcCutoffAt: availabilityCalendarData.utcCutoffAt ?? '18:00',
			availabilityLocalStartTimes: availabilityCalendarData.availabilityLocalStartTimes ?? [],
			openingHours: availabilityCalendarData.openingHours ?? [],
			availabilityCalendarPricingModel: this.buildPricingModel(builderData),
		});
	}

	private buildPricingModel(
		builderData: AvailabilityCalendarModelBuilderData,
	): AvailabilityCalendarPricingModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
			return undefined;
		}

		return AvailabilityCalendarPricingModelFactory.create({
			unitPricing: builderData.availabilityCalendarData.unitPricingFrom ?? [PricingDataProvider.unitPricing],
			pricing: builderData.availabilityCalendarData.pricingFrom ?? PricingDataProvider.adultPricing,
			pricingPer: builderData.pricingPer!,
		});
	}
}
