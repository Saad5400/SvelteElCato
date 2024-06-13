import type { PageServerLoad } from "./$types";
import Course from "$lib/models/Course";
import Step from "$lib/models/Step";
import crypto from "crypto";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
  const courseRequest = Course.fetch(
    params.collegeUrlName,
    params.courseUrlName,
    locals.pb,
  );

  const stepRequest = Step.fetch(params.stepId, locals.pb);

  const [course, step] = await Promise.all([courseRequest, stepRequest]);

  if (step.type === "bunny") {
    if (!locals.user.registeredCourses.includes(course.id)) {
      throw error(403);
    }

    const token = "c718f5b9-4d56-4c04-979a-2ec675037e2a";
    const videoId = step.linked;
    const expires = Math.floor(Date.now() / 1000) + 3600;
    const hash = crypto
      .createHash("sha256")
      .update(`${token}${videoId}${expires}`)
      .digest("hex");

    return {
      expires,
      hash,
    };
  }
};
