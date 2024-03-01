import {writable} from "svelte/store";

type NavStore = {
    title: string;
    items: NavItem[];
};

type NavItem = {
    title: string;
    href: string;
};

const navStore = writable<NavStore>({
    title: "",
    items: []
});

export default navStore;