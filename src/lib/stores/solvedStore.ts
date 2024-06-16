import { writable } from "svelte/store";

const solvedStore = writable<string[]>([]);

export default solvedStore;
