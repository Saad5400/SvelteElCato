import type { LayoutLoad } from "./$types";
import { pb } from "$lib/pocketbase";

export const load: LayoutLoad = () => {
  return {
    pb,
  };
};
