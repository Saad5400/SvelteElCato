import type { LayoutLoad } from "./$types";
import PocketBase from "pocketbase";

export const load: LayoutLoad = async ({ data }) => {
  return {
    pb: new PocketBase(data.pb.baseUrl, data.pb.authStore, data.pb.lang),
    user: data.user,
  };
};
