import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "../../../../.svelte-kit/types/src/routes/auth/register/$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    redirect(303, "/profile");
  }
};

export const actions: Actions = {
  default: async ({ locals, request, url }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string;
      password: string;
    };

    try {
      await locals.pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (e) {
      return fail(401, {
        message: "Invalid email or password",
      });
    }

    if (url.searchParams.has("redirect")) {
      redirect(303, url.searchParams.get("redirect")!);
    }
    redirect(303, "/");
  },
};
