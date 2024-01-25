import { ResellerStatus } from '@octocloud/types';
import { MappingModel } from '../../models/mapping/MappingModel';
import { MappingParser } from '../MappingParser';

describe('MappingParser', () => {
  const mappingParser = new MappingParser();

  const mappingPOJO = {
    id: '0c7afcb8-f690-4df4-a67f-0cb521b0db3e',
    resellerReference: '201244_489555_44813045_561402',
    resellerStatus: ResellerStatus.ACTIVE,
    title:
      'Boroughs Tour: Brooklyn, Bronx, Harlem, Queens & Coney Island | 08:30 AM, 5-hours Boroughs Tour: Brooklyn, Bronx, Harlem & Queens in English | Adult-Age-12-100-Years',
    url: 'https://www.expedia.co.uk/things-to-do/.a489555.activity-details',
    webhookUrl: null,
    optionRequired: true,
    unitRequired: true,
    productId: '927bc165-6c93-4bef-9a7a-ed6a799beed6',
    optionId: '62b670b7-cd42-49e2-9b5f-a5954a728e9d',
    unitId: 'unit_cdebf651-b16b-4a1e-be32-847b5cd1d616',
    connected: true,
  };

  const mappingModel = new MappingModel({
    id: mappingPOJO.id,
    resellerReference: mappingPOJO.resellerReference,
    resellerStatus: mappingPOJO.resellerStatus,
    title: mappingPOJO.title,
    url: mappingPOJO.url,
    webhookUrl: mappingPOJO.webhookUrl,
    optionRequired: mappingPOJO.optionRequired,
    unitRequired: mappingPOJO.unitRequired,
    productId: mappingPOJO.productId,
    optionId: mappingPOJO.optionId,
    unitId: mappingPOJO.unitId,
    connected: mappingPOJO.connected,
  });

  describe('parsePOJOToModel', () => {
    it('should return mapping model', async () => {
      expect(mappingParser.parsePOJOToModel(mappingPOJO)).toStrictEqual(mappingModel);
    });
  });

  describe('parseModelToPOJO', () => {
    it('should return order POJO', async () => {
      expect(mappingParser.parseModelToPOJO(mappingModel)).toStrictEqual(mappingPOJO);
    });
  });
});
