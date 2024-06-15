import Track from "$lib/models/Track";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data }) => {
  return {
    track: new Track(data.track!),
  };
};
