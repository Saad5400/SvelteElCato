import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { quizFirstQuestionUrl } from "$lib/models/Quiz";

export const load: PageLoad = async ({ parent }) => {
  const { course, quiz } = await parent();

  redirect(302, quizFirstQuestionUrl(quiz, course));
};
