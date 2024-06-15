import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import type Question from "$lib/models/Question";
import type Quiz from "$lib/models/Quiz";
import { handleError } from "$lib/models/TypedPocketBase";
import type { ClientResponseError } from "pocketbase";

export const load: PageServerLoad = async ({
  parent,
  params,
  fetch,
  url,
  locals,
}) => {
  const { course, quiz } = await parent();

  const questionIndex = quiz.questions.indexOf(params.questionId);
  const next =
    quiz.questions.length < questionIndex + 2
      ? null
      : quiz.questions[questionIndex + 1];
  const prev = questionIndex === 0 ? null : quiz.questions[questionIndex - 1];

  const question = (await locals.pb
    .collection("questions")
    .getOne(params.questionId, {
      fetch,
      cache: "no-cache",
    })
    .catch((er: ClientResponseError) => {
      if (er.status === 404) {
        if (!locals.pb.authStore.isValid)
          redirect(302, `/auth/login?redirect=${url.href}`);
        if (!locals.user?.registeredCourses.includes(course.id)) error(403);
      }

      handleError(er);
    })) as Question;

  return {
    course,
    quiz,
    question,
    questionIndex,
    next,
    prev,
  };
};
