import type { PageServerLoad } from "./$types";
import Course from "$lib/models/Course";
import Step from "$lib/models/Step";
import { sha256 } from "js-sha256";
import { error, redirect } from "@sveltejs/kit";
import { BUNNY_TOKEN } from "$env/static/private";

export const load: PageServerLoad = async ({ locals, params }) => {
  const courseRequest = Course.fetch(
    params.collegeUrlName,
    params.courseUrlName,
    locals.pb,
  );

  const stepRequest = Step.fetch(params.stepId, locals.pb);

  const [course, step] = await Promise.all([courseRequest, stepRequest]);

  if (step.type === "bunny") {
    if (!step.isFree) {
      if (!locals.pb.authStore.isValid) {
        redirect(303, "/auth/login");
      }
      if (!locals.user?.registeredCourses.includes(course.id)) {
        error(403);
      }
    }

    const videoId = step.linked;
    const expires = Math.floor(Date.now() / 1000) + 3600;
    const hash = sha256(`${BUNNY_TOKEN}${videoId}${expires}`);

    return {
      expires,
      hash,
    };
  }

  return {
    expires: undefined,
    hash: undefined,
  };
};
