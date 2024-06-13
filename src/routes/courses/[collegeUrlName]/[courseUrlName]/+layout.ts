import type { LayoutLoad } from "./$types";
import Course from "$lib/models/Course";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
  const { pb } = await parent();

  const course = await Course.fetch(
    params.collegeUrlName,
    params.courseUrlName,
  );

  const questions = course.quizzes
    .map((quiz) => quiz.questions_ids)
    .flat()
    .sort((a, b) => a.localeCompare(b));

  return {
    course,
    questions,
  };
};
