import { handleError } from "$lib/models/TypedPocketBase";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import Course from "$lib/models/Course";

export const load: LayoutServerLoad = async ({
  parent,
  params,
  fetch,
  locals,
}) => {
  const { course } = await parent();

  const courseObj = new Course(course);

  let track =
    courseObj.tracks.find((t) => t.urlName === params.trackUrlName) ||
    error(404, "Track not found");
  let trackWithSteps = await locals.pb
    .collection("tracks")
    .getFirstListItem(
      locals.pb.filter("id = {:trackId}", { trackId: track.id }),
      {
        expand: "steps",
        fields:
          "id,displayName,urlName,expand.steps.displayName,expand.steps.id",
        fetch: fetch,
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=600",
        },
      },
    )
    .catch(handleError);

  return {
    track: trackWithSteps,
  };
};
