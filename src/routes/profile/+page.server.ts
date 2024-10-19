import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { handleError } from "$lib/models/TypedPocketBase";
import type Course from "$lib/models/Course";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    redirect(302, "/auth/login?redirect=/profile");
  }

  const courses = (await locals.pb
    .collection("courses")
    .getFullList({
      filter: locals.pb.filter("{:registeredCourses} ~ id", {
        registeredCourses: locals.user?.registeredCourses,
      }),
      // cache: "no-cache"
    })
    .catch(handleError)) as Course[];

  return {
    user: locals.user,
    courses,
  };
};
