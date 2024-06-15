import { writable } from "svelte/store";

const menu = writable<{
  open: boolean;
  class?: string;
} | null>(null);

export default menu;
