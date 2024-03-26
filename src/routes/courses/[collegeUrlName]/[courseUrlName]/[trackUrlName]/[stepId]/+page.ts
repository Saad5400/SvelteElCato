import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ parent, params }) => {
  const { track } = await parent();

  if (!track || !track.steps) error(404);

  const step = track.steps.find((s) => s.id === params.stepId) || error(404);

  const isExternal = step.type === "external";

  return {
    step,
    isExternal,
  };
};
