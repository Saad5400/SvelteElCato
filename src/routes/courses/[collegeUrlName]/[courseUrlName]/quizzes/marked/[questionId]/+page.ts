import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import useHighlight from "$lib/hooks/useHighlight";
import Question from "$lib/models/Question";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { pb } = await parent();

  const question = new Question(
    await pb
      .collection("questions")
      .getOne(params.questionId, {
        fetch: async (url, config) => fetch(url, config),
      })
      .catch(handleError),
  );

  question.content = useHighlight(question.content);
  question.a = useHighlight(question.a);
  question.b = useHighlight(question.b);
  if (question.c) question.c = useHighlight(question.c);
  if (question.d) question.d = useHighlight(question.d);
  if (question.e) question.e = useHighlight(question.e);

  return {
    question,
  };
};
