import { writable } from "svelte/store";

const { subscribe, set, update } = writable<{
  open: boolean;
  class?: string;
} | null>(null);

const menu = {
  subscribe,
  set,
  update,
  open: () => update((menu) => ({ ...menu, open: true })),
  close: () => update((menu) => ({ ...menu, open: false })),
  init: (className: string = '') => set({ open: false, class: className }),
};

export default menu;
