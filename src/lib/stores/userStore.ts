import type { AuthModel } from "pocketbase";
import { writable } from "svelte/store";

const userStore = writable<AuthModel>(null);

export default userStore;
