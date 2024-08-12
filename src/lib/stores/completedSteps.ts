import { writable } from "svelte/store";

const store = writable<string[]>([]);
const completedSteps = {
  subscribe: store.subscribe,
  set: store.set,
  update: store.update,
  add: (step: string) => {
    store.update((steps) => {
      if (steps.includes(step)) return steps;
      return [...steps, step];
    });
  },
  remove: (step: string) => {
    store.update((steps) => steps.filter((s) => s !== step));
  }
};

export default completedSteps;
