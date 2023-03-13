import { GoogleOptions } from "@octocloud/types";

export class ProductGoogleModel {
  public readonly googleOptions: GoogleOptions;

  constructor({ googleOptions }: { googleOptions: GoogleOptions }) {
    this.googleOptions = googleOptions;
  }
}
