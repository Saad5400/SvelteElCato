import type { LayoutLoad } from "./$types";
import PocketBase from "pocketbase";
import type TypedPocketBase from "$lib/models/TypedPocketBase";

export const load: LayoutLoad = async ({ data }) => {
  return {
    pb: new PocketBase(
      data.pb.baseUrl,
      data.pb.authStore,
      data.pb.lang,
    ) as TypedPocketBase,
    user: data.user,
  };
};
