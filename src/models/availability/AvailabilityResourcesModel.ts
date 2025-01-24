export class AvailabilityResourcesModel {
	public readonly hasResources?: boolean;

	public constructor({ hasResources }: { hasResources?: boolean }) {
		this.hasResources = hasResources;
	}
}
