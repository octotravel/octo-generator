import { Question } from "@octocloud/types";

export default class ProductQuestionsModel {
  public readonly questions?: Question[];

  constructor({ questions }: { questions?: Question[] }) {
    this.questions = questions;
  }
}
