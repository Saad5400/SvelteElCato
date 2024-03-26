import BaseModel from "$lib/models/BaseModel";
import Question from "$lib/models/Question";
import Course from "$lib/models/Course";

export default class Quiz extends BaseModel {
  displayName: string;
  urlName: string;
  questions: Question[];
  questions_ids: string[];

  constructor(data: any) {
    super(data);
    this.displayName = data.displayName;
    this.urlName = data.urlName;
    this.questions_ids = data.questions;
    this.questions =
      data.expand?.questions?.map((question: any) => new Question(question)) ||
      [];
  }

  public url(course: Course): string {
    return course.url() + `/quizzes/${this.urlName}/${this.questions_ids[0]}`;
  }
}
