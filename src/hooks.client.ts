import { pb } from "$lib/pocketbase";
import user from "$lib/stores/user";
import { PUBLIC_ENVIRONMENT } from "$env/static/public";

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
  // @ts-ignore
  user.set(pb.authStore.model);
  document.cookie = pb.authStore.exportToCookie({
    httpOnly: false,
    secure: PUBLIC_ENVIRONMENT === "production",
  });
}, true);
