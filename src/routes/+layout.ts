import type { LayoutLoad } from "./$types";
import PocketBase from "pocketbase";
import type TypedPocketBase from "$lib/models/TypedPocketBase";

export const load: LayoutLoad = async ({ data }) => {
  const pb = new PocketBase(
    data.pb.baseUrl,
  ) as TypedPocketBase;

  pb.authStore.loadFromCookie(data.cookies || "");

  return {
    pb,
    user: data.user,
    randomQuote: data.randomQuote,
    fps: data.fps,
  };
};
