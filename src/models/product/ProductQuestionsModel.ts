import { Question } from "@octocloud/types";

export class ProductQuestionsModel {
  public readonly questions?: Question[];

  constructor({ questions }: { questions?: Question[] }) {
    this.questions = questions;
  }
}
