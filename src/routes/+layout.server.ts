import type { LayoutServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";

export const load: LayoutServerLoad = ({ locals }) => {
  return {
    user: locals.user,
  };
};
