import { QuestionAnswer } from '@octocloud/types';

export class BookingQuestionsModel {
  public readonly questionAswers: QuestionAnswer[];

  public constructor({ questionAswers }: { questionAswers: QuestionAnswer[] }) {
    this.questionAswers = questionAswers;
  }
}
