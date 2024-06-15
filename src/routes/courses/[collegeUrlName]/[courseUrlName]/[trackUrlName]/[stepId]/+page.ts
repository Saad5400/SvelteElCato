import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type Step from "$lib/models/Step";

export const load: PageLoad = async ({ parent, params, data }) => {
  const { track } = await parent();

  if (!track || !track.steps) error(404);

  const step =
    track.steps.find((s: Step) => s.id === params.stepId) || error(404);

  const isExternal = step.type === "external";

  return {
    step,
    isExternal,
    expires: data.expires,
    hash: data.hash,
  };
};
