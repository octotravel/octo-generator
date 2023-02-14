import { GoogleOptions } from "@octocloud/types";

export class OptionGoogleModel {
  public readonly googleOptions: GoogleOptions;

  constructor({ googleOptions }: { googleOptions: GoogleOptions }) {
    this.googleOptions = googleOptions;
  }
}
