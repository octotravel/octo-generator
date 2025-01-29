import { v4 as uuidv4 } from 'uuid';

export class UuidFactory {
	public static create(): string {
		return uuidv4();
	}
}
