import type { PageLoad } from "./$types";
import Question from "$lib/models/Question";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { pb } = await parent();

  return {
    question: await Question.fetch(params.questionId, pb, fetch),
  };
};
