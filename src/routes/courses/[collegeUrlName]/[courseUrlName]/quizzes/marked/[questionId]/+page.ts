import type { PageLoad } from "./$types";
import Question from "$lib/models/Question";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { pb, course } = await parent();

  let question = await Question.fetch(params.questionId, pb, fetch);

  const quiz = course.quizzes.find((quiz) =>
    quiz.questions_ids.includes(question.id),
  )!;
  question.explanation = `<u>${quiz.displayName}</u>` + question.explanation;

  return {
    question,
  };
};
