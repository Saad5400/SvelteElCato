import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    redirect(302, "/profile");
  }
};

export const actions: Actions = {
  default: async ({ locals, request, url, getClientAddress }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string;
      password: string;
      passwordConfirm: string;
      clientAddress: string;
    };

    data.email = data.email.toLowerCase();
    data.clientAddress = getClientAddress();

    try {
      await locals.pb.collection("users").create(data);
      await locals.pb
        .collection("users")
        .authWithPassword(data.email.toLowerCase(), data.password);
      // await locals.pb.collection("users").requestVerification(data.email.toLowerCase(), {
      //   fetch
      // });
    } catch (e) {
      console.error(e);
      throw e;
    }

    if (url.searchParams.has("redirect")) {
      redirect(302, url.searchParams.get("redirect")!);
    }
    redirect(302, "/");
  }
};
