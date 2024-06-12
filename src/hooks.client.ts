import { pb } from "$lib/pocketbase";
import userStore from "$lib/stores/userStore";
import { PUBLIC_ENVIRONMENT } from "$env/static/public";

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
  userStore.set(pb.authStore.model);
  document.cookie = pb.authStore.exportToCookie({
    httpOnly: false,
    secure: PUBLIC_ENVIRONMENT === "production",
  });
}, true);
