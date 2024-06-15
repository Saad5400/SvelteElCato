import type { PageServerLoad } from "./$types";
import Course from "$lib/models/Course";
import Step from "$lib/models/Step";
import { sha256 } from "js-sha256";
import { error, redirect } from "@sveltejs/kit";
import { BUNNY_TOKEN } from "$env/static/private";
import Track from "$lib/models/Track";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: PageServerLoad = async ({
  locals,
  params,
  fetch,
  parent,
  request,
}) => {
  const { course, track } = await parent();

  const courseObj = new Course(course);
  const trackObj = new Track(track);
  const step = await locals.pb
    .collection("steps")
    .getOne(params.stepId, {
      fetch,
    })
    .catch(handleError);

  const stepObj = new Step(step);

  let returned = {
    step,
    expires: 0,
    hash: "",
  };

  if (stepObj.type === "bunny") {
    if (!stepObj.isFree) {
      if (!locals.pb.authStore.isValid) {
        redirect(302, `/auth/login?redirect=${request.url}`);
      }
      if (!locals.user?.registeredCourses.includes(courseObj.id)) {
        error(403);
      }
    }

    const videoId = stepObj.linked;
    const expires = Math.floor(Date.now() / 1000) + 3600;
    const hash = sha256(`${BUNNY_TOKEN}${videoId}${expires}`);

    returned.expires = expires;
    returned.hash = hash;
  }

  console.log(returned.step);

  return returned;
};
