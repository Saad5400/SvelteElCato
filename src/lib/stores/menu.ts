import { writable } from "svelte/store";

const menu = writable<{
  open: boolean;
} | null>(null);

export default menu;
