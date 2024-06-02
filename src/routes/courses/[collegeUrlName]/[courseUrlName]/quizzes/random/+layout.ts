import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
  const { course, pb } = await parent();

  const questions = course.quizzes
    .map((quiz) => quiz.questions_ids)
    .flat()
    .sort((a, b) => a.localeCompare(b));

  return {
    questions,
  };
};
