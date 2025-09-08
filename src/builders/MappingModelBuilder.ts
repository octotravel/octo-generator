import { CapabilityId, ResellerStatus } from '@octocloud/types';
import { MappingModel } from '../models/mapping/MappingModel';
import { PartialMapping } from '../types/PartialMapping';

interface MappingModelBuilderData {
	mappingData: PartialMapping;
	capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [];

export class MappingModelBuilder {
	public build(builderData: MappingModelBuilderData): MappingModel {
		builderData.capabilities ??= defaultCapabilities;

		const { mappingData } = builderData;

		return new MappingModel({
			id: mappingData.id ?? 'mappingId',
			resellerReference: mappingData.resellerReference ?? 'resellerReference',
			resellerStatus: mappingData.resellerStatus ?? ResellerStatus.ACTIVE,
			title: mappingData.title ?? 'title',
			url: mappingData.url ?? '',
			webhookUrl: mappingData.webhookUrl !== undefined ? mappingData.webhookUrl : '',
			optionRequired: mappingData.optionRequired ?? true,
			unitRequired: mappingData.unitRequired ?? true,
			productId: mappingData.productId !== undefined ? mappingData.productId : 'productId',
			optionId: mappingData.optionId !== undefined ? mappingData.optionId : 'optionId',
			unitId: mappingData.unitId !== undefined ? mappingData.unitId : null,
			connected: mappingData.connected ?? true,
		});
	}
}
