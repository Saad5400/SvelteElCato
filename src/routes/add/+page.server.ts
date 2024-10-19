import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const quizzes = await locals.pb.collection("quizzes").getFullList();

  return {
    quizzes
  };
};
