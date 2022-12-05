import { OptionModelBuilder } from "../builders/OptionModelBuilder";
import { OptionModel } from "../models/Option/OptionModel";
import { OptionData } from "../data/OptionData";

export class OptionModelGenerator {
  private readonly optionModelBuilder = new OptionModelBuilder();

  public generate = (optionData: OptionData): OptionModel => {
    return this.optionModelBuilder.build({
      optionData: optionData,
    });
  };
}
