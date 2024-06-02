import type { PageLoad } from "./$types";
import Question from "$lib/models/Question";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { questions, pb } = await parent();

  const questionIndex = questions.indexOf(params.questionId);
  const next =
    questions.length < questionIndex + 2 ? null : questions[questionIndex + 1];
  const prev = questionIndex === 0 ? null : questions[questionIndex - 1];

  const question = await Question.fetch(params.questionId, pb, fetch);

  return {
    question,
    questionIndex,
    next,
    prev,
  };
};
