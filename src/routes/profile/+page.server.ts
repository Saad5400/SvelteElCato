import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    redirect(303, "/auth/login?redirect=/profile");
  }

  return {
    user: locals.user,
  };
};
