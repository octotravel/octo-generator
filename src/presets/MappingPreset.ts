import { Mapping, ResellerStatus } from '@octocloud/types';
import { MappingModelBuilder } from '../builders/MappingModelBuilder';
import { MappingModel } from '../models/mapping/MappingModel';
import { MappingParser } from '../parsers/MappingParser';

export abstract class MappingPreset {
	private static readonly offerModelBuilder: MappingModelBuilder = new MappingModelBuilder();

	private static readonly mappingParser: MappingParser = new MappingParser();

	public static readonly CONNECTED_AND_ACTIVE_MAPPING_MODEL: MappingModel = this.offerModelBuilder.build({
		mappingData: {
			connected: true,
			resellerStatus: ResellerStatus.ACTIVE,
		},
	});

	public static readonly CONNECTED_AND_DISABLED_MAPPING_MODEL: MappingModel = this.offerModelBuilder.build({
		mappingData: {
			connected: true,
			resellerStatus: ResellerStatus.DISABLED,
		},
	});

	public static readonly ACTIVE_MAPPING_MODEL: MappingModel = this.offerModelBuilder.build({
		mappingData: {
			resellerStatus: ResellerStatus.ACTIVE,
		},
	});

	public static readonly DISABLED_MAPPING_MODEL: MappingModel = this.offerModelBuilder.build({
		mappingData: {
			resellerStatus: ResellerStatus.DISABLED,
		},
	});

	public static readonly WITH_UNIT_MAPPING_MODEL: MappingModel = this.offerModelBuilder.build({
		mappingData: {
			connected: true,
			resellerStatus: ResellerStatus.ACTIVE,
			unitId: 'unitId',
			unitRequired: true,
		},
	});

	public static readonly CONNECTED_AND_ACTIVE_MAPPING_POJO: Mapping = this.mappingParser.parseModelToPOJO(
		this.CONNECTED_AND_ACTIVE_MAPPING_MODEL,
	);
	public static readonly CONNECTED_AND_DISABLED_MAPPING_POJO: Mapping = this.mappingParser.parseModelToPOJO(
		this.CONNECTED_AND_DISABLED_MAPPING_MODEL,
	);
	public static readonly ACTIVE_MAPPING_POJO: Mapping = this.mappingParser.parseModelToPOJO(this.ACTIVE_MAPPING_MODEL);
	public static readonly DISABLED_MAPPING_POJO: Mapping = this.mappingParser.parseModelToPOJO(
		this.DISABLED_MAPPING_MODEL,
	);
	public static readonly WITH_UNIT_MAPPING_POJO: Mapping = this.mappingParser.parseModelToPOJO(
		this.WITH_UNIT_MAPPING_MODEL,
	);
}
