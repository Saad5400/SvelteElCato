import { writable } from "svelte/store";

const markedStore = writable<string[]>([]);

export default markedStore;
