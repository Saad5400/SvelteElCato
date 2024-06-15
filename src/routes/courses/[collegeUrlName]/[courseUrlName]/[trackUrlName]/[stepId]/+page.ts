import type { PageLoad } from "./$types";
import Step from "$lib/models/Step";

export const load: PageLoad = async ({ data }) => {
  return {
    expires: data.expires,
    hash: data.hash,
    step: new Step(data.step),
  };
};
