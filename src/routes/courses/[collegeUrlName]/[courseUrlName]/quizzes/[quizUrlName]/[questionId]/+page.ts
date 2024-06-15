import type { PageLoad } from "./$types";
import Question from "$lib/models/Question";
import { error, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import user from "$lib/stores/user";
import { pb } from "$lib/pocketbase";

export const load: PageLoad = async ({ parent, params, fetch, url, data }) => {
  const { user, course, quiz } = await parent();

  const questionIndex = quiz.questions_ids.indexOf(params.questionId);
  const next =
    quiz.questions_ids.length < questionIndex + 2
      ? null
      : quiz.questions_ids[questionIndex + 1];
  const prev =
    questionIndex === 0 ? null : quiz.questions_ids[questionIndex - 1];

  let question: Question;
  try {
    question = await Question.fetch(params.questionId, pb, fetch);
  } catch (e) {
    if (!user) redirect(302, `/auth/login?redirect=${url.href}`);
    else if (!user?.registeredCourses.includes(course.id)) error(403);
    else throw e;
  }

  return {
    question,
    questionIndex,
    next,
    prev,
  };
};
