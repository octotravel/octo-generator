import { CapabilityId, PricingPer } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { AvailabilityCalendarModel } from '../../models/availability/AvailabilityCalendarModel';
import { AvailabilityCalendarModelBuilder } from '../AvailabilityCalendarModelBuilder';

describe('AvailabilityCalendarModelBuilder', () => {
	const availabilityCalendarModelBuilder = new AvailabilityCalendarModelBuilder();

	describe('build', () => {
		it('should build availability calendar model without any capabilities', async () => {
			const availabilityCalendarModel = availabilityCalendarModelBuilder.build({
				availabilityCalendarData: {},
				pricingPer: PricingPer.BOOKING,
				capabilities: [],
			});

			expect(availabilityCalendarModel).toBeInstanceOf(AvailabilityCalendarModel);
			expect(availabilityCalendarModel.availabilityCalendarPricingModel).toBeUndefined();
		});

		it('should build availability calendar model with all capabilities', async () => {
			const availabilityCalendarModel = availabilityCalendarModelBuilder.build({
				availabilityCalendarData: {},
				pricingPer: PricingPer.BOOKING,
				capabilities: [CapabilityId.Pricing],
			});

			expect(availabilityCalendarModel).toBeInstanceOf(AvailabilityCalendarModel);
			expect(availabilityCalendarModel.availabilityCalendarPricingModel).toBeDefined();
		});
	});
});
