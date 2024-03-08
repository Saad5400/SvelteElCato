<script lang="ts">
    import {Button, type Variant} from "$lib/components/ui/button/index.js";
    import type {ButtonEventHandler} from "bits-ui/dist/bits/button";

    export let href: string | null = null;
    export let className = "flex-1 flex flex-col h-fit min-w-64";
    export let titleClassName = "text-2xl";
    export let variant: Variant = "outline3DLarge";
    export let subtitle = "";
    export let description = "";
    export let dataSveltekitPreloadData: true | "" | "hover" | "tap" | "off" | null | undefined = "hover";
    export let onClick: (event: ButtonEventHandler<MouseEvent>) => void = () => {};

    export {className as class}
</script>

<Button class={className} {variant} {href} data-sveltekit-preload-data={dataSveltekitPreloadData} on:click={onClick}>
    <span class={titleClassName}>
        <slot/>
    </span>
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