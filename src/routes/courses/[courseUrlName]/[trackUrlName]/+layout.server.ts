import { handleError } from "$lib/models/TypedPocketBase";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type Track from "$lib/models/Track";
import type Step from "$lib/models/Step";

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

  track.expand = {
    steps: (await locals.pb
      .collection("stepsView")
      .getFullList({
        filter: locals.pb.filter("{:steps} ?~ id", {
          steps: track.steps,
        }),
        // cache: "no-cache",
      })
      .catch(handleError)) as Step[],
  };

  // set the track.expand.steps (objects, have .id property) to have the same order as track.steps (ids)
  // @ts-ignore
  track.expand.steps = track.steps.map((id: string) => {
    return track.expand.steps.find((step: Step) => step.id === id)!;
  });

  return {
    track: track,
  };
};
