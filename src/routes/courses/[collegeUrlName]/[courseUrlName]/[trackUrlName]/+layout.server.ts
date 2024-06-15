import { handleError } from "$lib/models/TypedPocketBase";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import Course from "$lib/models/Course";
import type Track from "$lib/models/Track";

export const load: LayoutServerLoad = async ({
  parent,
  params,
  fetch,
  locals,
}) => {
  const { course } = await parent();

  const track =
    course!.expand!.tracks.find(
      (t: Track) => t.urlName === params.trackUrlName,
    ) || error(404, "Track not found");

  await locals.pb
    .collection("stepsView")
    .getFullList({
      filter: locals.pb.filter("{:steps} ?= id", {
        steps: track.steps,
      }),
    })
    .catch(handleError);

  return {
    track,
  };
};
