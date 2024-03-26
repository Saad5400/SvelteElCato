import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import useHighlight from "$lib/hooks/useHighlight";
import Question from "$lib/models/Question";

export const load: PageLoad = async ({ parent, params }) => {
  const { quiz } = await parent();

  let question =
    quiz.questions.find((s) => s.id === params.questionId) || error(404);
  const questionIndex = quiz.questions.indexOf(question);
  const next =
    quiz.questions.length > questionIndex + 1
      ? quiz.questions[questionIndex + 1]
      : null;
  const prev = questionIndex > 0 ? quiz.questions[questionIndex - 1] : null;

  question = new Question(JSON.parse(JSON.stringify(question)));

  question.content = useHighlight(question.content);
  question.a = useHighlight(question.a);
  question.b = useHighlight(question.b);
  if (question.c) question.c = useHighlight(question.c);
  if (question.d) question.d = useHighlight(question.d);
  if (question.e) question.e = useHighlight(question.e);

  return {
    question,
    questionIndex,
    next,
    prev,
  };
};
