export default class NullableFactory {
  public static create<T>(defaultValue: T, value?: Nullable<T>): Nullable<T> {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }
}
