import { pb } from "$lib/pocketbase";
import userStore from "$lib/stores/userStore";

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
  userStore.set(pb.authStore.model);
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
}, true);
