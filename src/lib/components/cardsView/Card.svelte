<script lang="ts">
    import {Button, type Variant} from "$lib/components/ui/button/index.js";

    export let href: string;
    export let className = "min-h-32 flex flex-col";
    export let variant: Variant = "outline3DLarge";
    export let title = "";
    export let subtitle = "";
    export let description = "";

    export {className as class}
</script>

<Button class={className} {variant} {href}>
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
        <span class="text-lg text-secondary-foreground/80 mt-4">
            {description}
        </span>
    {/if}
</Button>