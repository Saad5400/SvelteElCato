import type { LayoutServerLoad } from "./$types";
import type TypedPocketBase from "$lib/models/TypedPocketBase";

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    pb: structuredClone(locals.pb),
    user: locals.user,
  };
};
