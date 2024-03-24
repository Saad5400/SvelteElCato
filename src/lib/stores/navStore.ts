import {writable} from "svelte/store";

type NavStore = {
    title: string;
    items: NavItem[];
    open?: boolean;
};

export type NavItem = {
    title: string;
    href: string;
};

const navStore = writable<NavStore>({
    title: "",
    items: [],
    open: false
});

export default navStore;