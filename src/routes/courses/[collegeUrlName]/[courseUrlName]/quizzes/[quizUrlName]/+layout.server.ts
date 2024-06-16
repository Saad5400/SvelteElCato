import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type Quiz from "$lib/models/Quiz";

export const load: LayoutServerLoad = async ({ parent, params, locals }) => {
  const { course, allQuestions } = await parent();

  let quiz: Quiz;

  if (params.quizUrlName === "random") {
    // @ts-ignore
    quiz = {
      questions: allQuestions.sort((a, b) => a.localeCompare(b)),
      urlName: "random",
      displayName: "جميع الأسئلة عشوائياً",
      isFree: true,
      expand: {
        questions: [],
      },
    };
  } else {
    quiz =
      course.expand.quizzes.find(
        (q: Quiz) => q.urlName === params.quizUrlName,
      ) || error(404, "Quiz not found");
  }

  return {
    quiz,
  };
};
