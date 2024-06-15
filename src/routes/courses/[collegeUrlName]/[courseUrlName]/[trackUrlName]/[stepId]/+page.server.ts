import type { PageServerLoad } from "./$types";
import { sha256 } from "js-sha256";
import { error, redirect } from "@sveltejs/kit";
import { BUNNY_TOKEN } from "$env/static/private";
import { handleError } from "$lib/models/TypedPocketBase";
import type Step from "$lib/models/Step";

export const load: PageServerLoad = async ({
  locals,
  params,
  fetch,
  parent,
  request,
}) => {
  const { course, track } = await parent();

  const step = (await locals.pb
    .collection("steps")
    .getOne(params.stepId, {
      fetch,
    })
    .catch(handleError)) as Step;

  let returned = {
    step,
    expires: 0,
    hash: "",
  };

  if (step.type === "bunny") {
    if (!step.isFree) {
      if (!locals.pb.authStore.isValid) {
        redirect(302, `/auth/login?redirect=${request.url}`);
      }
      if (!locals.user?.registeredCourses.includes(course.id)) {
        error(403);
      }
    }

    const videoId = step.linked;
    const expires = Math.floor(Date.now() / 1000) + 3600;
    const hash = sha256(`${BUNNY_TOKEN}${videoId}${expires}`);

    returned.expires = expires;
    returned.hash = hash;
  }

  console.log(returned.step);

  return returned;
};
