import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, request }) => {
  return {
    pb: structuredClone(locals.pb),
    user: locals.user,
    cookies: request.headers.get("cookie"),
  };
};
