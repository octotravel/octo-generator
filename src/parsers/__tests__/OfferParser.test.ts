import { OfferParser } from '../OfferParser';
import { OfferTestDataProvider } from './dataProviders/OfferTestDataProvider';

describe('OfferParser', () => {
  const offerParser = new OfferParser();
  const { offerPOJO } = OfferTestDataProvider;
  const { offerModel } = OfferTestDataProvider;

  describe('parsePOJOToModel', () => {
    it('should return offer model', async () => {
      expect(offerParser.parsePOJOToModel(offerPOJO)).toStrictEqual(offerModel);
    });
  });

  describe('parseModelToPOJO', () => {
    it('should return offer POJO', async () => {
      expect(offerParser.parseModelToPOJO(offerModel)).toStrictEqual(offerPOJO);
    });
  });
});
