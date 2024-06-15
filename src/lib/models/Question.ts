import type BaseModel from "$lib/models/BaseModel";
import useHighlight from "$lib/hooks/useHighlight";
import type Quiz from "$lib/models/Quiz";
import type Course from "$lib/models/Course";

export interface Option {
  name: string;
  content: string;
}

export default interface Question extends BaseModel {
  content: string;
  a: string;
  b: string;
  c: string | null;
  d: string | null;
  e: string | null;
  correct: string;
  explanation: string | null;
}

export function questionOptions(question: Question): Option[] {
  let options: Option[] = [
    { name: "a", content: question.a },
    { name: "b", content: question.b },
  ];

  if (question.c) options.push({ name: "c", content: question.c });
  if (question.d) options.push({ name: "d", content: question.d });
  if (question.e) options.push({ name: "e", content: question.e });

  return options.sort((a, b) => Math.random() - 0.5);
}

export function questionHighlight(question: Question): Question {
  question.content = useHighlight(question.content);
  question.a = useHighlight(question.a);
  question.b = useHighlight(question.b);
  if (question.c) question.c = useHighlight(question.c);
  if (question.d) question.d = useHighlight(question.d);
  if (question.e) question.e = useHighlight(question.e);

  return question;
}

export function questionUrl(questionId: string, quiz: Quiz, course: Course) {
  return `/courses/${course.expand.college.urlName}/${course.urlName}/quizzes/${quiz.urlName}/${questionId}`;
}
