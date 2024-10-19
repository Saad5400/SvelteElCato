import type { LayoutLoad } from "./$types";
import PocketBase from "pocketbase";
import type TypedPocketBase from "$lib/models/TypedPocketBase";
import { createPbInstance } from "$lib/pocketbase";

export const load: LayoutLoad = async ({ data, fetch }) => {
  const pb = createPbInstance(fetch);

  pb.authStore.loadFromCookie(data.cookies || "");

  return {
    pb,
    user: data.user,
    randomQuote: data.randomQuote
  };
};
