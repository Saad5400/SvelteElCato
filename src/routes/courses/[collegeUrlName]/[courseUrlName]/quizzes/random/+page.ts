import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { course, questions } = await parent();

  return redirect(302, `${course.url()}/quizzes/random/${questions[0]}`);
};
