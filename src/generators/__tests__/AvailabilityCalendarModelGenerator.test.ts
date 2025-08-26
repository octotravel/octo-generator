import { AvailabilityType, CapabilityId } from '@octocloud/types';
import { AvailabilityCalendarValidator } from '@octocloud/validator/backend/src/common/validation/supplier/validators/backendValidator/AvailabilityCalendar/AvailabilityCalendarValidator';
import { describe, expect, it } from 'vitest';
import { AvailabilityCalendarParser } from '../../parsers/AvailabilityCalendarParser';
import { AvailabilityCalendarModelGenerator } from '../AvailabilityCalendarModelGenerator';

describe('AvailabilityCalendarModelGenerator', () => {
	const availabilityCalendarModelGenerator = new AvailabilityCalendarModelGenerator();
	const availabilityCalendarParser = new AvailabilityCalendarParser();
	const capabilities = [CapabilityId.Pricing];
	const availabilityCalendarValidator = new AvailabilityCalendarValidator({
		path: '',
		capabilities,
		availabilityType: AvailabilityType.START_TIME,
	});

	describe('generate and validate availability calendar model', () => {
		it('should generate valid availability calendar model', async () => {
			const availabilityCalendarModel = availabilityCalendarModelGenerator.generateAvailabilityCalendar({
				availabilityCalendarData: {
					localDate: '2022-12-11',
				},
				capabilities,
			});
			const availabilityCalendar = availabilityCalendarParser.parseModelToPOJO(availabilityCalendarModel);
			const validationErrors = availabilityCalendarValidator.validate(availabilityCalendar);

			expect(validationErrors).toStrictEqual([]);
		});

		it('should generate invalid availability calendar model', async () => {
			const availabilityCalendarModel = availabilityCalendarModelGenerator.generateAvailabilityCalendar({
				availabilityCalendarData: {
					localDate: '',
				},
				capabilities,
			});
			const availabilityCalendar = availabilityCalendarParser.parseModelToPOJO(availabilityCalendarModel);
			const validationErrors = availabilityCalendarValidator.validate(availabilityCalendar);

			expect(validationErrors.length).toBeGreaterThan(0);
		});
	});
});
