import { writable } from "svelte/store";

const menu = writable<{
  open: boolean;
  alwaysShow?: boolean;
} | null>(null);

export default menu;
