import { MappingModelBuilder } from '../builders/MappingModelBuilder';
import { MappingModel } from '../models/mapping/MappingModel';
import { PartialMapping } from '../types/PartialMapping';

interface MappingGenerateData {
	mappingData: PartialMapping;
}

export class MappingGenerator {
	private readonly mappingModelBuilder = new MappingModelBuilder();

	public generateMapping(mappingGenerateData: MappingGenerateData): MappingModel {
		return this.mappingModelBuilder.build({
			mappingData: mappingGenerateData.mappingData,
		});
	}

	public generateMultipleOptions(mappingGenerateData: PartialMapping[]): MappingModel[] {
		return mappingGenerateData.map((mappingData) => this.generateMapping({ mappingData }));
	}
}
