<script lang="ts">
    import { page } from "$app/stores";
    import navStore from "$lib/stores/navStore";
    import BetweenLines from "$lib/components/BetweenLines.svelte";
    import { Button } from "$lib/components/ui/button";
    import { get } from "svelte/store";
    import { onDestroy, onMount } from "svelte";

    let nav: HTMLElement;
    let unsubscribeNavStore = () => {};
    onMount(() => {
        unsubscribeNavStore = navStore.subscribe((value) => {
            nav.getElementsByClassName("active")[0]?.scrollIntoView({ block: "center" });
        });
    });

    onDestroy(() => {
        unsubscribeNavStore();
    });
</script>

<nav bind:this={nav}>
    {#each $navStore.items as item}
        {@const active = $page.url.href.includes(item.href)}
        {#if item.href}
            <Button
                href={item.href}
                class={"block py-2 px-4 my-2 text-sm font-medium text-on-background/80 hover:bg-background/80 hover:text-on-background/100 text-start me-4 whitespace-normal h-fit w-full " +
                    (active ? "active " : "") +
                    item.class}
                on:click={() => navStore.set({ ...get(navStore), open: false })}
            >
                {item.title}
            </Button>
        {:else}
            <BetweenLines class="my-2 pe-4">
                {item.title}
            </BetweenLines>
        {/if}
    {/each}
</nav>
