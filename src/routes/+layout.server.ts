import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    pb: structuredClone(locals.pb),
    user: locals.user,
  };
};
