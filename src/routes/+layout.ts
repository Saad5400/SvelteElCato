import type { LayoutLoad } from "./$types";
import { pb } from "$lib/pocketbase";

export const load: LayoutLoad = ({ data }) => {
  return {
    pb,
    user: data.user,
  };
};
