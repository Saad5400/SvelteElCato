import type BaseModel from "$lib/models/BaseModel";
import type Question from "$lib/models/Question";
import type Course from "$lib/models/Course";
import { courseUrl } from "$lib/models/Course";

export default interface Quiz extends BaseModel {
  displayName: string;
  urlName: string;
  questions: string[];
  isFree: boolean;
  expand: {
    questions: Question[];
  };
}

export function quizFirstQuestionUrl(quiz: Quiz, course: Course) {
  return `${courseUrl(course)}/quizzes/${quiz.urlName}/${quiz.questions[0]}`;
}
