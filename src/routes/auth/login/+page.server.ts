import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    redirect(302, "/profile");
  }
};

export const actions: Actions = {
  default: async ({ locals, request, url, fetch }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string;
      password: string;
    };

    try {
      await locals.pb
        .collection("users")
        .authWithPassword(data.email.toLowerCase(), data.password, {
          fetch
        });
    } catch (e) {
      return fail(401, {
        message: "Invalid email or password",
      });
    }

    if (url.searchParams.has("redirect")) {
      redirect(302, url.searchParams.get("redirect")!);
    }
    redirect(302, "/");
  },
};
