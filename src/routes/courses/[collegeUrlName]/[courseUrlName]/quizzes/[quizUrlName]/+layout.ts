import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { handleError } from "$lib/models/TypedPocketBase";
import Quiz from "$lib/models/Quiz";
import Question from "$lib/models/Question";

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
  const { course, pb } = await parent();

  const quiz =
    course.quizzes.find((q) => q.urlName === params.quizUrlName) ||
    error(404, "Quiz not found");

  return {
    quiz,
  };
};
