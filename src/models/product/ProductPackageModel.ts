export class ProductPackageModel {
	public readonly isPackage?: boolean;

	public constructor({ isPackage }: { isPackage?: boolean }) {
		this.isPackage = isPackage;
	}
}
