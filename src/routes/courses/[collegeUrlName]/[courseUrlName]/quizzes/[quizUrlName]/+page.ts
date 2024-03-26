import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { course, quiz } = await parent();

  return redirect(302, quiz.url(course));
};
