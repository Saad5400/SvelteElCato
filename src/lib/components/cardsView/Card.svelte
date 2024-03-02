<script lang="ts">
    import {Button, type Variant} from "$lib/components/ui/button/index.js";

    export let href: string;
    export let className = "flex flex-col h-fit";
    export let variant: Variant = "outline3DLarge";
    export let title = "";
    export let subtitle = "";
    export let description = "";
    export let dataSveltekitPreloadData: true | "" | "hover" | "tap" | "off" | null | undefined = "hover";

    export {className as class}
</script>

<Button class={className} {variant} {href} data-sveltekit-preload-data={dataSveltekitPreloadData}>
    {#if title}
        <span class="text-2xl">
            {title}
        </span>
    {/if}
    {#if subtitle}
        <span class="text-muted-foreground">
            {subtitle}
        </span>
    {/if}
    {#if description}
        <span class="text-lg text-secondary-foreground/80 my-4">
            {description}
        </span>
    {/if}
</Button>

<style lang="postcss">
    span {
        /*wrap text*/
        @apply whitespace-normal;
    }
</style>