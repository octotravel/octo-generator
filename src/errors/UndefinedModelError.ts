import { RuntimeError } from "./RuntimeError";

export class UndefinedModelError extends RuntimeError {
  public readonly modelName: string;

  public readonly parentModelName: string;

  public readonly parentModelIdentificator: string;

  private constructor(message: string, modelName: string, parentModelName: string, parentModelIdentificator: string) {
    super(message);

    this.modelName = modelName;
    this.parentModelName = parentModelName;
    this.parentModelIdentificator = parentModelIdentificator;
  }

  public static create(
    modelName: string,
    parentModelName: string,
    parentModelIdentificator: string
  ): UndefinedModelError {
    return new this(
      `Model "${modelName}" is undefined on parent model ${parentModelName} with identificator ${parentModelIdentificator}.`,
      modelName,
      parentModelName,
      parentModelIdentificator
    );
  }
}
