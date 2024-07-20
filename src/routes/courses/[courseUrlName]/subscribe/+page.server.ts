import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, url }) => {
  if (!locals.pb.authStore.isValid)
    redirect(302, `/auth/register?redirect=${url.toString()}`);
};
