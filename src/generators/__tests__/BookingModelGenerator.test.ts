import { CapabilityId } from '@octocloud/types';
import { BookingValidator } from '@octocloud/validator/backend/src/common/validation/v1/validators/backendValidator/Booking/BookingValidator';
import { describe, expect, it } from 'vitest';
import { AvailabilityDataProvider } from '../../dataProviders/AvailabilityDataProvider';
import { UuidFactory } from '../../factories/UuidFactory';
import { BookingParser } from '../../parsers/BookingParser';
import { BookingModelGenerator } from '../BookingModelGenerator';

describe('BookingModelGenerator', () => {
	const bookingModelGenerator = new BookingModelGenerator();
	const bookingParser = new BookingParser();
	const capabilities: CapabilityId[] = [];
	const bookingValidator = new BookingValidator({
		capabilities,
	});

	describe('generate and validate booking model', () => {
		it('should generate valid booking model', async () => {
			const bookingModel = bookingModelGenerator.generateBooking({
				bookingData: {
					uuid: UuidFactory.create(),
					id: 'id',
					availability: AvailabilityDataProvider.availability,
				},
			});
			const unit = bookingParser.parseModelToPOJO(bookingModel);
			const validationErrors = bookingValidator.validate(unit);

			expect(validationErrors).toStrictEqual([]);
		});

		it('should generate invalid booking model', async () => {
			const unitModel = bookingModelGenerator.generateBooking({
				bookingData: {
					id: '',
					availability: AvailabilityDataProvider.availability,
				},
				capabilities,
			});
			const unit = bookingParser.parseModelToPOJO(unitModel);
			const validationErrors = bookingValidator.validate(unit);

			expect(validationErrors.length).toBeGreaterThan(0);
		});
	});
});
