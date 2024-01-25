import { Question } from '@octocloud/types';

export class ProductQuestionsModel {
  public readonly questions?: Question[];

  public constructor({ questions }: { questions?: Question[] }) {
    this.questions = questions;
  }
}
