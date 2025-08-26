import { CapabilityId } from '@octocloud/types';
import { AvailabilityValidator } from '@octocloud/validator/backend/src/common/validation/supplier/validators/backendValidator/Availability/AvailabilityValidator';
import { describe, expect, it } from 'vitest';
import { AvailabilityParser } from '../../parsers/AvailabilityParser';
import { AvailabilityModelGenerator } from '../AvailabilityModelGenerator';

describe('AvailabilityModelGenerator', () => {
	const availabilityModelGenerator = new AvailabilityModelGenerator();
	const availabilityParser = new AvailabilityParser();
	const capabilities = [CapabilityId.Content, CapabilityId.Pricing, CapabilityId.Pickups];
	const availabilityValidator = new AvailabilityValidator({
		path: '',
		capabilities,
	});

	describe('generate and validate availability model', () => {
		it('should generate valid availability model', async () => {
			const availabilityModel = availabilityModelGenerator.generateAvailability({
				availabilityData: {
					id: '2023-12-01T00:00:00+01:00',
				},
				capabilities,
			});
			const availability = availabilityParser.parseModelToPOJO(availabilityModel);
			const validationErrors = availabilityValidator.validate(availability);

			expect(validationErrors).toStrictEqual([]);
		});

		it('should generate invalid availability model', async () => {
			const availabilityModel = availabilityModelGenerator.generateAvailability({
				availabilityData: {
					id: '',
				},
				capabilities,
			});
			const availability = availabilityParser.parseModelToPOJO(availabilityModel);
			const validationErrors = availabilityValidator.validate(availability);

			expect(validationErrors.length).toBeGreaterThan(0);
		});
	});
});
