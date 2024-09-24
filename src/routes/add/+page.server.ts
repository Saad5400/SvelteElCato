import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const quizzes = await locals.pb.collection("quizzes").getFullList({
    fetch,
  });

  return {
    quizzes,
  };
};
