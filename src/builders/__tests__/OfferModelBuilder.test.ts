import { describe, expect, it } from 'vitest';
import { OfferModel } from '../../models/offer/OfferModel';
import { OfferModelBuilder } from '../OfferModelBuilder';

describe('OfferModelBuilder', () => {
	const offerModelBuilder = new OfferModelBuilder();

	describe('build', () => {
		it('should build offer model', async () => {
			const generatedOfferModel = offerModelBuilder.build({
				offerData: {},
			});

			expect(generatedOfferModel).toBeInstanceOf(OfferModel);
		});
	});
});
