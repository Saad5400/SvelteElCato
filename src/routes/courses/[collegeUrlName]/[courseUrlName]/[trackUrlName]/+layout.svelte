<script lang="ts">
    import type {LayoutData} from './$types';
    import navStore from "$lib/stores/navStore";
    import {Button} from "$lib/components/ui/button";
    import {onDestroy} from "svelte";
    import {page} from "$app/stores";

    export let data: LayoutData;

    // TODO: uncomment
    // onDestroy(() => {
    //     navStore.set({title: '', items: []});
    // });
</script>

<div class="flex flex-row">
    <div class="right-0 flex-1 max-w-80 min-h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] scrollbar-thin overflow-y-auto hidden lg:block"
         style="scrollbar-gutter: stable">
        <h3 class="text-center">
            {$navStore.title}
        </h3>
        <nav>
            {#each $navStore.items as item}
                {@const active = $page.url.href.includes(item.href)}
                <Button href={item.href}
                        class={"block py-2 px-4 text-sm font-medium text-on-background/80 hover:bg-background/80 hover:text-on-background/100 text-start me-4 " + (active ? 'border-r-2 border-b-2 border-accent-foreground' : '')}
                >
                    {item.title}
                </Button>
            {/each}
        </nav>
    </div>
    <slot/>
</div>