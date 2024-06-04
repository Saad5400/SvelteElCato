import type { PageLoad } from "./$types";
import Question from "$lib/models/Question";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { questions, pb, course } = await parent();

  const questionIndex = questions.indexOf(params.questionId);
  const next =
    questions.length < questionIndex + 2 ? null : questions[questionIndex + 1];
  const prev = questionIndex === 0 ? null : questions[questionIndex - 1];

  let question = await Question.fetch(params.questionId, pb, fetch);

  const quiz = course.quizzes.find((quiz) =>
    quiz.questions_ids.includes(question.id),
  )!;
  question.explanation = `<u>${quiz.displayName}</u>` + question.explanation;

  return {
    question,
    questionIndex,
    next,
    prev,
  };
};
