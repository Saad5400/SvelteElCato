import Track from "$lib/models/Track";
import { handleError } from "$lib/models/TypedPocketBase";
import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
  const { course, pb } = await parent();

  let track =
    course.tracks.find((t) => t.urlName === params.trackUrlName) ||
    error(404, "Track not found");
  let trackWithSteps = await pb
    .collection("tracks")
    .getFirstListItem(pb.filter("id = {:trackId}", { trackId: track.id }), {
      expand: "steps",
      fetch: async (url, config) => fetch(url, config),
    })
    .catch(handleError);

  track = new Track(trackWithSteps);

  return {
    track,
  };
};
