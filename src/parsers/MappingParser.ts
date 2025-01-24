import { Mapping } from '@octocloud/types';
import { MappingModel } from '../models/mapping/MappingModel';

export class MappingParser {
	public parsePOJOToModel = (mapping: Mapping): MappingModel =>
		new MappingModel({
			id: mapping.id,
			resellerReference: mapping.resellerReference,
			resellerStatus: mapping.resellerStatus,
			title: mapping.title,
			url: mapping.url,
			webhookUrl: mapping.webhookUrl,
			optionRequired: mapping.optionRequired,
			unitRequired: mapping.unitRequired,
			productId: mapping.productId,
			optionId: mapping.optionId,
			unitId: mapping.unitId,
			connected: mapping.connected,
		});

	public parseModelToPOJO(mappingModel: MappingModel): Mapping {
		return {
			id: mappingModel.id,
			resellerReference: mappingModel.resellerReference,
			resellerStatus: mappingModel.resellerStatus,
			title: mappingModel.title,
			url: mappingModel.url,
			webhookUrl: mappingModel.webhookUrl,
			optionRequired: mappingModel.optionRequired,
			unitRequired: mappingModel.unitRequired,
			productId: mappingModel.productId,
			optionId: mappingModel.optionId,
			unitId: mappingModel.unitId,
			connected: mappingModel.connected,
		};
	}
}
