import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type Quiz from "$lib/models/Quiz";

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
  const { course } = await parent();

  const quiz =
    course.expand.quizzes.find((q: Quiz) => q.urlName === params.quizUrlName) ||
    error(404, "Quiz not found");

  return {
    quiz,
  };
};
