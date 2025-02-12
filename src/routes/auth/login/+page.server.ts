import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

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
      fp: string;
    };

    try {
      const user = await locals.pb
        .collection("users")
        .authWithPassword(data.email.toLowerCase(), data.password);
      await locals.pb.collection("users").update(user.record.id, { clientAddress: getClientAddress() });

      const fps = await locals.pb.collection("fingerprints").getFullList({
        filter: locals.pb.filter("user = {:user}", { user: user.record.id })
      });

      // check if current fp is new
      if (!fps.some(fp => fp.fp === data.fp)) {
        await locals.pb.collection("fingerprints").create({
          user: user.record.id,
          fp: data.fp
        });
      }
    } catch (e) {
      return fail(401, {
        message: "Invalid email or password"
      });
    }

    if (url.searchParams.has("redirect")) {
      redirect(302, url.searchParams.get("redirect")!);
    }
    redirect(302, "/");
  }
};
